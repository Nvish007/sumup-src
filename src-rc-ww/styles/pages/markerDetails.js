import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	modalMain: {
		flex: 1
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0,
		marginHorizontal: 0,
		marginBottom: 0
	},
	container: {
		backgroundColor: "white",
		paddingTop: 37,
		paddingBottom: 30,
		borderRadius: 30,
		paddingHorizontal: 25,
		width: "100%"
	},
	markerDetailsMain: {
		width: "100%",
		paddingHorizontal: 15,
		marginBottom: 40,
	},
	chargingText: {
		paddingTop: 25,
	},
	marginTop: {
		marginTop: 30,
	},
	markerBox: {
		backgroundColor: "#FFFFFF",
		paddingTop: 25,
		paddingBottom: 10,
		borderRadius: 12,
		paddingHorizontal: 12,
		shadowColor: "#CCCCCC",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 4,
		width: "100%"
	},
	closeIconBtn: {
		position: "absolute",
		zIndex: 5,
		top: 4,
		right: 12,
	},
	closeBtnText: {
		fontSize: 30,
		textAlign: "right"
	},
	usersName: {
		fontSize: 18
		// height: SCREEN_HEIGHT,
		// width: SCREEN_WIDTH,
	},
	subTexts: {
		...commonStyles.caption7,
		color: "#333333"
	},
	bicycleImg: {
		width: 55,
		height: 55,
		resizeMode: "contain"
	},
	listScrollView: {
		height: "46%"
	},
	textAvail: {
		flexDirection: "row",
	},
	column: {
		flexDirection: "column"
	},
	listItem: {
		marginTop: 2,
		backgroundColor: "#fff",
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		paddingVertical: 10,
		marginHorizontal: 4,
		paddingHorizontal: 0,
		marginLeft: 2,
		marginBottom: 18,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
	},
	listItem1: {
		marginTop: 2,
		backgroundColor: "#fff",
		borderRadius: 9,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
		paddingVertical: 0,
		marginHorizontal: 4,
		paddingHorizontal: 0,
		marginLeft: 2,
		marginBottom: 18,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.8,
		shadowRadius: 9,
		elevation: 5,
		marginRight: 3
	},
	listLeft: {
		paddingBottom: 0,
		borderBottomWidth: 0,
		marginBottom: 0,
		paddingLeft: 14,
		alignItems: "center",
		flexDirection: "row",
		paddingTop: 0,
	},
	listRight: {
		paddingBottom: 0,
		borderBottomWidth: 0,
		paddingTop: 15,
		paddingRight: 70,
		justifyContent: "center",
		flexDirection: "row"
	},
	margin: {
		marginLeft: "22%",
		marginTop: 10
	},
	textMargin: {
		paddingTop: 25,
		marginLeft: 15
	},
	carList: {
		marginRight: "33%"
	},
	carText: {
		width: "50%",
		marginTop: 25,
		marginRight: "10%"
	},
	carName: {
		...commonStyles.regular2,
		color: "#000",
		marginLeft: 0,
		opacity: 0.87
	},
	chargePointName: {
		...commonStyles.buttonText,
		color: "#000",
		marginLeft: 0,
		opacity: 0.87
	},
	lockText: {
		...commonStyles.caption6,
		color: "#000",
		marginLeft: 0,
		opacity: 0.87
	},
	accessText: {
		...commonStyles.regular,
		color: "#000",
		marginLeft: 0,
		opacity: 0.87
	},
	scanButton: {
		marginRight: 30
	},
	reservationIcon: {
		marginTop: 25,
		marginLeft: -20,
		// paddingRight: 50
	},
	Available: {
		...commonStyles.buttonText,
		color: "#000",
		marginTop: 2,
		marginLeft: 4,
	},
	noteAvailable: {
		...commonStyles.buttonText,
		color: "#ff0505",
		marginTop: 2,
		marginLeft: 4,
	},
	BookButton: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		width: 96,
		height: 44,
		marginBottom: 0,
		borderWidth: 0
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	listBody: {
		paddingBottom: 0,
		borderBottomWidth: 0,
		paddingTop: 0
	},
	usersNameList: {
		fontSize: 16,
	},
	locationBorderTop: {
		height: 4,
		backgroundColor: "#E8E8E8",
		width: 101,
		position: "relative",
		top: -21,
		zIndex: 9,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		left: 0,
		right: 0,
		justifyContent: "center",
		borderRadius: 31
	},
	locationName: {
		...commonStyles.buttonText,
		color: "#333333",
		paddingBottom: 8,
		marginLeft: -10
	},
	locationAddress: {
		flexDirection: "row",
		marginTop: 0,
		paddingTop: 9,
		borderTopWidth: 1,
		borderTopColor: "#F0F0F0",
	},
	locationImg: {
		width: 17,
		height: 24,
		marginRight: 12,
		resizeMode: "cover"
	},
	kMImg: {
		width: 20,
		height: 20,
		marginRight: 10,
		resizeMode: "cover"
	},
	KMTexts: {
		...commonStyles.caption3,
		color: "#333333",
		opacity: 0.8
	},
	locationBlog: {
		flexDirection: "row"
	},
	locationDistance: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		// paddingHorizontal: 43,
		// marginBottom: 28
	},
	locationTabs: {
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingHorizontal: 10,
		marginBottom: 20,
		// marginLeft: 10,
		marginTop: 29,
	},
	selectBlog: {
		width: 73,
		height: 70,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#C1C1C1",
		borderRadius: 8,
		marginLeft: 5,
	},
	selectBlogActive: {
		// borderColor: "#008C44",
		borderColor: AppTheme.colors.primary,
	},
	locationTabContent: {
		marginBottom: 7
	},
	modalConfirm: {
		justifyContent: "center",
		margin: 0,
		marginHorizontal: 15,
		marginBottom: 0,
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	backButton: {
		paddingTop: 10,
		paddingHorizontal: 12,
		marginBottom: 0
	},
	ConfirmContent: {
		textAlign: "center",
		justifyContent: "center",
		flexDirection: "column",
		paddingHorizontal: 40,
		marginLeft: "auto",
		marginRight: "auto"
	},
	ConfirmText: {
		...commonStyles.Title4,
		textAlign: "center",
		justifyContent: "center",
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		paddingTop: 15,
		marginBottom: 18
	},
	boldText: {
		fontFamily: AppTheme.fonts.PoppinsSemiBold
	},
	watchImgIcon: {
		width: 90,
		height: 66,
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 29
	},
	ConfirmButton: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		width: "100%",
		height: 38,
		marginBottom: 30,
	},
	firstTabImage: {
		width: 68,
		height: 27
	},
	secTabImage: {
		width: 57,
		height: 50
	},
	thirdTabImage: {
		width: 50,
		height: 50
	},
	contentCarImage: {
		width: 60,
		height: 65,
		resizeMode: "cover",
	},
	contentBikeImage: {
		width: 67,
		height: 63,
		resizeMode: "cover"
	},
	contentCharginPointImage: {
		width: 50,
		height: 75,
		resizeMode: "cover"
	},
	lockImg: {
		width: 50,
		height: 60,
		resizeMode: "cover"
	},
	QRscannerBottomButton: {
		padding: 16,
		flex: 1,
		justifyContent: "center",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 20
	},
	scannerBtns: {
		width: 60,
		height: 48,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "rgba(255,255,255,0.5)",
		marginHorizontal: 15
	},
	lockerTitle: {
		...commonStyles.caption6,
		color: "#000",
		marginTop: 2,
	},
	lockerRight: {
		paddingBottom: 0,
		borderBottomWidth: 0,
		paddingTop: 10,
	},
	lockerSubSection: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	lockerScanButton: {
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 10,
		width: "90%",
		height: 55,
		marginBottom: 0,
		borderWidth: 0
	},
	lockerScanText: {
		...commonStyles.regular1,
		color: "#000",
		marginTop: 10,
	},
	lockerScanButtonText: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		padding: 10,
		paddingRight: 40
	},
});