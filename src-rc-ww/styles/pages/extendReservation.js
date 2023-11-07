import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	mainScrollView: {
		flex: 1,
		marginHorizontal: 30,
		marginBottom: 80,
		paddingBottom: 100
	},
	startTimeTitle: {
		...commonStyles.regular3,
		marginBottom: 10,
		color: AppTheme.colors.fontColor,
	},
	startTimeValueContainer: {
		marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8",
		borderRadius: 5,
		width: "70%"
	},
	startTimeValue: {
		textAlign: "left",
		paddingHorizontal: 10
	},
	endTimeTitle: {
		...commonStyles.regular3,
		marginTop: 23,
		marginBottom: 10,
		color: AppTheme.colors.fontColor
	},
	endTimeValueContainer: {
		marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8",
		borderRadius: 5,
		width: "70%"
	},
	endTimeValue: {
		textAlign: "left",
		paddingHorizontal: 10
	},
	locationDropDownTitle: {
		...commonStyles.regular3,
		marginTop: 23,
		marginBottom: 10,
		color: AppTheme.colors.fontColor,
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	dropDownStyle: {
		width: "60%",
		borderWidth: 1,
		borderColor: "#878787",
		borderRadius: 5,
		marginRight: "5%"
	},
	caretDownIcon: {
		fontSize: 15,
		marginRight: 10,
		marginTop: -4
	},
	dropDownPicker: {
		...commonStyles.caption2,
		height: 30,
		color: "#000000"
	},
	typeOfVehicleTitle: {
		...commonStyles.caption,
		marginTop: 23,
		marginBottom: 10,
		color: AppTheme.colors.fontColor,
	},
	extendButtonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20
	},
	extendButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary
	},
	buttonTextsStyle: {
		...commonStyles.buttonText
	},
	forwardArrowIcon: {
		position: "absolute",
		right: 35,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover"
	},
	modal: {
		justifyContent: "center"
	},
	modalContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 70,
		paddingBottom: 30,
		borderRadius: 20,
		alignItems: "center"
	},
	extensionSuccess: {
		...commonStyles.Title4,
		color: AppTheme.colors.primary,
		letterSpacing: -0.3,
		opacity: 0.87
	},
	extensionUnsuccess: {
		...commonStyles.Title4,
		letterSpacing: -0.3,
		opacity: 0.87
	},
	thumbsupIcon: {
		width: 100,
		height: 100,
		marginTop: 40,
		marginBottom: 80
	},
	thumbsDownIcon: {
		width: 100,
		height: 100,
		marginTop: 40,
		marginBottom: 80
	},
	modalOkayButtonStyle: {
		width: 250,
		borderRadius: 8,
		height: 45
	}
});