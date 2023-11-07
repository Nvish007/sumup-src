import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 35,
		paddingBottom: 25,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%"
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0
	},
	modalBorderTop: {
		height: 2,
		backgroundColor: "#C2C2C2",
		width: 58,
		position: "relative",
		top: -16,
		zIndex: 9,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		left: 0,
		right: 0,
		justifyContent: "center",
	},
	modalBorderTopSec: {
		height: 2,
		backgroundColor: "#C2C2C2",
		width: 58,
		position: "relative",
		top: -23,
		zIndex: 9,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		left: 0,
		right: 0,
		justifyContent: "center",
	},
	carDetails: {
		flexDirection: "row"
	},
	supportIcon: {
		width: 80,
		height: 80,
		resizeMode: "cover",
		marginRight: 5,
	},
	supportText1: {
		...commonStyles.regular4
	},
	supportText2: {
		...commonStyles.regular5
	},
	reportContainer: {
		alignItems: "center",
		position: "absolute",
		right: 0,
		bottom: 30
	},
	reportIcon: {
		width: 37,
		height: 37,
		resizeMode: "cover",
	},
	card: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 0,
		paddingVertical: 12,
		marginBottom: 10,
		paddingLeft: 0
	},
	button: {
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 48,
		width: "85%",
	},
	buttonTextsStyle: {
		...commonStyles.regular2,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		color: "#FFECEC"
	},
	buttonDetails: {
		flexDirection: "row",
		marginRight: 40
	}
});