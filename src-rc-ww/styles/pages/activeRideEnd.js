import { StyleSheet, Platform } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 35,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	backButton: {
		paddingTop: 0,
		paddingHorizontal: 0,
		marginBottom: 19
	},
	backArrowIcon: {
		width: 20,
		height: 17,
		resizeMode: "cover"
	},
	titleText: {
		...commonStyles.header1,
		letterSpacing: -0.3,
		color: "#000",
		marginLeft: 17,
		marginBottom: 25
	},
	detailsList: {
		flexDirection: "row",
		marginBottom: 22,
		alignItems: "center",
	},
	detailsListLast: {
		marginTop: Platform.OS === "ios" ? -25 : 0
	},
	detailsListText: {
		...commonStyles.regular2,
		letterSpacing: -0.3,
		color: "#000",
		marginRight: 20,
		paddingRight: 15,
	},
	detailsListLastText: {
		marginBottom: Platform.OS === "ios" ? 25 : 0
	},
	lockCloseIcon: {
		width: 30,
		height: 42,
		resizeMode: "cover",
		marginRight: 15,
		marginLeft: 5
	},
	cancelIcon: {
		width: 42,
		height: 47,
		resizeMode: "cover",
		marginRight: 15,
		// marginLeft: 5
	},
	doneIcon: {
		width: 54,
		height: 50,
		resizeMode: "cover",
		marginRight: 10,
		marginLeft: -5
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
	},
	buttonTextsStyle: {
		...commonStyles.regular4,
		color: "#fff"
	}
});