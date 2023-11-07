import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	root: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 300
	},
	rootDoc: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "green",
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 50,
		margin: 20
	},
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	titleFont: {
		marginTop: 20,
	},
	titleTextFont: {
		fontWeight: "bold",
		fontSize: 20
	},
	slide: {
		flex: 1,
		width: "100%",
		paddingHorizontal: 30
	},
	viewInput: {
		width: "100%"
	},
	nameItemInput: {
		marginTop: 100,
	},
	qText: {
		fontSize: 20,
		marginBottom: 10
	},
	subView: {
		flexDirection: "row",
		justifyContent: "center"
	},
	button: {
		width: "80%",
		bottom: 10,
		marginLeft: 30,
	},
	viewStyle: {
		marginTop: 20
	},
	backButtonArrow: {
		position: "absolute",
		top: 22,
		left: 15,
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
	formContainer: {
		marginTop: 80,
		paddingBottom: 10,
	},
	confirmForwardIcon: {
		position: "absolute",
		right: 10,
		top: 5
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
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "stretch",
		backgroundColor: "#F5FCFF"
	},
	label: {
		fontSize: 30,
		textAlign: "center",
		marginTop: 50
	},
	buttonContainer: {
		margin: 10
	},
	imageContainer: {
		flexDirection: "row",
		justifyContent: "center"
	},
	results: {
		fontSize: 16,
		textAlign: "left",
		margin: 10,
	},
	imageResult: {
		flex: 1,
		flexShrink: 1,
		height: 200,
		alignItems: "center",
		justifyContent: "center",
		margin: 10
	},
	verifyButtonContainer: {
		// position: "absolute",
		// bottom: 30,
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
		height: 44,
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
	mainContainer: {
		marginLeft: 15,
		marginTop: 30
	},
	marginL: {
		marginLeft: 15,
	},
	marginT: {
		marginTop: 15
	},
	emailTitle: {
		...commonStyles.caption,
		marginBottom: 4,
		paddingLeft: 10,
		color: AppTheme.colors.fontColor,
		letterSpacing: -0.17,
	},
	nameItem: {
		width: 190,
		// marginLeft: 0,
		// paddingLeft: 5,
		borderRadius: 8
	},
	nameItem2: {
		width: 100,
		marginRight: 30,
		paddingLeft: 5,
		borderRadius: 8,
	},
	emailInput: {
		// ...commonStyles.regular2,
		fontSize: 16,
		fontFamily: AppTheme.fonts.PoppinsMedium,
		color: AppTheme.colors.darkBlack,
	},
	emailInput2: {
		// ...commonStyles.regular2,
		fontSize: 16,
		fontFamily: AppTheme.fonts.PoppinsMedium,
		color: AppTheme.colors.darkBlack,
		marginLeft: -10,
	},
	inputUserIcon: {
		width: 30,
		height: 30,
		marginLeft: 10,
		resizeMode: "contain"
	},
	inputUserIcon2: {
		width: 50,
		height: 50,
		// marginLeft: 10,
		resizeMode: "contain"
	},
	textColor: {
		color: AppTheme.colors.darkBlack
	},
	dateText: {
		paddingVertical: 4
	},
	labelView: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	pickerView: {
		height: 40,
		marginTop: 10
	},
	cardContainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 300,
		margin: 20
	},
	documentInfoContainer: {
		paddingHorizontal: 20,
		paddingVertical: 30
	},
	drivingLicenceInfoCard: {
		flexDirection: "row"
	},
	drivingLicenceTitle: {
		marginLeft: 20,
		marginRight: 5
	},
	detailsIcon: {
		width: 20,
		height: 20
	},
	textInputStyle: {
		...commonStyles.regular2,
		backgroundColor: AppTheme.colors.white,
		borderWidth: 0.5,
		height: 65,
		paddingLeft: 80,
		borderColor: AppTheme.colors.lightGray,
		borderRadius: 10
	},
	textInputContainer: {
		paddingTop: 0,
		width: "100%",
		backgroundColor: "#fff",
		color: "#000000"
	},
	drivingLicenceIcon: {
		width: 30,
		height: 30,
		position: "absolute",
		zIndex: 1,
		top: 28,
		left: 20
	},
	documentsPicturesContainer: {
		paddingVertical: 30
	},
	cameraBorderedImageContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	cameraBorderedIcon: {
		width: 300,
		height: 300,
		resizeMode: "contain"
	},
	documentIdentityLabel1: {
		marginLeft: 20
	},
	documentIdentityLabel2: {
		marginLeft: 20
	},
	calendarIcon: {
		width: 30,
		height: 30
	},
	expiryDateContainer: {
		marginTop: 12,
		width: 320,
		height: 60,
		borderWidth: 0.5,
		borderColor: AppTheme.colors.lightGray,
		borderRadius: 10,
		padding: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	expiryDate: {
		paddingLeft: 30
	},
	errorMessage: {
		color: "red",
		marginTop: 5,
		fontSize: 16
	},
	documentImageContainer: {
		marginTop: 10
	},
	removeIcon: {
		alignItems: "flex-end"
	},
	documentImage: {
		alignItems: "center"
	},
	cardFieldContainer: {
		marginHorizontal: 20
	},
	paymentInfoTitleContainer: {
		marginVertical: 20,
		alignItems: "center"
	},
	paymentInfoTitle: {
		...commonStyles.Title2,
		textAlign: "center"
	},
	cardImagesContainer: {
		flexDirection: "row",
		marginHorizontal: 30,
		marginVertical: 20
	},
	cardUsageDisclaimerContainer: {
		marginHorizontal: 30,
		marginVertical: 20
	},
	cardUsageDisclaimer: {
		...commonStyles.regular3
	},
	paymentMethodText: {
		marginHorizontal: 20,
		marginBottom: 10
	},
	dropDownStyle: {
		// width: "100%",
		marginHorizontal: 20,
		borderWidth: 1,
		borderColor: "#878787",
		borderRadius: 5,
		// marginRight: "5%"
	},
	caretDownIcon: {
		fontSize: 15,
		marginRight: 10,
		marginTop: -4
	},
	dropDownPicker: {
		height: 30
	},
	pickerText: {
		...commonStyles.caption2,
		lineHeight: 19,
		color: "#000000",
	}
});