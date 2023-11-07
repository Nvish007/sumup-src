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
		width: "100%",
		marginBottom: "8%"
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
		...commonStyles.caption3,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		textTransform: "uppercase",
		color: "#000",
		marginBottom: 14
	},
	card: {
		marginTop: 0,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 0,
	},
	bicycleIcon: {
		width: 80,
		height: 80,
		resizeMode: "cover"
	},
	chargeIcon: {
		width: 87,
		height: 79,
		resizeMode: "cover"
	},
	bicycleInfo: {
		paddingLeft: 21
	},
	InfoTitle: {
		...commonStyles.regular4,
		marginBottom: 0,
		color: "#000"
	},
	batteryPercentage: {
		...commonStyles.regular,
		fontSize: 13,
		color: "#000",
		opacity: 0.87,
		marginBottom: 5
	},
	buttonContainer: {
		paddingTop: 0,
	},
	button: {
		width: 231,
		borderRadius: 8,
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		height: 49,
		marginTop: 23
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	unlockBikeContainer: {
		backgroundColor: "white",
		paddingVertical: 40,
		paddingHorizontal: 45,
		borderRadius: 20,
		alignItems: "center"
	},
	unlockBikeTitle1: {
		...commonStyles.Title4,
		color: "#FF0000",
		letterSpacing: -0.3,
		textAlign: "center"
	},
	unlockBikeTitle2: {
		fontSize: 13,
		lineHeight: 19,
		fontFamily: AppTheme.fonts.PoppinsMedium,
		color: "#000",
		opacity: 0.87,
		letterSpacing: -0.3,
		textAlign: "center",
		marginTop: 30,
		// paddingHorizontal: 60
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
	OkayButton: {
		width: 250,
		borderRadius: 8,
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		height: 49,
		marginTop: 30,
		marginBottom: 0
	},
	unlockBikeClockIcon: {
		width: 67,
		height: 69,
		marginTop: 25
	},
	marginLeft: { marginRight: "5%" }
});