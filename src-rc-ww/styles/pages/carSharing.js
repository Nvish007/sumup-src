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
	modalBorders: {
		width: "100%",
		height: 14,
		position: "relative",
		top: -10,
		zIndex: 9,
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
	modalTitle: {
		...commonStyles.regular2,
		textTransform: "uppercase",
		color: "#000",
		letterSpacing: -0.2,
		marginBottom: 15
	},
	modalCarTitle: {
		...commonStyles.regular2,
		lineHeight: 20,
		textTransform: "uppercase",
		color: "#000",
		marginBottom: 19,
		letterSpacing: -0.2,
		paddingLeft: 0
	},
	card: {
		marginTop: 0,
		backgroundColor: "#fff",
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 0,
		paddingVertical: 0,
		marginBottom: 10,
		paddingLeft: 0
	},
	carIcon: {
		width: 106,
		height: 100,
		resizeMode: "cover",
		borderRadius: 8,
	},
	carInfo: {
		paddingLeft: 55,
	},
	infoTitle: {
		...commonStyles.regular4,
		marginBottom: 0,
		color: "#000"
	},
	batteryPercentage: {
		...commonStyles.caption10,
		color: "#000",
		opacity: 0.87,
	},
	carDetails: {
		flexDirection: "row"
		// marginTop: 20
	},
	rideCard: {
		width: "100%",
		height: 80,
		borderRadius: 4.56193,
		backgroundColor: "#fff",
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
		marginBottom: 24,
		paddingHorizontal: 15,
		alignItems: "center",
		// justifyContent: "center"
	},
	supportIcon: {
		width: 30,
		height: 30,
		resizeMode: "cover",
		marginRight: 18,
	},
	supportText1: {
		...commonStyles.regular2
	},
	supportText2: {
		...commonStyles.regular5
	},
	button: {
		// backgroundColor: "#008C44",
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
		marginRight: 20
	}
});