import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	verifyButtonContainer: {
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
	alertContainer: {
		marginLeft: 15,
		marginTop: 10,
		// marginRight: "5%",
		paddingVertical: "3%",
		backgroundColor: "#F8F8F8", // "#F8F8F8"
		borderRadius: 5,
		width: "90%",
	},
	textArea: {
		width: "85%",
		backgroundColor: "#F6F8F9",
		paddingHorizontal: 5,
		borderRadius: 4,
		paddingVertical: 10,
		marginLeft: "6%",
		textAlignVertical: "top"
	},
	subContainer: {
		paddingVertical: 13,
		paddingHorizontal: 40,
		alignItems: "flex-start"
	},
	ratingInput: {
		paddingVertical: 40
	},
	carPadding: {
		paddingHorizontal: 20
	},
	mainText: {
		...commonStyles.header2,
		color: AppTheme.colors.primary,
		paddingHorizontal: 70,
		paddingVertical: 40
	},
	subText: {
		...commonStyles.Title4,
		color: AppTheme.colors.darkBlack,
		paddingHorizontal: 30,
		paddingVertical: 5
	},
	checkText: {
		...commonStyles.Title2,
		color: AppTheme.colors.darkBlack,
		paddingHorizontal: 10,
		marginTop: -5,
		// paddingVertical: 0
	},
	column: {
		flexDirection: "column"
	},
	row: {
		flexDirection: "row",
	},
	textMargin: {
		paddingVertical: 10
	},
	checkboxContainerStyle: {
		// tintColor: "#008c44",
		tintColor: AppTheme.colors.primary,
	}
});