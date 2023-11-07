import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	containerModal: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingVertical: 57,
		alignItems: "center",
		paddingHorizontal: 70,
	},
	message: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#2ea166",
		letterSpacing: -0.3,
	},
	message1: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#FF0000",
		letterSpacing: -0.3,
	},
	lockerMessage: {
		...commonStyles.header2,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#FF0000",
		letterSpacing: -0.3,
	},
	lockImage: {
		width: 80,
		height: 80,
		resizeMode: "cover",
		marginTop: 5
	},
	OkayButton: {
		width: 250,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		height: 49,
		marginTop: 30,
		marginBottom: 0
	},
	textPadding: {
		marginTop: 40,
	},
	additionalPadding: {
		paddingHorizontal: 10,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
});