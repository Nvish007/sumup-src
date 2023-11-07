import { Alert, Platform } from 'react-native';

export function isEmpty(value) {
	return value === null || value === '' || value === undefined || (typeof value === 'string' && value.replace(/^[ ]+|[ ]+$/g, '') === '');
}

export function showAlert(title, message, buttonText, onOk) {
	Alert.alert(
		title,
		message,
		[
			{
				text: buttonText ? buttonText : 'Ok',
				onPress: () => { if (onOk) {onOk();} }
			}
		],
		{ cancelable: false }
	);
}

export function confirmAlert(title, message, okText, cancelText, onOk, onCancel) {
	Alert.alert(
		title,
		message,
		[
			{
				text: okText ? okText : 'Ok',
				onPress: () => { if (onOk) {onOk();} }
			},
			{
				text: cancelText ? cancelText : 'Cancel',
				onPress: () => { if (onCancel) {onCancel();} }
			}
		],
		{ cancelable: false }
	);
}

export function imagePickerOptions() {
	const options = {
		title: 'Select Photo',
		// mediaType: 'photo',
		mediaType: 'mixed',
		noData: true,
		maxWidth: 1000,
		maxHeight: 1000,
		storageOptions: {
			skipBackup: true,
			path: 'images',
			cameraRoll: true,
			waitUntilSaved: true
		},
		quality: 0.9,
		includeBase64: true
	};
	return options;
}

export function imagePickerOptions1() {
	const options = {
		title: 'Select Video',
		mediaType: 'video',
		noData: true,
		maxWidth: 1000,
		maxHeight: 1000,
		storageOptions: {
			skipBackup: true,
			path: 'videos',
			cameraRoll: true,
			waitUntilSaved: true
		},
		quality: 0.9,
		includeBase64: true
	};
	return options;
}

export function getUsersTypeForRoom(user1, user2) {
	if ((user1.type === 'prime' && user2.type === 'guest')) {
		return { type: 1, 'primeUserId': user1.uid, 'guestUserId': user2.uid };
	}
	if ((user1.type === 'guest' && user2.type === 'prime')) {
		return { type: 1, 'guestUserId': user1.uid, 'primeUserId': user2.uid };
	}
	if (user1.type === 'guest' && user2.type === 'guest') {
		return { type: 2, 'guestUserId1': user1.uid, 'guestUserId2': user2.uid };
	}
	if (user1.type === 'prime' && user2.type === 'prime') {
		return { type: 3, 'primeUserId1': user1.uid, 'primeUserId2': user2.uid };
	}
}

export function userRoomIds(type) {
	if (type === 'prime') {
		return ['primeUserId', 'primeUserId1', 'primeUserId2'];
	}
	if (type === 'guest') {
		return ['guestUserId', 'guestUserId1', 'guestUserId2'];
	}
}


