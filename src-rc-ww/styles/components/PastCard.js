import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	cardViewPast: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: AppTheme.colors.secondary,
		width: "95%",
		height: 170,
		padding: 10,
		marginTop: 10
	},
	margin: {
		marginLeft: 20
	},
	row: {
		flexDirection: "row"
	},
	buttonView: {
		flexDirection: "row",
		marginTop: 20,
		width: "80%"
	},
	text: {
		fontWeight: "bold",
		marginLeft: 100
	},
	view: {
		flexDirection: "row",
		marginTop: 20,
		width: "80%"
	},
});