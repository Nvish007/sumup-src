
import React, { useState, useLayoutEffect, useCallback, useEffect, useRef } from "react";
import { View, Text, SafeAreaView, StatusBar, ImageBackground, AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GiftedChat } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import { renderActions, renderComposer, renderInputToolbar, renderSend } from './inputToolbar';
import CommonStyles from "../styles/CommonStyles";
import { chatscreenbg } from "../../constants/Images";
import { isEmpty, showAlert } from "../../utils/native";
import { readMessagesById, sendMessagesById } from "../../redux/chat";
import styles from "./styles";
import ChatImageSendPopup from "../../components/chatImageSendPopup";
import { FirebaseStorageChatImage } from "../../utils/firebaseStorage";
import { renderMessageImage, renderMessageVideo } from "./MessageContainer";


const Userchat = ({route}) => {
    const insets = useSafeAreaInsets();
	const [messages, setMessages] = useState([]);
    const [loader, setLoader] = useState(false);
	const [pageLoad, setPageLoad] = useState(false);
	const [lastUpdatedText, setLastUpdatedText] = useState('');
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch();
	// console.log('route.params', route.params);
	const isFocused = useIsFocused();
	let messageId = route.params.messageId;
	let fullname = route.params.fullname;
	let uid2 = route.params.uid2;
	let profileImg = route.params.profileImg;
	let sendUserId = route.params.sendUserId;
	let initialCreditCount = user.type === 'guest' ? 1 : 0;
	let notification = route.params.notification;
	let type = route.params.type;
	let userType = route.params.userType;
	const isOnScreenRef = useRef(null);
	const listenerRef = useRef(null);
	const appState = useRef(AppState.currentState);
	const [imageMessage, setImageMessage] = useState(null);
	const [showImageModal, setShowImageModal] = useState(false);
	const [messageType, setMessageType] = useState(false);
	let imageLoad = false;

	useFocusEffect(
		useCallback(() => {
			isOnScreenRef.current = true;
	
			return () => {
				isOnScreenRef.current = false;
			};
		}, [])
	);

	function loadPageDetails() {
		// props.dispatchNotesUpdate(props.route.params.notes);
		// getUserDetails(uid2);
	}

	function sortMessages(array) {
		array.sort((b, a) => a.createdAt - b.createdAt);
		// if (imageLoad === false) {
		// 	if (array.length > 0 && array[0].text !== '') {
		// 		setLastUpdatedText(array[0].text);
		// 	}
		// 	setMessages(array);
		// }
		if (array.length > 0 && array[0].text !== '') {
			setLastUpdatedText(array[0].text);
		}
		setMessages(array);
		return;
	}

	const handleChangeState = () => {
		setPageLoad(true);
		listenerRef.current = firestore().collection('rooms').doc(messageId).collection('messages').onSnapshot((documentSnapshot) => {
			console.log('documentSnapshot.docs.length', documentSnapshot.docs.length);
			if (documentSnapshot && documentSnapshot.docs.length > 0) {
				let data = {}, temp = [], counter = 0;
				if (isOnScreenRef.current) {
					// props.dispatchUnreadMessages(messageId, user.uid);
					// dispatch(readMessagesById({ messageId, uid: user.uid }));
				}
				console.log('isOnScreenRef.current', isOnScreenRef.current);
				documentSnapshot.forEach((doc) => {
					data = doc.data();
					data.id = doc.id;
					counter += 1;
					if (data.isMsgDeleted !== true) {
						let message = {
							_id: doc.id,
							createdAt: data.createdAt,
							credit: data.credit,
							read: data.read,
							free: data?.free,
							user: {
								_id: data.userId
							}
						};
						if (!isEmpty(data.video)) {
							message.video = data.video;
						}
						if (!isEmpty(data.image)) {
							message.image = data.image;
						}
						if (!isEmpty(data.text)) {
							message.text = data.text;
						}
						if (!('deletedFrom' in data === true && data.deletedFrom.includes(user.uid))) {
							temp.push(message);
						}
					}
					if (counter === documentSnapshot.docs.length) {
						sortMessages(temp);
						setPageLoad(false);
					}
				});
			} else {
				setPageLoad(false);
			}
		}, err => console.info({err}));
	};

	useEffect(() => {
		if (isFocused === true) {
			messageId = route.params.messageId;
			fullname = route.params.fullname;
			uid2 = route.params.uid2;
			profileImg = route.params.profileImg;
			// From notification params
			// initialCreditCount;
			notification = route.params.notification;
			type = route.params.type;

			setTimeout(() => {
				loadPageDetails();
				handleChangeState();
			}, 1000);
		}
	}, [route.params.sendUserId]);

	useEffect(() => {
		loadPageDetails();
		if (appState.current === 'active') {
			handleChangeState();
		}
		const subscribeAppState = AppState.addEventListener('change', (nextAppState) => {
			if (nextAppState === 'active') {
				// App is in the foreground, start the listener
				handleChangeState();
			} else {
				// App is in the background, stop the listener
				if (listenerRef.current) {
					listenerRef.current();
					listenerRef.current = null;
				}
			}
		});

		// const creditSubscribe = firestore()
		// 	.collection('rooms')
		// 	.doc(messageId)
		// 	.onSnapshot((documentSnapshot) => {
		// 		setRooms(documentSnapshot._data);
		// 		if (!isEmpty(documentSnapshot._data)) {
		// 			initialCreditCount = documentSnapshot._data.credit;
		// 			props.dispatchCreditCount(initialCreditCount);
		// 		}
		// 	}, err => console.info({err}));

		return () => {
			// creditSubscribe();
			subscribeAppState.remove();
			if (listenerRef.current) {
				listenerRef.current();
				listenerRef.current = null;
			}
		};
	}, []);

	const handleAppStateChange = (nextAppState) => {
		// props.dispatchTotalCount(user);
		// setBadgeCount(badgeCount);
		// if (nextAppState === 'active') {
		// 	props.dispatchTotalCount(user);
		// }
	};

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, []);

	// useEffect(() => {
	// 	setBadgeCount(badgeCount);

	// 	return () => setBadgeCount(badgeCount);
	// }, [badgeCount]);

	useEffect(() => {
		// props.dispatchTotalCount(user);
	}, [isFocused]);

	function sendMessage(message) {
		// setUpdateDB(true);
		// Keyboard.dismiss();
		// Send notification
		// sendNotification(message !== undefined ? message : 'image send');
		// sendNotification(message);
	}

	const onImageSend = (newMessages = []) => {
		setMessageType(isEmpty(newMessages[0].image) ? 'video' : 'image');
		setImageMessage(newMessages);
		setShowImageModal(true);
	};

	async function sendVideoMessage(newMessages, credit, beforeMessageCredit, afterMessageCredit, free = 0) {
		imageLoad = true;
		let uploadImage = newMessages[0].video;
		newMessages[0].video = 'undefined';
		setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
		await FirebaseStorageChatImage(uploadImage, messageId, (fileName, videoUrl) => {
			// newMessages[0].image = imageUrl;
			sendMessage('video send');
			const data = { video: videoUrl, videoPath: fileName, userId: user.uid, userType: user.type, createdAt: moment(newMessages[0].createdAt).valueOf(), credit: credit, read: false, }
			// props.dispatchSendMessages(messageId, );
			dispatch(sendMessagesById({ roomId:messageId, data }));
		}).catch((errr) => {
			// console.log("err in chat :: ", errr);
		});
		imageLoad = false;
	}

	async function sendImageMessage(newMessages, credit, beforeMessageCredit, afterMessageCredit, free = 0) {
		imageLoad = true;
		let uploadImage = newMessages[0].image;
		newMessages[0].image = 'undefined';
		setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
		await FirebaseStorageChatImage(uploadImage, messageId, (fileName, imageUrl) => {
			// newMessages[0].image = imageUrl;
			// newMessages[0].imagePath = fileName;
			sendMessage('image send');
			const data = { image: imageUrl, imagePath: fileName, userId: user.uid, userType: user.type, createdAt: moment(newMessages[0].createdAt).valueOf(), credit: credit, read: false }
			// props.dispatchSendMessages(messageId, );
			dispatch(sendMessagesById({ roomId:messageId, data }));
		});
		imageLoad = false;
	}

	const sendTextMessage = (newMessages, credit = 30, beforeMessageCredit = 30, afterMessageCredit = 30, free = 0) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
		const data = { text: newMessages[0].text, userId: user.uid, userType: user.type, createdAt: moment(newMessages[0].createdAt).valueOf(), credit: credit, read: false, beforeMessageCredit, afterMessageCredit, free }
		dispatch(sendMessagesById({ roomId:messageId, data }));
	}

	const onSend = useCallback((newMessages = []) => {
		sendTextMessage(newMessages);

		if (!isEmpty(newMessages[0].video)) {
			sendVideoMessage(newMessages, 0, 0, user?.credits, 0);
		} else if (!isEmpty(newMessages[0].image)) {
			sendImageMessage(newMessages, 0, 0, user?.credits, 0);
			setImageMessage(null);
		} else {
			  sendTextMessage(newMessages, 0, 0, user?.credits, 0);     
		}
	});

    return (
        <SafeAreaView style={[CommonStyles.safeAreaView2, { backgroundColor: '#2ABCEE' }]}>
            <StatusBar barStyle='light-content' hidden={true} />
			{showImageModal && <ChatImageSendPopup
					type={messageType}
					uri={messageType === 'image' ? imageMessage[0].image : imageMessage[0].video}
					onCloseModal={() => {
						setShowImageModal(false);
						setImageMessage(null);
					}}
					onSendMessage={() => {
						onSend(imageMessage);
						setShowImageModal(false);
					}}
				/>}
            <ImageBackground
                source={chatscreenbg}
                style={CommonStyles.backgroundImage}>
                <View style={styles.scrollView}>
							<GiftedChat 
								renderAvatar={null}
								multiline={false}
								messages={messages}
								onSend={message => { console.log('message', message); loader === false ? (!isEmpty(message[0].image) || !isEmpty(message[0].video)) ? onImageSend(message) : onSend(message) : showAlert('Please wait....'); }}
								user={{
									_id: user.uid,
									fullname: user.fullname,
									name: user.username,
									type: user.type
								}}
								bottomOffset={insets.bottom}
								renderInputToolbar={renderInputToolbar}
								renderActions={renderActions}
								renderComposer={renderComposer}
								renderSend={renderSend}
								// renderBubble={renderBubble}
								// renderMessage={renderMessage}
								// renderMessageText={renderMessageText}
								// renderDay={renderDay}
								// renderTime={renderTime}
								renderMessageImage={renderMessageImage}
								renderMessageVideo={renderMessageVideo}
								// onLongPress={onLongPress}
								minInputToolbarHeight={60}
							/>
						</View>
                </ImageBackground>
        </SafeAreaView>
    )
}

export default Userchat;