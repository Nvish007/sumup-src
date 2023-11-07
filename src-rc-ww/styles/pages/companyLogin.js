import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		position: "relative",
		display: "flex",
		paddingHorizontal: 16,
		paddingBottom: 100,
	},
	appLogoContainer: {
		height: 100,
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 70,
		marginTop: 20
	},
	loginButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		// zIndex: 5,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain",
		marginBottom: 45
	},
	forgotPasswordContainer: {
		...commonStyles.regular2,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingTop: 10,
		justifyContent: "flex-end",
		paddingBottom: 100,
	},
	forgotPasswordtext: {
		...commonStyles.caption9,
		letterSpacing: -0.2,
	},
	forgotPasswordLink: {
		...commonStyles.caption9,
		letterSpacing: -0.2,
		paddingLeft: 5,
		color: "rgb(0,122,255)"
	},
	textInputStyle: {
		...commonStyles.regular2,
		backgroundColor: AppTheme.colors.white,
		borderWidth: 0.5,
		height: 50,
		paddingLeft: 50,
		borderColor: AppTheme.colors.lightGray
	},
	textInputContainer: {
		paddingTop: 0,
		paddingHorizontal: 15,
		width: "100%",
		backgroundColor: "#fff",
		color: "#000000"
	},
	lockIcon: {
		position: "absolute",
		left: 30,
		zIndex: 1,
		top: 45
	},
	eyeIcon: {
		position: "absolute",
		right: 30,
		top: 45,
		zIndex: 1
	},
	mailIcon: {
		position: "absolute",
		left: 30,
		zIndex: 1,
		top: 48
	},
	emailAddressText: {
		...commonStyles.caption,
		marginBottom: 0,
		paddingHorizontal: 30,
		letterSpacing: -0.17,
	},
	passwordText: {
		paddingHorizontal: 30
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
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
});