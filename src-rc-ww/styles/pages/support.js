import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white",
	},
	mainContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		paddingHorizontal: 38,
		marginTop: 30
	},
	formContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: AppTheme.colors.white,
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
	confirmButton: {
		width: "100%",
		height: 49,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		marginBottom: 6
	},
	mailIcon: {
		position: "absolute",
		left: 50,
		top: 12,
		zIndex: 1,
		width: 22,
		height: 22,
		resizeMode: "cover",
	},
	chatIcon: {
		width: 22,
		height: 22,
		resizeMode: "cover",
		top: 2,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	margin: {
		marginTop: 20
	},
	width: {
		width: "100%"
	},
	supportText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: "#004822",
	},
	supportText2: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: "#004822",
	},
	supportTextBold: {
		...commonStyles.header2,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		letterSpacing: -0.3,
		color: "#004822",
	},
	supportTextNormal: {
		...commonStyles.header2,
		fontFamily: AppTheme.fonts.PoppinsItalic,
		letterSpacing: -0.3,
		color: "#004822",
	},
	row: {
		flexDirection: "row",
		// marginTop: 19
	},
	supportScrollView: {
		backgroundColor: AppTheme.colors.primary
	},
	supportScreenMainView: {
		paddingTop: 25,
		paddingHorizontal: 30

	},
	supportImage: {
		width: "100%",
		height: 60,
		resizeMode: "contain",
		marginBottom: 15
	},
	content: {
		textAlign: "center",
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 15,
		color: "#FFFFFF"
	},
	contentTitle: {
		textAlign: "center",
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 0,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	contentTitle2: {
		textAlign: "center",
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 15,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	linkTexts: {
		textAlign: "center",
		fontSize: 15,
		lineHeight: 24,
		marginBottom: 15,
		color: "#FFFFFF",
		fontWeight: "normal",
		textDecorationLine: "underline"
	},
	linkTexts2: {
		textAlign: "center",
		fontSize: 15,
		lineHeight: 24,
		color: "#FFFFFF",
		fontWeight: "normal",
		textDecorationLine: "underline"
	}
});