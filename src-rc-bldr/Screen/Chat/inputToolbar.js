import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showAlert, imagePickerOptions, isEmpty, imagePickerOptions1 } from '../../utils/native';
import { Platform, PermissionsAndroid, TouchableOpacity } from 'react-native';

export const renderInputToolbar = (props) => (
	<InputToolbar
		{...props}
		containerStyle={{
			backgroundColor: '#000',
			paddingTop: Platform.OS === 'ios' ? 6 : 10,
			color: '#fff',
			paddingRight: 5,
			paddingBottom: 10
		}}
		primaryStyle={{ alignItems: 'center' }}
	/>
);

export const renderActions = (props) => (
	<Actions
		{...props}
		containerStyle={{
			width: 25,
			height: 25,
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: 4,
			marginRight: 4,
			marginBottom: 0,
		}}
		icon={() => (
			<AntDesign name="plus" size={24} color={'#fff'} />
		)}
		options={{
			'Take Photo': () => {
				if (Platform.OS === 'ios') {
					getImage(props, 'image');
				} else {
					getImageFromCamera(props, 'image');
				}
			},
			'Take Video': () => {
				if (Platform.OS === 'ios') {
					getImage(props, 'video');
				} else {
					getImageFromCamera(props, 'video');
				}
			},
			'Choose From Library': () => {
				getImageFromGallery(props);
			},
			Cancel: () => {
			},
		}}
		optionTintColor="#222B45"
	/>
);

async function getImageFromCamera(props, type) {
	const permission = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.CAMERA,
		{
			title: 'App Camera Permission',
			message: 'App needs access to your camera',
			buttonNegative: 'Cancel',
			buttonPositive: 'OK'
		}
	);
	if (permission === PermissionsAndroid.RESULTS.GRANTED) {
		getImage(props, type);
	} else {
		console.info('Camera permission denied');
		showAlert('Camera permission denied');
	}
}

async function getImageFromGallery(props) {
	const result = await launchImageLibrary(imagePickerOptions());
	if (result.didCancel === true) {
		return;
	} else {
		let assets = result.assets[0];
		if (assets.type.split('/')[0] === 'image') {
			sendImage(props, assets);
		} else {
			sendVideo(props, assets);
		}
	}
}

async function getImage(props, type) {
	let options;
	if (type === 'image') {
		options = imagePickerOptions();
	} else {
		options = imagePickerOptions1();
	}
	const result = await launchCamera(options);
	if (result.errorCode === 'camera_unavailable') {
		showAlert('Error', 'Camera is not available');
	} else {
		let assets = result.assets[0];
		if (assets.type.split('/')[0] === 'image') {
			sendImage(props, assets);
			// getImageWithMarker(props, assets);
		} else {
			sendVideo(props, assets);
		}
	}
}

// function getImageWithMarker(props, assets) {
// 	imageMarkerChat(assets.uri).then((imageMakerRes) => {
// 		if (imageMakerRes.responseImg === true) {
// 			sendImage(props, imageMakerRes);
// 		}
// 	});
// }


function sendImage(props, assets) {
	// let img = `data:${assets.type};base64,` + assets.base64;
	// console.warn('RESULT:', img);

    console.log('props', props);
	let data = {
		user: props.user,
		image: assets.uri
	};
	props.onSend(data);
}


function sendVideo(props, assets) {
	let data = {
		user: props.user,
		video: assets.uri
	};
	props.onSend(data);
}

const inputStyleIOS = {
	color: '#222B45',
	backgroundColor: '#fff',
	borderWidth: 1,
	borderRadius: 20,
	borderColor: '#E4E9F2',
	paddingTop: 8.5,
	paddingHorizontal: 12,
	marginLeft: 0,
	width: 50,
	textAlign: 'center',
	paddingVertical: 5
};

const inputStyle = {
	color: '#222B45',
	backgroundColor: '#fff',
	borderWidth: 1,
	borderRadius: 20,
	borderColor: '#E4E9F2',
	paddingTop: 8.5,
	paddingHorizontal: 12,
	marginLeft: 0,
	width: 50,
	textAlign: 'center'
};

export const renderComposer = (props) => (
	<Composer
		{...props}
		textInputStyle={!isEmpty(props.text) ?
			{
				color: '#222B45',
				backgroundColor: '#fff',
				borderWidth: 1,
				borderRadius: 20,
				borderColor: '#E4E9F2',
				paddingTop: 8.5,
				paddingHorizontal: 12,
				marginLeft: 0,
				textAlign: 'center'
			}
			:
			Platform.OS === 'ios' ? inputStyleIOS : inputStyle
		}
		text={Platform.OS === 'ios' && props.text.match(/\w\s\s+/g) ? props.text.replace(/\s\s+/g, '. ') : props.text}
	/>
);

export const renderSend = (props) => (
	<>
		<Send
			{...props}
			disabled={!props.text}
			containerStyle={{
				width: 44,
				height: 44,
				alignItems: 'center',
				justifyContent: 'center',
				// marginHorizontal: 4,
			}}
		>
			<AntDesign  name="search1" size={22} color={'#fff'} />
		</Send>

		<TouchableOpacity onPress={() => getImageFromGallery(props)}>
			<AntDesign name="picture" style={!props.text && { marginHorizontal: 6 }} size={25} color={'#fff'} />
		</TouchableOpacity>
	</>
);
