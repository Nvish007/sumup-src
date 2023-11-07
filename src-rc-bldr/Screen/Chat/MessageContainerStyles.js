import { StyleSheet, Dimensions, Platform } from 'react-native';
export default StyleSheet.create({

	textToday: {
		marginLeft: '43%', color: '#000', fontSize: 12,fontWeight: '600', padding: 12
	},
	textYesterday: {
		marginLeft: '43%', color: '#000', fontSize: 12,fontWeight: '600', padding: 12
	},
	textToday1: {
		marginLeft: '43%', color: '#000', fontSize: 12,fontWeight: '600', padding: 12, marginTop: 10
	},
	textYesterday1: {
		marginLeft: '43%', color: '#000', fontSize: 12,fontWeight: '600', padding: 12, marginTop: 10
	},
	color: {
		color: '#000'
	},
	color1: {
		marginTop: 15,
		marginBottom: 5,
		color: '#000'
	},
	triangleText: {
		position: 'absolute',
		top: 5,
		right: -9
	},
	triangleImage: {
		position: 'absolute',
		bottom: -10,
		right: -9
	},
	spacingInView: {
		marginTop: 30
	},
	tipsTextLastMsg: {
		marginTop: -10
	},
	tipsText :{
		marginTop: -4,
		marginBottom: 2,
		paddingLeft: 10,
		// backgroundColor: 'red',
		// position: 'absolute',
		// top: 10,
		// left: 0,
		// fontFamily: fonts.hossRoundBold,
		fontSize: 14,
	},
	tipsImage: {
		position: 'absolute',
		top: 130,
		// fontFamily: fonts.hossRoundBold,
		fontSize: 14,
		marginLeft: 0
	},
	tipsVideo: {
		position: 'absolute',
		top: 170,
		// fontFamily: fonts.hossRoundBold,
		fontSize: 14,
		marginLeft: 10
	},
	lastMessageTipStyle: {
		marginBottom: 20
	},
	imageLoadView: {
		marginHorizontal: 60,
		marginVertical: 35
	},
	videoLoadView: {
		marginHorizontal: 108,
		marginVertical: 60
	},
	videoView: {
		position: 'relative',
		height: 150,
		width: 250
	},
	videoContent: {
		position: 'absolute',
		left: 5,
		top: 3.5,
		height: 140,
		width: 240,
		borderRadius: 13,
	},
	tickMsgImg: {
		marginTop: 2,
		marginRight: 4,
		paddingRight: 4,
		width: 18,
		height: 10,
		resizeMode: 'contain'
	},
});