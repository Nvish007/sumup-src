import { StyleSheet, Platform } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 22,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%",
		// marginBottom: 20,
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
	chargeIcon: {
		width: 65,
		height: 90,
		resizeMode: "cover",
		borderRadius: 8,
	},
	chargeIcon2: {
		width: 101,
		height: 115,
		resizeMode: "cover",
		borderRadius: 8,
	},
	chargeInfo: {
		paddingLeft: 25,
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
	chargeDetails: {
		flexDirection: "row",
		justifyContent: "flex-start"
	},
	row: {
		flexDirection: "row",
		justifyContent: "center",
	},
	chargeCard: {
		width: 85,
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
		marginBottom: 10
	},
	endChargeText: {
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.273716,
		fontSize: 12,
		lineHeight: 14,
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
		alignItems: "center",
	},
	detailsListLast: {
		marginTop: Platform.OS === "ios" ? -25 : 0
	},
	detailsListText: {
		...commonStyles.regular,
		letterSpacing: -0.3,
		color: "#000",
		marginRight: 30,
		paddingRight: 35,
	},
	detailsListLastText: {
		marginBottom: Platform.OS === "ios" ? 25 : 0
	},
	titleText1: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 30,
		marginBottom: 25
	},
	titleText2: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 15,
		// marginBottom: 25
	},
	subText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		marginLeft: -10
	},
	connectIcon: {
		width: 54,
		height: 52,
		resizeMode: "cover",
		marginRight: 15
	},
	closeImage: {
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