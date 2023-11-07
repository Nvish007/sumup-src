import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { TabActions } from '@react-navigation/native';
import { isEmpty } from '../utils/native';
import { store } from '../redux/store';
import { navigationRef } from '../Navigation/RootNavigator';


export const getToken = async() => {
	const fcmToken = await messaging().getToken();
	return fcmToken;
};

export async function setBackgroundMessageHandler() {
	messaging().setBackgroundMessageHandler(async remoteMessage => {
		console.info('Message handled in the background!');
		if (remoteMessage) {
			const { isLoggedIn } = store.getState().auth;
			console.log('isLoggedIn', isLoggedIn);
			if (Platform.OS === 'ios' && isLoggedIn) {
				await notifee.incrementBadgeCount();
				const notificationCount = await notifee.getBadgeCount();
				console.log('notificationCount>>>', notificationCount);
				// setBadgeCount(notificationCount);
			}
		}
	});

	if (Platform.OS === 'android') {
		// Create a channel (required for Android)
		await notifee.createChannel({
			id: 'notification',
			name: 'Message Alerts',
			sound: 'coin_win_notification.wav',
			importance: AndroidImportance.HIGH,
		});
	}
}

export const setForegroundMesageHandler = () => {
	return messaging().onMessage(async(remoteMessage) => {
		console.info('on foreground remoteMessage');
		const notification = remoteMessage.notification;
		showLocalNotification(notification.title, notification.body, remoteMessage.data);
	});
};

export const setNotifeeForegroundEvent = async() => {
	return notifee.onForegroundEvent(({ type, detail}) => {
		console.log('notifie foregorund');
		switch (type) {
			case EventType.DISMISSED:
				break;
			case EventType.PRESS:
				console.log('User pressed notification');
				navigateToChat(detail.notification.data);
				break;
		}
	});
};

async function showLocalNotification(title, body, data) {
	if (Platform.OS === 'ios') {
		// Request permissions (required for iOS)
		await notifee.requestPermission();
	}

	notifee.displayNotification({
		title,
		body,
		android: {
			channelId: 'notification',
			pressAction: {
				launchActivity: 'default',
				id: 'open-chat',
			},
			// sound: 'coin_win_notification.wav',
		},
		ios: {
			foregroundPresentationOptions: {
				alert: true,
				badge: true,
				sound: true,
			},
			// sound: 'coin_win_notification.wav',
		},
		data
	});
}

function navigateToChat(data) {
	navigationRef.current.dispatch(
		TabActions.jumpTo('Chat', {
			screen: 'UserChat',
			params: {
				messageId: data.messageId,
				uid2: data.uid2,
				fullname: data.fullname,
				credit: data.credit,
				profileImg: data.profileImg,
				notes: data.notes,
				sendUserId: data.sendUserId,
				notification: true,
				type: data.type,
				userType: data.userType
			}
		})
	);
}

const getAndUpdateToken = (uid, type) => {
	return new Promise((resolve, reject) => {
		messaging()
			.getToken()
			.then((token) => {
				console.log('token in update', token);
				if (type === 'new user') {
					resolve(token);
				} else {
					UserService.updatePushToken(uid, token)
						.then(() => {
							const { user } = store.getState().authReducer;
							if (!isEmpty(user)) {
								user.token = token;
							}
							resolve();
						})
						.catch((error) => reject(new Error(error)));
				}
			})
			.catch((error) => reject(new Error(error)));
	});
};

export const updateToken = async(uid, type) => {
	if (Platform.OS === 'ios') {
		// Handle for the iOS after requesting permission
		const authStatus = await messaging().requestPermission();
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			let token = await getAndUpdateToken(uid, type);
			return token;
		}
	} else {
		let token = await getAndUpdateToken(uid, type);
		return token;
	}
};

export const deleteToken = () => {
	return new Promise((resolve, reject) => {
		messaging()
			.deleteToken()
			.then(() => {
				resolve();
			})
			.catch((error) => reject(new Error(error)));
	});
};

export const sendNotification = (data) => {
	const requestInstance = getUnauthenticatedInstance();
	return requestInstance.post('/fcm/send-notification', data);
};

export const setBadgeCount = (messageCount) => {
	const { appStateInfo } = store.getState().fcmReducer;
	if (Platform.OS === 'ios') {
		const count = typeof messageCount === 'number' ? messageCount : Number(messageCount);
		if (appStateInfo !== 'background') {
			notifee.setBadgeCount(count).then(() => console.log('Badge count set!'));
		}
	}
};
