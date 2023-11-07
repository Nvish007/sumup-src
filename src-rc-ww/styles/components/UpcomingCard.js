import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	cardViewUpcoming: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: AppTheme.colors.secondary,
		width: "90%",
		height: 240,
		padding: 10,
		marginTop: 10
	},
	margin: {
		marginTop: 10
	},
	upcomingView: {
		flexDirection: "row",
		marginTop: 5,
		justifyContent: "center"
	},
	top: {
		top: 10
	},
	left: {
		left: 120
	},
});