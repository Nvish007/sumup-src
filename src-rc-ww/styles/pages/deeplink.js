import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingVertical: 50,
		paddingHorizontal: 50,
	},
	title: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 10,
		textAlign: "center",
		color: "#00380D",
		letterSpacing: -0.3,
	},
	message: {
		...commonStyles.regular,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#00380D",
		letterSpacing: -0.3,
	},
	titleText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: "#000",
		marginLeft: 17,
		marginBottom: 25
	},
	detailsListText: {
		...commonStyles.regular,
		letterSpacing: -0.3,
		color: "#000",
		marginBottom: 10,
		paddingHorizontal: 20,
		textAlign: "center"
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
	},
	buttonTextsStyle: {
		...commonStyles.regular4,
		color: "#fff",
		// marginRight: 40
	}
});