import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainScreenView: {
		backgroundColor: AppTheme.colors.white,
		flex: 1,
	},
	mainScrollView: {
		paddingTop: 40,
	},
	innerView: {
		paddingHorizontal: 20,
		paddingTop: "10%",
	},
	screenFixHeader: {
		position: "absolute",
		left: 0,
		top: 10,
		right: 0,
		paddingVertical: 20,
		zIndex: 5,
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		height: 64,
		backgroundColor: AppTheme.colors.white
	},
	backButton: {
		position: "absolute",
		left: 15,
	},
	headerText: {
		...commonStyles.header1,
		textAlign: "center",
		color: AppTheme.colors.fontColor,
		position: "relative",
		zIndex: 9
	},
	centerView: {
		alignItems: "center"
	},
	otpScreenMainImg: {
		width: "100%",
		height: 235,
		resizeMode: "contain"
	},
	smsScreenImage: {
		maxWidth: 200,
		resizeMode: "contain",
		height: 240,
		marginTop: 0,
		marginBottom: 10,
		width: "100%",
	},
	title1: {
		...commonStyles.caption6,
		textAlign: "center",
		marginBottom: 0,
		letterSpacing: -0.4,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	title2: {
		...commonStyles.caption6,
		textAlign: "center",
		marginBottom: 0,
		letterSpacing: -0.4,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	title3: {
		...commonStyles.caption6,
		textAlign: "center",
		marginBottom: 0,
		letterSpacing: -0.4,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	otpCodeView: {
		// display: "flex",
		// alignItems: "center",
		// marginVertical: 20,
		marginTop: 5,
		marginBottom: 30
	},
	newCodeLink: {
		width: 120,
		marginBottom: 30
	},
	resendTexts: {
		textAlign: "center",
		fontSize: 16,
		color: "#4980e4",
		fontWeight: "bold",
		marginBottom: 5,
	},
	pinContainer: {
		width: "100%"
	},
	pinCodeCellStyle: {
		borderBottomWidth: 2,
		borderColor: "#ccc",
	},
	pinTextsStyle: {
		...commonStyles.Title3,
		color: AppTheme.colors.darkBlack,
	},
	pinCodeCellStyleFocused: {
		borderColor: "#000000",
	},
	otpResendSection: {
		paddingTop: 30,
		flexDirection: "column",
		alignItems: "flex-end",
		paddingBottom: 150
	},
	resendWaitMessageText: {
		fontSize: 14,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		color: "#747474"
	},
	resendWaitMessage: {
		fontSize: 8,
		color: "#747474",
		fontFamily: AppTheme.fonts.PoppinsRegular,
	},
	resendText: {
		...commonStyles.caption7,
		color: AppTheme.colors.primary,
		textDecorationLine: "underline",
		letterSpacing: -0.4,
	},
	verifyButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	forwardArrowIcon: {
		position: "absolute",
		right: 35,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	otpSuccessModal: {
		paddingVertical: 22,
		paddingHorizontal: 10,
		backgroundColor: "white",
		width: "100%",
		borderRadius: 20,
		alignItems: "center"
	},
	checkedCircleIcon: {
		marginBottom: 15,
	},
	infoText: {
		marginTop: -30
	},
	popupOTPtexts: {
		fontWeight: "500",
		fontSize: 14,
		lineHeight: 24,
		color: AppTheme.colors.darkBlack,
		letterSpacing: -0.4,
		marginBottom: 5
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
});