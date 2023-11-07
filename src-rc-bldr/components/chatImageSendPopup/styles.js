import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	modalImageBgView: {
		width: '100%',
		flex: 1,
	},
	modalView: {
		flex: 1,
		padding: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		paddingVertical: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeBtn: {
		top: -25,
		left: -25,
		position: 'absolute',
		zIndex: 1
	},
	closeBtnImg: {
		width: 40,
		height: 40,
		resizeMode: 'contain'
	},
	sendImageView: {
		marginTop: 15,
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width - 90,
		borderWidth: 6,
		padding: 10,
		height: 360,
		borderRadius: 12,
		borderColor: '#fff',
		backgroundColor: '#000',
	},
	modalContentView: {
		paddingHorizontal: 50
	},
	chatImg: {
		width: '100%',
		height: '100%',
		maxHeight: '100%',
		backgroundColor: '#fff',
		resizeMode: 'cover',
	},
	videoView: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	videoContent: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// borderRadius: 13,
	},
	sendImgBtn: {
		marginTop: 50,
		backgroundColor: '#000',
		paddingVertical: 12,
		borderRadius: 50,
		width: Dimensions.get('window').width - 90,
	},
	sendBtnText: {
		textAlign: 'center',
		fontSize: 22,
		// fontFamily: fonts.hossRoundBold,
		color: '#fff',
	}
});