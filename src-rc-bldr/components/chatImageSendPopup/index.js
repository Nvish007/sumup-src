import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import styles from './styles';

const ChatImageSendPopup = ({uri, onCloseModal, onSendMessage, type}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
		>
			<View style={styles.modalView}>
				<View style={styles.sendImageView}>
					<TouchableOpacity
						style={styles.closeBtn}
						onPress={onCloseModal}
					>
						<Text>close</Text>
					</TouchableOpacity>
					{
						type === 'image' ?
							<Image source={{uri}} style={styles.chatImg} /> :
							<View style={styles.videoView}>
								<Video
									style={styles.videoContent}
									resizeMode="contain"
									controls={true}
									paused={true}
									source={{ uri }}
									allowsExternalPlayback={false} />
							</View>
					}
				</View>
				<TouchableOpacity
					style={styles.sendImgBtn}
					onPress={onSendMessage}
				>
					<Text style={styles.sendBtnText}>Ok send</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default ChatImageSendPopup;