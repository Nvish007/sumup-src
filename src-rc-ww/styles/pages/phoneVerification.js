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
	appLogoContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 20
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain",
		marginBottom: 45
	},
	greetMessage1: {
		...commonStyles.Title2,
		letterSpacing: -0.8,
		fontWeight: "400",
		color: AppTheme.colors.darkBlack,
		marginBottom: 66
	},
	greetMessage2: {
		fontSize: 18,
		lineHeight: 32,
		letterSpacing: -0.8,
		fontWeight: "500",
		// marginBottom: 66
	},
	formContainer: {
		width: "100%",
		marginTop: 0
	},
	phoneMSGtext: {
		...commonStyles.caption4,
		marginBottom: 11,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	phoneInput: {
		...commonStyles.regular2,
		paddingHorizontal: 0,
	},
	codeText: {
		...commonStyles.regular1,
		lineHeight: 19,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6,
	},
	codeTextInput: {
		...commonStyles.regular2,
		lineHeight: 23,
		backgroundColor: AppTheme.colors.white,
		height: 45,
		paddingLeft: 0,
		marginBottom: 0
	},
	phoneContainer: {
		backgroundColor: AppTheme.colors.white,
		width: "100%",
		fontSize: 16,
		paddingRight: 5,
		paddingLeft: 5,
		height: 51,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: AppTheme.colors.lightGray
	},
	textContainerStyle: {
		paddingLeft: 0,
		backgroundColor: AppTheme.colors.white,
	},
	phoneflagStyle: {
		backgroundColor: AppTheme.colors.white
	},
	termsAndConditionContainer: {
		marginTop: 17,
		flexDirection: "row",
		alignItems: "center"
	},
	checkbox: {
		color: "#000",
		borderColor: "#000000",
		borderRadius: 5,
	},
	acceptText: {
		...commonStyles.caption5,
		marginLeft: 16,
		paddingTop: 0,
	},
	termsAndConditionText: {
		...commonStyles.caption5,
		marginLeft: 2,
		color: "#008000",
		paddingTop: 0,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white,
		// marginTop: "50%",
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	arrowRightIcon: {
		position: "absolute",
		top: 32,
		right: 40
	},
	error: {
		color: "red",
		marginTop: 5,
		fontSize: 15,
	},
	confirmForwardButton: {
		position: "absolute",
		right: 40,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	checkboxContainerStyle: {
		marginLeft: 6,
	}
});