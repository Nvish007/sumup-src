import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	modal: {
		justifyContent: "flex-end",
		margin: 0
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 35,
		paddingBottom: 25,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%"
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
	card: {
		marginTop: 0,
		backgroundColor: "#fff",
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 13,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
	},
	bicycleIcon: {
		width: 61,
		height: 58,
		borderRadius: 5
	},
	bicycleInfo: {
		paddingLeft: 21
	},
	InfoTitle: {
		...commonStyles.regular4,
		marginBottom: 4,
		color: "#000"
	},
	batteryPercentage: {
		...commonStyles.regular5,
		color: "#000"
	},
	buttonContainer: {
		paddingTop: 0,
	},
	button: {
		width: 267,
		borderRadius: 8,
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		height: 49,
		marginTop: 28,
		marginBottom: 18
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	unlockBikeContainer: {
		backgroundColor: "white",
		paddingTop: 30,
		paddingBottom: 60,
		paddingHorizontal: 30,
		borderRadius: 20
	},
	updatebikeContainer: {
		backgroundColor: "white",
		paddingTop: 24,
		paddingBottom: 39,
		borderRadius: 20,
		paddingHorizontal: 25,
	},
	unlockBikeTitle1: {
		...commonStyles.Title5,
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		paddingTop: 30
	},
	unlockBikeTitle2: {
		...commonStyles.Title5,
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		marginTop: 30
	},
	updatebikeTitle1: {
		...commonStyles.header2,
		color: "#FF0000",
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		paddingHorizontal: 30
	},
	updatebikeTitle2: {
		...commonStyles.Title5,
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		marginTop: 30,
		paddingHorizontal: 15
	},
	unlockBikeSecText: {
		...commonStyles.Title5,
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
	},
	unlockBikeTitle3: {
		...commonStyles.Title5,
		fontFamily: AppTheme.fonts.PoppinsItalic,
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		fontStyle: "italic"
	},
	unlockBikeClockIcon: {
		width: 90,
		height: 66,
		marginTop: 20,
		marginLeft: "auto",
		marginRight: "auto"
	},
	updatebikeClockIcon: {
		width: 71,
		height: 69,
		marginTop: 20,
		marginLeft: "auto",
		marginRight: "auto"
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	backButton: {
		paddingTop: 10,
		paddingHorizontal: 0,
		marginBottom: 39,
	},
});