import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	passwordFont: {
		color: AppTheme.colors.primary,
		fontSize: 20
	},
	slide: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 16
	},
	screenFixHeader: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		zIndex: 5,
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		height: 64,
		paddingTop: 0,
		backgroundColor: AppTheme.colors.white
	},
	backButtonArrow: {
		position: "absolute",
		left: 15,
	},
	headerText: {
		...commonStyles.header1,
		textAlign: "center",
		lineHeight: 27,
		color: AppTheme.colors.fontColor
	},
	mainScrollView: {
		paddingTop: 80,
		marginBottom: 50,
		paddingBottom: 120
	},
	viewStyle: {
		marginTop: 20,
		paddingBottom: 140,
	},
	nameItemInput: {
		marginLeft: 0,
		paddingLeft: 5,
		borderRadius: 8,
	},
	inputUserIcon: {
		width: 24,
		height: 24,
		marginLeft: 8,
		resizeMode: "contain"
	},
	textMargin: {
		...commonStyles.caption5,
		marginLeft: 16,
		paddingTop: 0,
		color: AppTheme.colors.fontColor
	},
	mainContainer: {
		// flex: 1,
		justifyContent: "center",
		marginTop: 30
	},
	appLogoContainer: {
		alignItems: "center",
		marginTop: 0,
		marginBottom: 15
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain",
	},
	row: {
		flexDirection: "row",
		alignItems: "center"
	},
	emailTitle: {
		...commonStyles.caption,
		marginBottom: 4,
		paddingLeft: 20,
		color: AppTheme.colors.fontColor,
		letterSpacing: -0.17,
	},
	confirmForwardIcon: {
		position: "absolute",
		right: 35,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	mailIcon: {
		marginLeft: 10,
		marginRight: 0
	},
	passwordIcon: {
		marginRight: 10
	},
	emailInput: {
		fontSize: 16,
		fontFamily: AppTheme.fonts.PoppinsMedium,
		color: AppTheme.colors.darkBlack
	},
	titleFont: {},
	socialLinksText: {
		...commonStyles.Title2,
		letterSpacing: -0.8,
		color: AppTheme.colors.darkBlack,
		textAlign: "center"
	},
	checkText: {
		...commonStyles.caption5,
		letterSpacing: -0.1,
		color: AppTheme.colors.darkBlack,
		textAlign: "center",
	},
	subText: {
		...commonStyles.caption5,
		letterSpacing: -0.1,
		color: AppTheme.colors.primary,
		textAlign: "center"
	},
	emailContainer: {
		marginTop: -120
	},
	error: {
		...commonStyles.caption6,
		color: AppTheme.colors.primary,
		marginTop: 8,
		paddingHorizontal: 0,
	},
	passwordRequirmentsText: {
		...commonStyles.caption8,
		color: AppTheme.colors.primary,
		paddingLeft: 0
	},
	passwordRequirmentsText2: {
		...commonStyles.caption8,
		color: "red",
		paddingLeft: 0
	},
	passwordTextFontSuccess: {
		...commonStyles.caption8,
		lineHeight: 15,
		color: AppTheme.colors.primary,
		marginBottom: 7,
		paddingLeft: 10
	},
	passwordTextFontDenied: {
		...commonStyles.caption8,
		lineHeight: 15,
		color: "red",
		marginBottom: 7,
		paddingLeft: 10
	},
	formContainer: {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: AppTheme.colors.white,
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	margin: {
		marginTop: 17
	},
	marginTop: {
		marginTop: 5
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	checkboxContainerStyle: {
		marginLeft: 10
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	acceptText: {
		...commonStyles.caption5,
		marginLeft: 16,
		paddingTop: 0,
	},
	termsAndConditionText: {
		...commonStyles.caption5,
		marginLeft: 3,
		color: "#008000",
		paddingTop: 0,
	},
	termsAndConditionContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
});