import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	wrapper: {
		backgroundColor: AppTheme.colors.primary
	},
	swiperButtons: {
		backgroundColor: "transparent",
		flexDirection: "row",
		position: "absolute",
		top: 0,
		left: 0,
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
		justifyContent: "space-between",
		alignItems: "flex-end"
	},
	page1: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#453191",
	},
	skipButton: {
		position: "absolute",
		top: 20,
		left: 10,
	},
	text: {
		color: "#fff",
		marginTop: 20,
		fontSize: 25,
	},
	subtext: {
		padding: 10,
		marginTop: 10,
		color: "#fff",
		fontSize: 17
	},
});