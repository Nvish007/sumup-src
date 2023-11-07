import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 5,
		paddingBottom: 25,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%",
		// marginBottom: 20
	},
	locationBorderTop: {
		height: 4,
		backgroundColor: "#E8E8E8",
		width: 101,
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
		borderRadius: 31,
		marginBottom: 20
	},
	modalBorders: {
		width: "100%",
		height: 20,
		position: "relative",
		top: -18,
		zIndex: 9,
	},
	modalBorderTop: {
		height: 2,
		backgroundColor: "#C2C2C2",
		width: 58,
		position: "relative",
		top: 10,
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
		marginBottom: 20
	},
	modalTitle: {
		...commonStyles.caption3,
		textTransform: "uppercase",
		color: "#000",
		marginBottom: 10
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
		marginBottom: 30
	},
	bicycleIcon: {
		width: 80,
		height: 64,
		resizeMode: "cover",
		borderRadius: 8
	},
	bicycleInfo: {
		paddingLeft: 28
	},
	InfoTitle: {
		...commonStyles.regular4,
		marginBottom: 4,
		color: "#000"
	},
	batteryPercentage: {
		...commonStyles.caption6,
		color: "#000"
	},
	bikeDetails: {
		marginTop: 20
	},
	rideDetails: {
		flexDirection: "row",
		justifyContent: "center"
	},
	rideLeftCard: {
		marginRight: 43
	},
	rideCard: {
		width: 120,
		height: 89,
		borderRadius: 4.5,
		backgroundColor: "#fff",
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
		marginBottom: 28,
		paddingHorizontal: 18,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	closeIcon: {
		width: 23,
		height: 25,
		resizeMode: "cover",
		marginBottom: 15
	},
	supportIcon: {
		width: 24,
		height: 25,
		resizeMode: "cover",
		marginBottom: 13
	},
	rideText: {
		color: "#000",
		letterSpacing: -0.273716,
		fontSize: 13,
		lineHeight: 19,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		textAlign: "center"
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
		marginBottom: 12
	},
	rideDetailsText: {
		...commonStyles.caption,
		color: "#000",
		letterSpacing: -0.273716,
		textAlign: "center",
		marginBottom: 20
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
		marginBottom: 30,
		// width: "100%"
	},
	buttonContainer: {
		width: "50%",
		padding: 5
	},
	buttonTextsStyle: {
		...commonStyles.header3,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		color: "#FFECEC"
	}
});