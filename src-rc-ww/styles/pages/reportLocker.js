import { StyleSheet, Platform } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white,
		paddingTop: 10
	},
	rowCar: {
		flexDirection: "row",
	},
	verifyButtonContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	buttonText: {
		...commonStyles.buttonText,
	},
	forwardArrowIcon: {
		position: "absolute",
		right: 35,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	mainScrollView: {
		flex: 1,
		// paddingBottom: 100,
		marginBottom: 0, // 80
		// paddingBottom: 100,
		// paddingHorizontal: 28
	},
	startTimeTitle: {
		...commonStyles.regular3,
		marginBottom: 10,
		paddingLeft: 30,
		color: AppTheme.colors.fontColor,
	},
	alertContainer: {
		marginLeft: 15,
		marginTop: 0,
		// marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8", // "#F8F8F8"
		borderRadius: 5,
		width: "90%",
	},
	textArea: {
		width: "85%",
		height: "60%",
		backgroundColor: "#F6F8F9",
		paddingHorizontal: 5,
		borderRadius: 4,
		paddingVertical: 10,
		marginLeft: "6%",
		textAlignVertical: "top"
	},
	alertText: {
		textAlign: "left",
		paddingHorizontal: 50,
		marginLeft: -30,
		letterSpacing: -0.2
	},
	alertIcon: {
		height: 47,
		width: 47,
		marginLeft: 8
	},
	subContainer: {
		paddingVertical: 10,
		paddingHorizontal: 50
	},
	noteContainer: {
		flexDirection: "column",
		justifyContent: "center"
	},
	noteIcon: {
		marginLeft: "32%",
		height: 120,
		width: 100,
	},
	desText: {
		textAlign: "center",
		marginTop: 10,
		paddingHorizontal: 20
	},
	carContainer: {
		marginTop: 5,
	},
	margin: {
		marginLeft: 10
	},
	ratingInput: {
		paddingVertical: 15
	},
	carPadding: {
		paddingHorizontal: 20
	},
	remarkInput: {
		marginBottom: 100
	},
	remarksError: {
		paddingVertical: 10,
		alignItems: "center"
	},
	errorMessage: {
		color: "red"
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 35,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	titleText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 60,
		marginBottom: 25
	},
	titleText2: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 15,
		marginBottom: 25
	},
	detailsList: {
		marginBottom: 22,
	},
	detailsListLast: {
		marginTop: Platform.OS === "ios" ? -25 : 0
	},
	detailsListText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		paddingHorizontal: 30,
		color: "#000",
		fontStyle: "italic"
	},
	detailsListLastText: {
		marginBottom: Platform.OS === "ios" ? 25 : 0
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