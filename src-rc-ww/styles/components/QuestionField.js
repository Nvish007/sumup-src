import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	slide: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 15,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		marginBottom: 30
	},
	backButtonArrow: {
		position: "absolute",
		top: 28,
		left: 15,
	},
	screenTitle: {
		fontSize: 20,
		marginBottom: 15,
		// fontWeight: "bold",
		borderColor: "#000",
		borderWidth: 1,
		color: "green",
		padding: 5
	},
	screenTypecaseView: {
		width: "100%",
	},
	checkBoxRow: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%"
	},
	pageNumber: {
		position: "absolute",
		top: 22,
		right: 15,
	},
	pageNumberStyle: {
		fontWeight: "bold",
		fontSize: 20,
		color: AppTheme.colors.primary
	},
	viewInput: {
		width: "100%"
	},
	input: {
		height: 40,
		width: "100%",
		paddingHorizontal: 10,
		borderWidth: 1,
	},
	checkBoxText: {
		marginLeft: 15,
		fontSize: 18
	},
	questionText: {
		marginLeft: -50,
		fontSize: 18
	},
	picker: {
		backgroundColor: "#f2f2f2",
		width: "100%",
	},
	titleFont: {
		marginTop: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	titleTextFont: {
		fontWeight: "bold",
		fontSize: 20
	},
	appLogoContainer: {
		alignItems: "center",
		marginTop: 30,
		marginBottom: 0
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain"
	},
	button: {
		width: "80%",
		bottom: 10,
		marginLeft: 30,
	},
	confirmForwardIcon: {
		position: "absolute",
		right: 10,
		top: 5
	},
	opacityStyle: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: AppTheme.colors.primary,
		height: 40,
	},
	textStyle: {
		color: "#fff",
		fontSize: 15,
		marginTop: 8
	},
	verifyButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	confirmButton: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 44
	},
	forwardArrowIcon: {
		position: "absolute",
		right: 35,
		top: 36,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
});