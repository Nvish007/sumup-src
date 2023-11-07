import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	ScrollView,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	Platform,
	Image,
	Keyboard,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../utils/native';
import { addUserToChat, handleSearchUser, listChatUsers } from '../../redux/chat';
import { LinearGradient } from 'react-native-svg';
import styles from './styles';
import CommonStyles from '../styles/CommonStyles';
import { chatscreenbg, john } from '../../constants/Images';


const searchProfile = ({route, navigation}) => {
    const dispatch = useDispatch();

    const [text, setText] = useState(route.params.search); 
    const user = useSelector(state => state.auth.user);
    const userList = useSelector(state => state.chat.userList);
    const addedUserId = useSelector(state => state.chat.addedUserId);
    const [loader, setLoader] = useState(false);

    useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false
		});
		if (!isEmpty(text)) {
			// props.dispatchSearchUser(text, user);
            dispatch(handleSearchUser({value: text, user}))
		}
	}, [navigation]);

	useEffect(() => {
		setLoader(false);
	}, [userList]);

	useEffect(() => {
		let flag = false;
		if (!isEmpty(addedUserId) && flag === false) {
			flag = true;
			routeToChat();
		}
	}, [addedUserId]);

    const onResponse = (res) => {
        console.log('res', res);
    };

    const callback = (details) => {
        console.log('details', details);
            let result = 0;
			let flag = false;
			details?.forEach(element => {
				result += 1;
				if (element.documentId === addedUserId) {
					setLoader(false);
					flag = true;
					// props.dispatchSearchUser('', user);
                    dispatch(handleSearchUser({value: '', user}))
					navigation.pop();
                    dispatch(listChatUsers({user, type: 'list', onResponse }));
					// props.dispatchChatUsersList(user, 'list', );
					navigation.navigate('UserChat', { params: {
						messageId: element.documentId,
						fullname: element.fullname,
						uid2: element.uid2,
						credit: element.credit,
						profileImg: element.profileImg,
						notification: false,
						type: !isEmpty(element.type) ? element.type : 1
					} });
				}
				if (details.length === result && flag === false) {
					setLoader(false);
					showAlert('No chat for the user is found!');
				}
			});
    }

    const routeToChat = () => {
        const type = 'search';
        dispatch(listChatUsers({user, type, callback }));
		// dispatchChatUsersList(user, 'search', (details) => {
		// 	let result = 0;
		// 	let flag = false;
		// 	details.forEach(element => {
		// 		result += 1;
		// 		if (element.documentId === addedUserId) {
		// 			setLoader(false);
		// 			flag = true;
		// 			props.dispatchSearchUser('', user);
		// 			props.navigation.pop();
		// 			props.dispatchChatUsersList(user, 'list', () => { });
		// 			props.navigation.navigate('Chat', { screen: 'UserChat', params: {
		// 				messageId: element.documentId,
		// 				fullname: element.fullname,
		// 				uid2: element.uid2,
		// 				credit: element.credit,
		// 				profileImg: element.profileImg,
		// 				notification: false,
		// 				type: !isEmpty(element.type) ? element.type : 1
		// 			} });
		// 		}
		// 		if (details.length === result && flag === false) {
		// 			setLoader(false);
		// 			showAlert('No chat for the user is found!');
		// 		}
		// 	});
		// });
	};

    const handleSearch = () => {
        console.log('was here', loader);
        if (loader === false) {
            if (!isEmpty(text)) {
                setLoader(true);
            }
            dispatch(handleSearchUser({value: text, user}));
        }
        Keyboard.dismiss();
    };

    const onCallback = (res) => {
        console.log('res', res);
    }

    return (
        <SafeAreaView style={[CommonStyles.safeAreaView2, { backgroundColor: '#2ABCEE' }]}>
            <StatusBar barStyle='light-content' hidden={true} />
            <ImageBackground
                source={chatscreenbg}
                style={CommonStyles.backgroundImage}>
                    <View>
                        <Text>
                            search screen
                        </Text>
                    </View>
                    <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled" automaticallyAdjustContentInsets={true} automaticallyAdjustsScrollIndicatorInsets={true}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate('UserChat'); }} >
                            <Text>Close</Text>
                        </TouchableOpacity>

                        <View style={styles.innerContainer}>
                            <Image style={styles.searchIcon} source={john} />
                            <Text style={styles.searchText}>{'search'}</Text>
                            <Text style={styles.contentText}>{'header1'}</Text>
                            <Text>{'header2'}</Text>
                            <Text>{'header3'}</Text>
                            <TextInput
                                style={styles.textarea}
                                // onChangeText={(value) =>  { setText(value); setLoader(true); props.dispatchSearchUser(value, user);}}
                                onChangeText={(value) =>  { setText(value); }}
                                value={text}
                                multiline
                                editable={loader === false ? true : false}
                            />
                            <TouchableOpacity style={styles.nameButton} onPress={() => { handleSearch(); }}>
                                <Text style={styles.nameButtonText}>{'search'}</Text>
                            </TouchableOpacity>
                            {loader ?
                                <ActivityIndicator size="large" color="#000000" />
                                :
                                userList && userList.map((key, index) => {
                                    return (
                                        <View key={index.toString()}>
                                            <TouchableOpacity style={styles.actionBox} onPress={() =>{
                                                setLoader(true);
                                                // props.dispatchAddUserToChat(user, key, (res) => {});
                                                dispatch(addUserToChat({user1: user, user2: key, onCallback}))
                                            }}>
                                                <LinearGradient style={styles.linearGradient}>
                                                    <Image style={styles.searchIcon} source={john} />
                                                </LinearGradient>
                                                <Text style={key.type === 'prime' ? styles.actionText1 : styles.actionText}>
                                                    <Text>
                                                        {key.fullname}
                                                    </Text>
                                                    {key.type === 'prime' &&
                                                        <Image style={styles.searchIcon} source={john} />
                                                    }
                                                </Text>
                                                <Image style={styles.searchIcon} source={john} />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                        </View>
                    </ScrollView>
                </ImageBackground>
        </SafeAreaView>
    )
}

export default searchProfile;
