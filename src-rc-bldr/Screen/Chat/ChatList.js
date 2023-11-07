import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import {
  HeaderRightLogo,
  chatscreenbg,
  john,
  myAccount,
  searchGray,
} from '../../constants/Images';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import moment from 'moment';
import styles from './styles';
import {confirmAlert, isEmpty} from '../../utils/native';
import {useSelector} from 'react-redux';
import {BLACK, LIGHTGRAY, PRIMARY_COLOR, WHITE} from '../../constants/Colors';
import HeaderRight from '../../components/HeaderRight';
import TextStyles from '../../Screen/styles/TextStyles';

const ChatList = ({navigation, loadingState}) => {
  const [loader, setLoader] = useState(false);
  const [text, setText] = useState('');
  const chatList = useSelector(state => state.chat.chatList);
  const user = useSelector(state => state.auth.user);
  const chatList1 = [
    {
      documentId: 'documentId',
      credit: 1,
    },
    {
      documentId: 'documentId1',
      credit: 3,
    },
  ];
  let prevOpenedRow;
  let row = [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const renderItem = ({item, index}, onClick) => {
	// console.log('key item', item);
    const closeRow = row_index => {
      if (prevOpenedRow && prevOpenedRow !== row[row_index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[row_index];
    };

    const renderRightActions = (progress, dragX, row_index, onButtonClick) => {
      return (
        <View
          style={
            row_index === chatList.length - 1
              ? styles.deleteActionView
              : styles.deleteActionView1
          }>
          <TouchableOpacity style={styles.nameButton} onPress={onButtonClick}>
            <Text style={styles.nameButtonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, index, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}>
          
					<GestureHandlerRootView>
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, index, onClick)
              }
              onSwipeableOpen={() => closeRow(index)}
              ref={ref => (row[index] = ref)}
              rightOpenValue={-100}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserChat', {
                    messageId: item.documentId,
                    fullname: item.fullname,
                    // uid2: user.type === 'prime' ? item.guestUserId : item.primeUserId,
                    uid2: item.uid2,
                    credit: item.credit,
                    profileImg: item.profileImg,
                    notification: false,
                    notes: !isEmpty(item.notes) ? item.notes : '',
                    type: !isEmpty(item.type) ? item.type : 1,
                    sendUserId: item.uid2,
                    userType: item.userType,
                  })
                }
                style={[styles.card, index != 0 && styles.bottomSpacing]}>
                <View style={{alignItems: 'center'}}>
                  <Image style={styles.avatarPlaceholder} source={myAccount} />
                  <View style={styles.descBox}>
                    <Text
                      style={[
                        TextStyles.regular12DarkGray,
                        {color: WHITE, paddingTop: 2},
                      ]}>
                      bekijk
                    </Text>
                  </View>
                </View>
                <View style={{marginLeft: 10, flex: 1}}>
                  <View style={styles.nameWrapper}>
                    <Text
                      style={[
                        TextStyles.regular16Black,
                        {color: BLACK, marginBottom: 5},
                      ]}>
                      {item.username} {item.userType === 'prime' && '(prime)'}
                    </Text>
                    {item.updatedAt &&
                    moment(item.updatedAt).isSame(moment(), 'date') ? (
                      <Text style={item.read > 0 ? styles.time1 : styles.time}>
                        {moment(item.updatedAt).format('HH:mm')}
                      </Text>
                    ) : item.updatedAt &&
                      (moment().diff(moment(item.updatedAt), 'day') === 1 ||
                        moment().diff(moment(item.updatedAt), 'day') === 0) ? (
                      <Text style={item.read > 0 ? styles.time1 : styles.time}>
                        {'yesterday'}
                      </Text>
                    ) : (
                      item.updatedAt && (
                        <Text
                          style={item.read > 0 ? styles.time1 : styles.time}>
                          {moment(item.updatedAt).format('DD/MM')}
                        </Text>
                      )
                    )}
                  </View>
                  <Text
                    style={[
                      TextStyles.regular14DarkGray,
                      {color: BLACK, lineHeight: 18},
                    ]}
                    numberOfLines={2}></Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          </GestureHandlerRootView>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  const deleteItem = ({item, index}) => {
    console.info(item, index);
    confirmAlert(
      'Are you sure, you want to delete ?',
      '',
      'Yes',
      'No',
      async () => {
        setLoader(true);
        // await props.dispatchDeleteMessages(item.documentId);
        // item.lastMessage = null;
        // item.read = 0;
        setTimeout(() => {
          setLoader(false);
        }, 5000);
      },
      () => {},
    );
  };

  return (
    <SafeAreaView
      style={[CommonStyles.safeAreaView2, {backgroundColor: PRIMARY_COLOR}]}>
      <StatusBar barStyle="light-content" hidden={true} />
      <View
        style={styles.headerWrapper}>
        <View
          style={styles.inputWrapper}>
          <Image source={searchGray} style={{marginLeft: 10}} />
          <TextInput
            style={styles.input}
            placeholder="Vind Buildrr dicht bij jou"
            placeholderTextColor={LIGHTGRAY}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <HeaderRight
            iconName={HeaderRightLogo}
            iconWrapperStyle={CommonStyles.headerRightIconWrapper}
            imageStye={CommonStyles.headerRightIcon}
          />
        </View>
      </View>
      <ImageBackground
        source={chatscreenbg}
        style={CommonStyles.backgroundImage}>
          {
          isEmpty(user) && <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 30,
                }}
                numberOfLines={1}>
                {'Please login to initiate chat'}
              </Text>
        }
        {(loadingState || loader ) ? (
          <ActivityIndicator
            size="large"
            color="#000000"
            style={styles.loader}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              width: '100%',
            }}
            showsVerticalScrollIndicator={false}
            data={chatList}
            keyExtractor={item => item.documentId}
            renderItem={({item, index}) =>
              renderItem({item, index}, () => {
                console.info('Pressed', item);
                deleteItem({item, index});
              })
            }
          />
        )}
        {
          chatList?.length === 0 && !loadingState && <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                  textAlign: 'center',
                  marginTop: 30,
                }}
                numberOfLines={1}>
                {'No chat found'}
              </Text>
        }
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatList;
