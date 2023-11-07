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
	centerView: {
		alignItems: "center"
	},
	otpScreenMainImg: {
		width: "100%",
		height: 235,
		resizeMode: "contain"
	},
	infoText: {
		marginTop: -30
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
		marginTop: 5,
		marginBottom: 30
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