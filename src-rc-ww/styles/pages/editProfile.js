import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainScreenView: {
		backgroundColor: AppTheme.colors.white,
		flex: 1,
	},
	mainScrollView: {
		paddingTop: 0,
		paddingHorizontal: 20,
		paddingBottom: 62
	},
	innerView: {
		paddingHorizontal: 20,
		paddingTop: "10%",
	},
	profileDetails: {
		flexDirection: "row",
		position: "relative",
		alignItems: "center",
		// paddingHorizontal: 10,
		marginBottom: 40
	},
	profileImage: {
		width: 103,
		height: 103,
		borderWidth: 3,
		// borderColor: "#008C44",
		borderColor: AppTheme.colors.primary,
		borderRadius: 100
	},
	editIcon: {
		width: 32,
		height: 32,
		borderRadius: 100,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#F4F4F4",
		position: "absolute",
		bottom: 3,
		zIndex: 9,
		marginLeft: 70,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	editImage: {
		width: 13,
		height: 13
	},
	profileName: {
		marginLeft: 10,
	},
	nameText: {
		...commonStyles.regular1,
		letterSpacing: -0.3,
		color: "#000",
		marginBottom: 20
	},
	emailText: {
		...commonStyles.caption,
		letterSpacing: -0.3,
		color: "#000",
		// textAlign: "center",
	},
	wrapEmail: {
		...commonStyles.caption5,
		// letterSpacing: -0.1,
		color: "#000",
		// textAlign: "center",
		flexWrap: "wrap",
	},
	subEmail: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	mainContainer: {
		// flex: 1,
		justifyContent: "center",
		// marginBottom: 20,
		paddingVertical: 13
	},
	mainContainerSpace: {
		marginBottom: 80,
		marginTop: 2
	},
	emailTitle: {
		...commonStyles.caption,
		marginBottom: 4,
		paddingLeft: 4,
		color: AppTheme.colors.fontColor,
		letterSpacing: -0.17,
		opacity: 0.8
	},
	nameItemInput: {
		marginLeft: 0,
		paddingLeft: 5,
		borderRadius: 8,
		height: 51,
		paddingBottom: 5,
	},
	mailIcon: {
		marginLeft: 10,
		marginRight: 5,
		width: 16,
		height: 18
	},
	passwordIcon: {
		marginRight: 30
	},
	buttonContainer: {
		// marginTop: 37
		marginVertical: 15
	},
	confirmButton: {
		width: 204,
		height: 42,
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	languageButton: {
		width: 144,
		height: 30,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#878787",
		paddingLeft: 17,
		position: "relative",
		flexDirection: "row",
		alignItems: "center"
	},
	flagImage: {
		width: 19,
		height: 18,
		borderRadius: 100,
		marginRight: 10
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
		marginBottom: 4,
		paddingLeft: 10
	},
	passwordTextFontDenied: {
		...commonStyles.caption8,
		lineHeight: 15,
		color: "red",
		marginBottom: 4,
		paddingLeft: 10
	},
	downArrowIcon: {
		width: 9,
		height: 6,
		position: "absolute",
		right: 11,
		resizeMode: "cover"
	},
	languageName: {
		color: "#000",
		fontSize: 14,
		lineHeight: 18,
		fontFamily: AppTheme.fonts.DMSansMedium
	},
	uploadOptionsModal: {
		margin: 0,
		justifyContent: "flex-end",
	},
	uploadOptionsContainer: {
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		backgroundColor: "white",
		paddingBottom: 40
	},
	uploadOptionButton: {
		marginTop: 10,
		width: 300,
		borderWidth: 0.5,
		borderColor: AppTheme.colors.lightGray,
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	paymentMethodStyle: {
		paddingHorizontal: 20,
		paddingVertical: 15
	},
	paymentMethodText: {
		color: AppTheme.colors.black
	},
	paymentMethod: {
		flexDirection: "row",
		paddingHorizontal: 20,
		marginBottom: 10,
		marginTop: -10
	},
	titleText: {
		...commonStyles.regular
	},
	methodType: {
		...commonStyles.Title2,
		paddingHorizontal: 35
	},
	cardDetails: {
		...commonStyles.Title2,
		// color: AppTheme.colors.primary,
		paddingHorizontal: 50,
	},
	noPaymentMethodText: {
		...commonStyles.regular,
		color: AppTheme.colors.primary,
		marginLeft: 10,
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 25,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	imageIcon: {
		width: 20,
		height: 24,
		marginBottom: 10,
		paddingHorizontal: 20,
		marginLeft: "28%"
	},
	imageStyle: {
		paddingHorizontal: 30,
		marginLeft: 11,
		marginTop: -2
	},
	editIconStyle: {
		paddingHorizontal: "44%"
	},
	passwordStyle: {
		marginTop: 20, flexDirection: "row"
	}
});