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
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 100,
	},
	backButton: {
		top: 10,
		left: 0
	},
	appLogoContainer: {
		height: 100,
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 0,
		marginTop: 20,
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain"
	},
	textInputContainer: {
		paddingTop: 0,
		paddingHorizontal: 15,
		width: "100%",
		backgroundColor: "#fff",
		color: "#000000"
	},
	loginInputStyle: {
		backgroundColor: AppTheme.colors.white,
		borderWidth: 0.5,
		height: 50,
		fontSize: 16,
		paddingHorizontal: 45,
		borderColor: AppTheme.colors.lightGray
	},
	socialLoginContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
	OrView: {
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	signupContainer: {
		marginTop: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30
	},
	signupText: {
		color: AppTheme.colors.success,
		flexDirection: "column"
	},
	formContainer: {
		marginTop: 50,
		width: "100%",
		paddingBottom: 80
	},
	forgotPassword: {
		marginTop: 15,
		paddingHorizontal: 20,
		alignSelf: "flex-end",
	},
	forgotPasswordText: {
		color: AppTheme.colors.success,
		alignSelf: "flex-end",
	},
	passwordEyeIcon: {
		position: "absolute",
		right: 30,
		top: 24,
		zIndex: 1
	},
	loginButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	enterPasswordText: {
		...commonStyles.caption,
		paddingLeft: 30,
		color: "#505050",
		letterSpacing: -0.17
	},
	lockIcon: {
		position: "absolute",
		left: 30,
		zIndex: 1,
		top: 24
	},
	greetMessage: {
		...commonStyles.Title2,
		letterSpacing: -0.8,
		color: AppTheme.colors.darkBlack,
		textAlign: "center"
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
		color: "green"
	},
});