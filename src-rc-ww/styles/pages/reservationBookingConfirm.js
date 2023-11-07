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
		marginRight: 35,
		marginBottom: 30
	},
	bookingDetailsImage: {
		width: 150,
		height: 120,
	},
	bookingDetails: {
		flexDirection: "column",
		marginLeft: 16
	},
	bookingDetailsAddress: {
		marginTop: 14,
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
	modal: {
		justifyContent: "center"
	},
	modalContainer: {
		width: "100%",
		backgroundColor: AppTheme.colors.white,
		borderRadius: 20,
		alignItems: "center",
		paddingTop: 70,
		paddingBottom: 49
	},
	modalTitle: {
		...commonStyles.Title4,
		color: AppTheme.colors.primary,
		letterSpacing: -0.3,
		opacity: 0.87
	},
	modalThumbsUpImage: {
		width: 89,
		height: 86,
		resizeMode: "cover",
		marginTop: 30
	},
	modalOkayButtonContainer: {
		marginTop: 91
	},
	modalOkayButtonStyle: {
		width: 250,
		borderRadius: 8,
		height: 38
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
	boldText: {
		...commonStyles.regular1,
		letterSpacing: -0.3,
		color: "#000",
		opacity: 0.87,
	},
	carModelText: {
		...commonStyles.caption,
		letterSpacing: -0.2,
		color: "#000",
		opacity: 0.87,
	}
});