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
		paddingBottom: 100
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
	emailLabel: {
		...commonStyles.caption,
		marginBottom: 0,
		paddingHorizontal: 30,
		letterSpacing: -0.17,
	},
	mailIcon: {
		position: "absolute",
		zIndex: 1,
		top: 45,
		left: 25
	},
	textInputStyle: {
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
	submitButtonContainer: {
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
	submitButton: {
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
	}
});