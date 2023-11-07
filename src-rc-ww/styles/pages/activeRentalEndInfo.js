import { StyleSheet } from "react-native";
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
		width: 18,
		height: 15,
		margin: 5,
		resizeMode: "cover"
	},
	titleText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: "#000",
		marginLeft: 17,
		marginBottom: 25
	},
	detailsList: {
		flexDirection: "row",
		marginBottom: 22,
		alignItems: "flex-start",
	},
	detailsListLast: {
		marginTop: 0
	},
	detailsListText: {
		...commonStyles.regular,
		letterSpacing: -0.2,
		color: "#000",
		marginRight: 45,
		paddingRight: 45,
	},
	detailsListLastText: {
		marginBottom: 0
	},
	textMargin: {
		...commonStyles.regular,
		letterSpacing: -0.3,
		color: "#000",
		marginRight: 10
	},
	viewMargin: {
		marginLeft: 20
	},
	locationIcon: {
		width: 54,
		height: 52,
		resizeMode: "cover",
		marginRight: 15
	},
	stationIcon: {
		width: 54,
		height: 60,
		resizeMode: "cover",
		marginRight: 15
	},
	doneIcon: {
		width: 54,
		height: 50,
		resizeMode: "cover",
		marginRight: 15,
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