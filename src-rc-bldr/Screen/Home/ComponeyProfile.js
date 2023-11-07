import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Linking,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Overlay} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {BLACK, BUILDRR_BLUE, TABCOLOR, WHITE} from '../../constants/Colors';
import {
  backIcon,
  burger2,
  chatIcon,
  euroIcon,
  HeaderRightLogo,
  locationBlueIcon,
  locationIcon,
  whaatsapp,
  whiteStarIcon,
} from '../../constants/Images';
import HeaderLeft from '../../components/HeaderLeft';
import HeaderRight from '../../components/HeaderRight';
import HeaderTitle from '../../components/headerTitle';
import Info from './TabComponent/Info';
import AuthStyle from '../styles/AuthStyle';
import CommonStyles from '../styles/CommonStyles';
import SpaceStyles from '../styles/SpaceStyles';
import TextStyles from '../styles/TextStyles';
import Gallery from './TabComponent/Gallery';
import {calculateDistanceAndTime} from '../../utils/helpers';
import { addUserToChat } from '../../redux/chat';
import { confirmAlert, isEmpty } from '../../utils/native';

const ComponeyProfile = ({navigation, route}) => {
  const currentUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const info = route.params.itemInfo;
  const headerimage = info?.extra_info
    ? info?.extra_info.find(item => item.key == 'headerimage')
    : [];
  const realisationsImages = info?.extra_info
    ? info?.extra_info.find(item => item.key == 'realisations')
    : [];
  const whatsappNumber = info?.extra_info
    ? info?.extra_info.find(item => item.key == 'whatsapp')
    : {};
    const stars = info?.extra_info
    ? info?.extra_info.find(item => item.key == 'stars')
    : {};
    const price_per_hour = info?.extra_info
    ? info?.extra_info.find(item => item.key == 'price_per_hour')
    : {};
  const [state] = useState({
    index: 0,
    routes: [
      {key: 'Info', title: 'Info'},
      {key: 'Gallerij', title: 'Gallerij'},
    ],
  });

  const onCallback = (res, user) => {
    navigation.navigate('ChatStack', { screen: 'UserChat', params: {
      messageId: res.documentId,
      fullname: '',
      uid2: user.uid,
      credit: 0,
      profileImg: null,
      notification: false,
      type: !isEmpty(user.type) ? user.type : 1
    } });
  }

  const handleChatNavigation = () => {
    if (isEmpty(currentUser)) {
      confirmAlert('Please login to start chat!', '', 'Okay', 'Cancel', async() => {
        navigation.navigate('Login');
      }, () => { });
      return
    }
    const userIdObject = info?.extra_info?.find(item => item.key === "userId");

    const userIdValue = userIdObject ? userIdObject.value : null;

    const user = {
      uid: userIdValue,
      type: 'prime'
    }

    dispatch(addUserToChat({user1: currentUser, user2: user, onCallback}))
  }

  const {myCurrentLocation} = useSelector(state => state.nearestNearestItems);
  const location2 = {
    latitude: info.contact.latitude,
    longitude: info.contact.longitude,
  };
  const {distanceInMeters} = calculateDistanceAndTime(
    myCurrentLocation,
    location2,
  );
  const [isPopupVisible, setPopupVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => '',
      headerRight: () => (
        <HeaderRight
          iconName={HeaderRightLogo}
          iconWrapperStyle={CommonStyles.headerRightIconWrapper}
          imageStye={CommonStyles.headerRightIcon}
        />
      ),
      headerLeft: () => (
        <HeaderLeft
          text={info?.general?.name}
          iconName={backIcon}
          onPress={() => navigation.goBack()}
          iconStyle={CommonStyles.headerBackIcon}
          textStyles={CommonStyles.smallTopSpacing}
        />
      ),
    });
  }, [navigation]);

  const renderScene = SceneMap({
    Info: () => <Info profileInfo={info} />,
    Gallerij: () => <Gallery realisationsImages={realisationsImages} />,
  });

  const _handleIndexChange = index => {
    state.index = index;
  };

  const openWhatsApp = phoneNumber => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
     Linking.openURL(whatsappUrl)
    .then(() => {
      console.log('WhatsApp opened successfully');
    })
    .catch((error) => {
      console.error('Error opening WhatsApp:', error);
    });
  };

  return (
    <ScrollView contentContainerStyle={SpaceStyles.flex1}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={BUILDRR_BLUE}
      />
      <View
        style={{
          backgroundColor: WHITE,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={CommonStyles.coverImageBG} />
        {
          <Image
            source={{uri: headerimage?.value[0] || info?.media[0]}}
            resizeMode={'cover'}
            style={[CommonStyles.coverImage, {borderRadius: 20}]}
          />
        }
      </View>
      <ImageBackground
        source={require('../../Assets/backgroundImage.png')} // Hier geef je het pad naar je afbeelding op
        style={CommonStyles.backgroundImage}>
        <View
          style={[AuthStyle.containerWithoutBG, SpaceStyles.spaceHorizontal]}>
          <View style={[SpaceStyles.flexRow, SpaceStyles.top1]}>
            <View>
              <View style={CommonStyles.compneyProfileImageContainer}>
                <Image
                  source={{uri: info?.media[0]}}
                  style={CommonStyles.compneyProfileImage}
                />
              </View>
            </View>
          </View>
          <Text
            style={[TextStyles.bold20, {alignSelf: 'center', marginTop: 40}]}>
            {info?.general?.name}
          </Text>
          {info?.general?.tags[0]?.title && (
            <Text style={[TextStyles.regular14DarkGray, {alignSelf: 'center'}]}>
              {info?.general?.tags[0]?.title}
            </Text>
          )}
          <View
            style={[
              SpaceStyles.alignSpaceBlock,
              SpaceStyles.vertical2,
              SpaceStyles.padding5,
            ]}>
            <View style={CommonStyles.BUILDRR_BLUERattingView}>
              <Text style={[TextStyles.regular15White, {top: 2}]}>{Number(stars?.value || 0).toFixed(1)}</Text>
              <Image source={whiteStarIcon} />
            </View>
            <View style={CommonStyles.verticleLineInfo} />
            <View style={CommonStyles.iconWithItems}>
              <Image
                source={locationBlueIcon}
                style={[CommonStyles.icon, CommonStyles.iconRightSpacing]}
              />
              <Text style={[TextStyles.regular15Black, {top: 2}]}>{info?.distance}{`${((distanceInMeters || 0) / 1000).toFixed()} km`}</Text>
            </View>
            <View style={CommonStyles.iconWithItems}>
              <Image
                source={euroIcon}
                style={[CommonStyles.icon, CommonStyles.iconRightSpacing]}
              />
              <Text style={[TextStyles.regular15Black, {top: 2}]}>
                uurtarief: €{price_per_hour?.value || 0}
              </Text>
            </View>
          </View>
          <View
            style={[
              SpaceStyles.padding5,
              CommonStyles.iconWithItems,
              SpaceStyles.top1,
            ]}>
            <View
              style={[
                CommonStyles.iconWithItems,
                CommonStyles.chatWithMeContainer,
                CommonStyles.marginRight10,
              ]}>
              <Image
                source={chatIcon}
                style={[
                  CommonStyles.chatIcon,
                  CommonStyles.iconRightSpacing,
                  CommonStyles.headerRightIconWrapper,
                ]}
              />
              <Pressable onPress={handleChatNavigation}>
                <Text
                  numberOfLines={1}
                  style={[TextStyles.bold16White, {top: 2}]}>
                  CHAT WITH ME HERE
                </Text>
              </Pressable>
            </View>
            {whatsappNumber && whatsappNumber.value && (
              <View>
                <Pressable
                  onPress={() => openWhatsApp(whatsappNumber.value)}
                  style={CommonStyles.grayWrapper}>
                  <Image source={whaatsapp} style={{height: 30, width: 30}} />
                </Pressable>
              </View>
            )}
          </View>
          <TabView
            navigationState={state}
            renderScene={renderScene}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: BUILDRR_BLUE,
                }}
                indicatorContainerStyle={{
                  borderBottomWidth: 1,
                  borderColor: '#eaeaea',
                }}
                style={{
                  shadowOffset: { height: 0, width: 0 },
                  shadowColor: 'transparent',
                  shadowOpacity: 0,
                  elevation: 0,
                  backgroundColor: 'transparent'
                }}
                renderLabel={({route, focused}) => (
                  <Text
                    style={{margin: 8, color: focused ? BUILDRR_BLUE : BLACK}}>
                    {route.title}
                  </Text>
                )}
              />
            )}
            onIndexChange={_handleIndexChange}
          />
        </View>
        <Overlay
          isVisible={isPopupVisible}
          onBackdropPress={() => setPopupVisible(true)}>
          <View style={CommonStyles.overlayContainer}>
            <Text>binnenkort beschikbaar</Text>
          </View>
          <TouchableOpacity
            onPress={() => setPopupVisible(false)}
            style={CommonStyles.okBtn}>
            <Text style={{textAlign: 'right'}}>OK</Text>
          </TouchableOpacity>
        </Overlay>
      </ImageBackground>
    </ScrollView>
  );
};

export default ComponeyProfile;
