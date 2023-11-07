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
		paddingBottom: 10,
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
		paddingHorizontal: 15,
		paddingVertical: 20,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
	},
	chargingPoleInfo: {
		paddingLeft: 20
	},
	contentCharginPointImage: {
		width: 60,
		height: 70,
		resizeMode: "cover"
	},
	chargingPoleTitle: {
		...commonStyles.regular4,
		color: "#000"
	},
	buttonContainer: {
		paddingTop: 15,
	},
	button: {
		width: "80%",
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
	containerModal: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingVertical: 57,
		alignItems: "center",
		paddingHorizontal: 60,
	},
	message: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#2ea166",
		letterSpacing: -0.3,
	},
	message1: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#FF0000",
		letterSpacing: -0.3,
	},
	popUpContainer: {
		backgroundColor: "white",
		paddingVertical: 40,
		paddingHorizontal: 30,
		borderRadius: 20,
		alignItems: "center"
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
	thumbIcon: {
		width: 67,
		height: 69,
		marginTop: 25
	},
});