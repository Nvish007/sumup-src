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
		marginBottom: 50,
		paddingBottom: 100,
		paddingHorizontal: 28
	},
	bookingDetailsContainer: {
		flexDirection: "row",
		marginRight: 25,
		marginBottom: 30
	},
	bookingDetailsImage: {
		width: 160,
		height: 120,
	},
	chargingImage: {
		width: 110,
		height: 130,
		resizeMode: "cover"
	},
	bookingDetails: {
		flexDirection: "column",
		marginLeft: 15
	},
	bookingDetailsAddress: {
		marginTop: 10,
	},
	pricingContainer: {
		marginTop: 10
	},
	pricingTitle: {
		...commonStyles.regular4,
		letterSpacing: -0.3,
		color: "#000",
		opacity: 0.87,
		marginBottom: 5,
	},
	averagePriceContainer: {
		...commonStyles.caption,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
		letterSpacing: -0.3,
		color: "#000",
		opacity: 0.87,
	},
	pricePerKmContainer: {
		...commonStyles.caption,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
		letterSpacing: -0.3,
		color: "#000",
		opacity: 0.87,
	},
	priceText: {
		color: "#000",
		opacity: 0.6,
	},
	dottedLines: {
		borderStyle: "dotted",
		borderWidth: 1,
		borderRadius: 100,
		marginVertical: 17,
		opacity: 0.6
	},
	rentalTitle: {
		marginBottom: 5,
		fontWeight: "bold"
	},
	startRentalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5
	},
	endRentalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5
	},
	optionalInformationContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
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
	forwardArrowIcon: {
		position: "absolute",
		right: 35,
		top: 37,
		zIndex: 1,
		width: 22,
		height: 8,
		resizeMode: "cover",
	},
	boldText: {
		...commonStyles.regular4,
		letterSpacing: -0.2,
		color: "#000",
		opacity: 0.80
	},
	carModelText: {
		...commonStyles.caption,
		letterSpacing: -0.3,
		color: "#000",
		opacity: 0.87,
	},
	carBlog: {
		flexDirection: "row",
		marginBottom: 35,
		paddingHorizontal: 0,
		justifyContent: "space-between",
		marginTop: 5
	},
	carBlogInner: {
		backgroundColor: "#F8F8F8",
		borderRadius: 5,
		width: "30%",
		height: 73,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 3
	},
	carCancelInner: {
		backgroundColor: "#FFECEC",
	},
	searchIcon: {
		width: 18,
		height: 18,
		resizeMode: "cover",
		marginBottom: 6
	},
	editIcon: {
		width: 16,
		height: 16,
		resizeMode: "cover",
		marginBottom: 6,
		marginTop: 5
	},
	cancelIcon: {
		width: 23,
		height: 25,
		resizeMode: "cover",
		marginBottom: 3
	},
	carBlogTitle: {
		fontSize: 13,
		lineHeight: 20,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		color: "#000000",
		opacity: 0.87,
		letterSpacing: -0.3,
		marginBottom: 0
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 35,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	backButton: {
		paddingTop: 10,
		paddingHorizontal: 0,
		marginBottom: 10,
	},
	titleText2: {
		...commonStyles.regular1,
		letterSpacing: -0.2,
		textAlign: "center",
		paddingHorizontal: 0,
		marginBottom: 40,
		marginTop: 10,
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
	},
	titleText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 60,
		marginBottom: 25
	},
	titleText3: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 15,
		marginBottom: 25
	},
});