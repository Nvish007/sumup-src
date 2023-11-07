import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeAreaView: {
		flexGrow: 1,
		backgroundColor: "white",
	},
	container: {
		position: "relative",
		display: "flex",
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 100,
	},
	// container: {
	// 	flexGrow: 1,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// },
	// leftArrowContainer: {
	// 	position: "absolute",
	// 	top: 15,
	// 	zIndex: 3,
	// 	left: 15
	// },
	// innerContent: {
	// 	// width: "100%",
	// 	paddingVertical: 20,
	// 	paddingHorizontal: 25,
	// },
	// text: {
	// 	// fontWeight: "bold",
	// 	color: "#FFFFFF",
	// 	fontSize: 18,
	// 	lineHeight: 24,
	// 	textAlign: "center",
	// 	marginBottom: 20
	// },
	// inputContainer: {
	// 	position: "relative"
	// },
	// textInput: {
	// 	fontSize: 18,
	// 	paddingRight: 25,
	// 	color: "#FFFFFF",
	// 	borderBottomColor: "#FFFFFF",
	// 	borderBottomWidth: 1
	// },
	// closeButton: {
	// 	position: "absolute",
	// 	right: 0,
	// 	bottom: 13
	// },
	// rightArrowContainer: {
	// 	width: 46,
	// 	height: 46,
	// 	paddingLeft: 4,
	// 	borderRadius: 44,
	// 	backgroundColor: "#FFFFFF",
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	position: "absolute",
	// 	zIndex: 3,
	// 	bottom: 12,
	// 	right: 12
	// },
	appLogoContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 80
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain",
		marginBottom: 45
	},
	greetMessage1: {
		...commonStyles.Title2,
		letterSpacing: -0.8,
		fontWeight: "400",
		color: AppTheme.colors.darkBlack,
		marginBottom: 66
	},
	greetMessage2: {
		fontSize: 18,
		lineHeight: 32,
		letterSpacing: -0.8,
		fontWeight: "500",
		// marginBottom: 66
	},
	formContainer: {
		width: "100%",
		marginTop: 0
	},
	phoneMSGtext: {
		...commonStyles.caption4,
		marginBottom: 11,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	phoneInput: {
		...commonStyles.regular2,
		paddingHorizontal: 0,
	},
	codeText: {
		...commonStyles.regular1,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6,
		lineHeight: 19
	},
	codeTextInput: {
		...commonStyles.regular2,
		backgroundColor: AppTheme.colors.white,
		height: 45,
		paddingLeft: 0,
		marginBottom: 1
	},
	phoneContainer: {
		backgroundColor: AppTheme.colors.white,
		width: "100%",
		fontSize: 16,
		paddingRight: 5,
		paddingLeft: 5,
		height: 51,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: AppTheme.colors.lightGray
	},
	textContainerStyle: {
		paddingLeft: 0,
		backgroundColor: AppTheme.colors.white,
	},
	phoneflagStyle: {
		backgroundColor: AppTheme.colors.white
	},
	termsAndConditionContainer: {
		marginTop: 17,
		flexDirection: "row",
		alignItems: "center"
	},
	checkbox: {
		color: "#000",
		borderColor: "#000000",
		borderRadius: 5,
	},
	acceptText: {
		...commonStyles.caption5,
		marginLeft: 16,
		paddingTop: 0,
	},
	termsAndConditionText: {
		...commonStyles.caption5,
		marginLeft: 2,
		color: "#008000",
		paddingTop: 0,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white,
		// marginTop: "50%",
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	arrowRightIcon: {
		position: "absolute",
		top: 32,
		right: 40
	},
	error: {
		color: "red",
		marginTop: 5,
		fontSize: 15,
	},
	backButton: {
		position: "absolute",
		top: 15,
		left: 15
	},
	confirmForwardButton: {
		position: "absolute",
		right: 40,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	checkboxContainerStyle: {
		marginLeft: 6,
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	nameItemInput: {
		marginLeft: 0,
		paddingLeft: 5,
		borderRadius: 8,
	},
	emailInput: {
		...commonStyles.regular2,
		color: AppTheme.colors.darkBlack
	},
	text: {
		...commonStyles.regular,
		// letterSpacing: -0.2,
		color: AppTheme.colors.darkBlack,
		// textAlign: "center",
	},
	marginL: {
		marginLeft: -70,
		marginTop: 50
	},
	marginR: {
		marginRight: 10
	},
	formView: {
		width: "100%",
		marginTop: 70
	}
});