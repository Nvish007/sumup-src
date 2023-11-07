import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	verifyButtonContainer: {
		position: "absolute",
		bottom: 30,
		left: 0,
		right: 0,
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	buttonTextsStyle: {
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
		marginBottom: 80,
		paddingBottom: 100,
	},
	startTimeTitle: {
		...commonStyles.regular3,
		marginBottom: 10,
		paddingLeft: 30,
		color: AppTheme.colors.fontColor,
	},
	startTimeValueContainer: {
		marginLeft: 30,
		marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8",
		borderRadius: 5,
		width: "60%"
	},
	startTimeValue: {
		textAlign: "left",
		marginLeft: 15,
		paddingHorizontal: 0
	},
	endTimeTitle: {
		...commonStyles.regular3,
		marginTop: 23,
		marginBottom: 10,
		paddingLeft: 30,
		color: AppTheme.colors.fontColor,
	},
	endTimeValueContainer: {
		marginLeft: 30,
		marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8",
		borderRadius: 5,
		width: "60%"
	},
	endTimeValue: {
		textAlign: "left",
		marginLeft: 15,
		paddingHorizontal: 0
	},
	vehicleDropDownTitle: {
		...commonStyles.regular3,
		marginTop: 23,
		marginBottom: 10,
		paddingLeft: 30,
		color: AppTheme.colors.fontColor,
	},
	allLocationDropDownTitle: {
		...commonStyles.caption,
		marginTop: 23,
		marginBottom: 10,
		paddingLeft: 30,
		color: AppTheme.colors.fontColor,
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	dropDownStyle: {
		width: "60%",
		marginLeft: 30,
		borderWidth: 1,
		borderColor: "#878787",
		borderRadius: 5,
		marginRight: "5%"
	},
	dropDownPicker: {
		// ...commonStyles.caption2,
		height: 30,
		// color: "#000000",
	},
	pickerText: {
		...commonStyles.caption2,
		lineHeight: 19,
		color: "#000000",
	},
	carText: {
		...commonStyles.Title2,
		color: "#000000",
		paddingHorizontal: 10
	},
	caretDownIcon: {
		fontSize: 15,
		marginRight: 10,
		marginTop: -4
	},
	showMapText: {
		...commonStyles.caption9,
		color: "#000000",
	}
});