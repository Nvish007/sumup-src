import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "white"
	},
	container: {
		position: "relative",
		display: "flex",
		paddingHorizontal: 16,
		paddingBottom: 100
	},
	appLogoContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 20
	},
	appLogo: {
		width: 180,
		height: 80,
		resizeMode: "contain",
		marginBottom: 45
	},
	passwordLabel: {
		...commonStyles.caption,
		marginBottom: 0,
		paddingHorizontal: 30,
		letterSpacing: -0.17,
	},
	passwordEyeIcon: {
		position: "absolute",
		right: 30,
		top: 47,
		zIndex: 1
	},
	lockIcon: {
		position: "absolute",
		left: 25,
		zIndex: 1,
		top: 47
	},
	inputStyle: {
		backgroundColor: AppTheme.colors.white,
		borderWidth: 0.5,
		height: 50,
		fontSize: 16,
		paddingHorizontal: 45,
		borderColor: AppTheme.colors.lightGray
	},
	textInputContainer: {
		paddingTop: 0,
		paddingHorizontal: 15,
		width: "100%",
		backgroundColor: "#fff",
		color: "#000000"
	},
	resetButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	resetButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	forwardArrowIcon: {
		position: "absolute",
		right: 40,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover"
	},
	passwordRequirmentsText: {
		...commonStyles.caption8,
		color: AppTheme.colors.primary,
		paddingLeft: 0
	},
	passwordRequirmentsText2: {
		...commonStyles.caption8,
		color: "red",
		paddingLeft: 0
	},
	passwordTextFontSuccess: {
		...commonStyles.caption8,
		lineHeight: 15,
		color: AppTheme.colors.primary,
		marginBottom: 4,
		paddingLeft: 10
	},
	passwordTextFontDenied: {
		...commonStyles.caption8,
		lineHeight: 15,
		color: "red",
		marginBottom: 4,
		paddingLeft: 10
	},
});