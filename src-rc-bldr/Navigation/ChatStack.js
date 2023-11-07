import React, { useEffect, useState } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { BUILDRR_BLUE } from '../constants/Colors';
import CommonStyles from '../Screen/styles/CommonStyles';
import ChatList from '../Screen/Chat/ChatList';
import Userchat from '../Screen/Chat/UserChat';
import { isEmpty, userRoomIds } from '../utils/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { listChatUsersFinish } from '../redux/chat/slice';
import searchProfile from '../Screen/Chat/searchProfile';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const defaultHeaderOptions = {
    headerTitleStyle: CommonStyles.defaultHeaderTitle,
    headerStyle: CommonStyles.defaultHeader,
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: "center",
};

const ChatStack = () => {
	const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
	const isFocused = useIsFocused();
	const [loader, setLoader] = useState(false);
	const navigation = useNavigation();
	let chatListSubscribe;

    useEffect(() => {
		if(!isEmpty(user)){
			const fields = userRoomIds(user.type);
			console.log('fields', fields);
			setLoader(true);
			chatListSubscribe = firestore()
				.collection('rooms')
				.where(fields[0], '==', user.uid)
				.onSnapshot(snapShot => {
					firestore()
						.collection('rooms')
						.where(fields[1], '==', user.uid)
						.onSnapshot(snapShot1 => {
							firestore()
								.collection('rooms')
								.where(fields[2], '==', user.uid)
								.onSnapshot(snapShot2 => {
									// props.dispatchTotalCount(user);
									dispatch(listChatUsersFinish(user));
									const query = snapShot.docs.map(doc => doc.data()).concat(snapShot1.docs.map(doc => doc.data())).concat(snapShot2.docs.map(doc => doc.data()));
									const result = query.sort((b, a) => a.updatedAt - b.updatedAt).filter((e, i) => query.findIndex(a => (a.documentId === e.documentId)) === i);
									let temp = [];
									if (result && result.length === 0) {
										console.log('result is here', result);
										// props.updateChatUsersList(temp);
										dispatch(listChatUsersFinish(temp));
									}
									if (!result.empty) {
										let count = 0;
										result.forEach(async(data) => {
											data.msgCount = 0;
											firestore()
												.collection('rooms')
												.doc(data.documentId)
												.collection('messages')
												.where('read', '==', false)
												.onSnapshot(res => {
													data.read = 0;
													res.forEach((document) => {
														if (document.data().userId !== user.uid) {
															data.read += 1;
														}
													});
												}, error => console.info({error}));
											let user2_condition = user.type === 'prime' ? 
												(!isEmpty(data.guestUserId) && data.guestUserId) :
												(!isEmpty(data.primeUserId) ? data.primeUserId : !isEmpty(data.guestUserId1) && user.uid !== data.guestUserId1 ? data.guestUserId1 : data.guestUserId2);
											if (user2_condition !== false) {
												await firestore().collection('users').doc(user2_condition).get().then((response) => {
													data.fullname = response.data()?.fullname;
													data.profileImg = response.data()?.profileImg;
													data.uid2 = response.data()?.uid;
													data.userType = response.data()?.type;
													data.username = response.data()?.username;
													temp.push(data);
												});
											} else {
												count += 1;
											}
											if (result.length === temp.length || result.length === (temp.length + count)) {
												temp = temp.filter((obj) => (obj.lastMessage !== null || obj.userLastMessage !== null));
												temp.sort((a, b) => b.updatedAt - a.updatedAt);
												// props.updateChatUsersList(temp);
												dispatch(listChatUsersFinish(temp));
											}
										});
										setLoader(false);
									} else {
										// props.updateChatUsersList(temp);
										dispatch(listChatUsersFinish(temp));
										setLoader(false);
									}
									setLoader(false);
									console.log('here is temp', temp);
								}, error => { setLoader(true); console.info('error getRoomList: ', error)});
						}, error => { setLoader(true); console.info('error getRoomList: ', error) });
				}, error => { setLoader(true); console.info('error getRoomList: ', error)});
		}
		return () => {
			// unsubscribe();
			if (chatListSubscribe){
				chatListSubscribe();
			}
		};
    }, [isFocused]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            }}
            initialRouteName={'Chat'}
        >
            <Stack.Screen
                options={{
                  headerShown: false
                }}
                name="Chat" component={() => <ChatList navigation={navigation} loadingState={loader} />} />
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
                name="UserChat" component={Userchat} />
			<Stack.Screen
				options={{
                    headerStyle: {
                        backgroundColor: BUILDRR_BLUE
                    },
                    ...defaultHeaderOptions,
                }}
				name='SearchProfile' component={searchProfile} />
        </Stack.Navigator>
    );
}

export default ChatStack;
