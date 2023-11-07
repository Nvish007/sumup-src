import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 22,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%",
		marginBottom: 20,
		paddingBottom: 26
	},
	modalBorders: {
		width: "100%",
		height: 14,
		position: "relative",
		top: -10,
		zIndex: 9,
	},
	locationBorderTop: {
		height: 4,
		backgroundColor: "#E8E8E8",
		width: 101,
		position: "relative",
		top: 0,
		zIndex: 9,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		left: 0,
		right: 0,
		justifyContent: "center",
		borderRadius: 31
	},
	modalBorderTop: {
		height: 2,
		backgroundColor: "#C2C2C2",
		width: 58,
		position: "relative",
		top: 0,
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
		top: 3,
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
		...commonStyles.buttonText,
		textTransform: "uppercase",
		color: "#000",
		marginBottom: 0,
		paddingLeft: 0
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
	lockIcon1: {
		width: 32,
		height: 43,
		resizeMode: "cover",
		position: "relative",
		top: -35,
	},
	lockIcon2: {
		width: 25,
		height: 33,
		resizeMode: "cover",
		position: "relative",
		top: -30,
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
		marginTop: 20
	},
	rideDetails: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	rideCard: {
		width: 93,
		height: 89,
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
		paddingHorizontal: 5,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	closeIcon: {
		width: 23,
		height: 25,
		resizeMode: "cover",
		marginBottom: 14
	},
	endRideText: {
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.273716,
		fontSize: 13,
		lineHeight: 19,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		textAlign: "center"
	},
	watchIcon: {
		width: 26,
		height: 30,
		resizeMode: "contain",
		marginBottom: 14
	},
	extendRideText: {
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.273716,
		fontSize: 12,
		lineHeight: 13,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		textAlign: "center"
	},
	supportIcon: {
		width: 24,
		height: 25,
		resizeMode: "cover",
		marginBottom: 13
	},
	supportText: {
		color: "#000",
		letterSpacing: -0.273716,
		fontSize: 12,
		lineHeight: 14,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		textAlign: "center"
	},
	rideDetailsTitle: {
		...commonStyles.header1,
		lineHeight: 20,
		textTransform: "uppercase",
		color: "#000",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 10	// 30 for button
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
		// marginBottom: 30,
		// marginRight: 10,
		width: "80%"
	},
	buttonTextsStyle: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		color: AppTheme.colors.white
	},
	buttonContainer: {
		justifyContent: "center"
	}
});