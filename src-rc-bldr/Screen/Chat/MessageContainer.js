import moment from 'moment';
import React from 'react';
import { ActivityIndicator, Text, View, Image } from 'react-native';
import { Bubble, Day, Message, MessageText, Time, MessageImage } from 'react-native-gifted-chat';
import { isEmpty } from '../../utils/native';
import TriangleIcon from 'react-native-vector-icons/Octicons';
import Video from 'react-native-video';
import styles from './MessageContainerStyles';

export const renderBubble = (props) => (
	<Bubble
		{...props}
		containerStyle={{
			left: {},
			right: {},
		}}
		wrapperStyle={{
			left: { backgroundColor: '#e5e7e8', marginBottom: 5 },
			right: { backgroundColor: '#000', marginTop: 5 },
		}}
		bottomContainerStyle={{
			left: {},
			right: {},
		}}
		tickStyle={{}}
	/>
);

export const renderMessage = (props) => {
	return (
		props.user.type === 'prime' && isEmpty(props?.nextMessage.createdAt) ?
			<>
				<View style={styles.lastMessageTipStyle}>
					<Message
						{...props}
					/>
					<View style={styles.tipsTextLastMsg}>
						{messagesByDate(props)}
					</View>
				</View>
			</>
			:
			<>
				{messagesByDate(props)}
				<Message
					{...props}
				/>
			</>
	);
};

export const renderMessageText = (props) => {
	return (
		<>
			{isEmpty(props?.nextMessage.text) && isEmpty(props?.nextMessage.image) && isEmpty(props?.nextMessage.video) ?
				<>
					<MessageText
						{...props}
					/>
					<TriangleIcon name="triangle-right" size={40} color={props.user._id === props?.currentMessage.user._id ? '#000' : '#e5e7e8'} style={styles.triangleText} />
				</>
				:
				<MessageText
					{...props}
				/>
			}
		</>
	);
};

export const renderMessageImage = (props) => {
	return (
		<>
			{props?.previousMessage.image === 'undefined' || props?.currentMessage.image === 'undefined' ?
				<View style={styles.imageLoadView}>
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
				:
				isEmpty(props?.nextMessage.video) && isEmpty(props?.nextMessage.image) && isEmpty(props?.nextMessage.text) ?
					<>
						<MessageImage
							{...props}
						/>
						<TriangleIcon name="triangle-right" size={40} color={props.user._id === props?.currentMessage.user._id ? '#000' : '#e5e7e8'} style={styles.triangleImage} />
						{props.user.type === 'prime' && (props?.currentMessage.credit > 0 || props?.currentMessage.free > 0) &&
							<Text style={styles.tipsImage}>{props?.currentMessage.free > 0 && `${translate('userChatScreen.free')}: ${props?.currentMessage.free}`} {props?.currentMessage.credit > 0 && `${translate('userChatScreen.tip')}: ${props?.currentMessage.credit}`} {translate('userChatScreen.pennycoins')}</Text>
						}
					</>
					:
					<>
						<MessageImage
							{...props}
						/>
						{props.user.type === 'prime' && (props?.currentMessage.credit > 0 || props?.currentMessage.free > 0) &&
							<Text style={styles.tipsImage}>{props?.currentMessage.free > 0 && `${translate('userChatScreen.free')}: ${props?.currentMessage.free}`} {props?.currentMessage.credit > 0 && `${translate('userChatScreen.tip')}: ${props?.currentMessage.credit}`} {translate('userChatScreen.pennycoins')}</Text>
						}
					</>
			}
		</>
	);
};

export const renderMessageVideo = (props) => {
	return (
		<>
			{props?.previousMessage.video === 'undefined' || props?.currentMessage.video === 'undefined' ?
				<View style={styles.videoLoadView}>
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
				:
				isEmpty(props?.nextMessage.video) && isEmpty(props?.nextMessage.image) && isEmpty(props?.nextMessage.text) ?
					<>
						{!isEmpty(props?.currentMessage.video) && VideoView(props)}
						<TriangleIcon name="triangle-right" size={40} color={props.user._id === props?.currentMessage.user._id ? '#000' : '#e5e7e8'} style={styles.triangleImage} />
						{/* {props.user.type === 'prime' && (props?.currentMessage.credit > 0 || props?.currentMessage.free > 0) &&
							<Text style={styles.tipsImage}>{props?.currentMessage.free > 0 && `${translate('userChatScreen.free')}: ${props?.currentMessage.free}`} {props?.currentMessage.credit > 0 && `${translate('userChatScreen.tip')}: ${props?.currentMessage.credit}`} {translate('userChatScreen.pennycoins')}</Text>
						} */}
					</>
					:
					<>
						{!isEmpty(props?.currentMessage.video) && VideoView(props)}
						{/* {props.user.type === 'prime' && (props?.currentMessage.credit > 0 || props?.currentMessage.free > 0) &&
							<Text style={styles.tipsImage}>{props?.currentMessage.free > 0 && `${translate('userChatScreen.free')}: ${props?.currentMessage.free}`} {props?.currentMessage.credit > 0 && `${translate('userChatScreen.tip')}: ${props?.currentMessage.credit}`} {translate('userChatScreen.pennycoins')}</Text>
						} */}
					</>
			}
		</>
	);
};

export const VideoView = (props) => {
	return (
		<View style={styles.videoView}>
			<Video
				style={styles.videoContent}
				resizeMode="cover"
				height={150}
				width={250}
				// muted={true}
				controls={true}
				paused={true}
				source={{ uri: props?.currentMessage.video }}
				allowsExternalPlayback={false} />
		</View>
	);
};
