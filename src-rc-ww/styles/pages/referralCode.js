import { StyleSheet } from "react-native";
import commonStyles from "src/styles/common";
import AppTheme from "../theme";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	reservationsScrollView: {
		paddingHorizontal: 20,
		paddingTop: 20
	},
	mainView: {
		paddingHorizontal: "25%",
		flexDirection: "column",
		justifyContent: "center",
	},
	subView: {
		// paddingHorizontal: 30,
		flexDirection: "row",
		justifyContent: "center"
	},
	titleText: {
		...commonStyles.regular4,
		color: "#000000",
		opacity: 0.87,
	},
	subText: {
		...commonStyles.Title2,
		color: "#000000",
		opacity: 0.87,
		marginLeft: 5
	},
	invalidText: {
		...commonStyles.regular5,
		color: "#FF5959",
		opacity: 0.87,
		marginLeft: 5
	},
	icon: {
		marginLeft: 5
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
	},
});