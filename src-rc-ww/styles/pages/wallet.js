import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white,
		zIndex: 0,
	},
	cardContainer: {
		paddingBottom: 15,
		paddingHorizontal: 25
	},
	scrollView: {
		// paddingHorizontal: 10,
	},
	card: {
		borderRadius: 8,
		borderWidth: 0,
		borderColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.2,
		shadowRadius: 3.84,
		// elevation: 5,
		zIndex: 1,
		marginTop: 30,
		position: "relative"
	},
	cardContent: {
		height: "55%",
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-around"
	},
	row: {
		flexDirection: "row"
	},
	topupName: {
		...commonStyles.Title4,
		paddingTop: 20
	},
	topupValue: {
		...commonStyles.regular,
	},
	topupAmount: {
		...commonStyles.regular,
		paddingHorizontal: 25,
	},
	paymentText: {
		...commonStyles.Title4
	},
	buttonText: {
		...commonStyles.regular,
		color: AppTheme.colors.primary,
		marginLeft: 8,
		marginTop: 8
	},
	buttonStyle: {
		width: "68%",
		height: "90%",
		// borderRadius: 30,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		backgroundColor: AppTheme.colors.primary
	},
	buttonTextsStyle: {
		fontSize: 70,
		fontWeight: "900",
		height: 100,
	},
	width: {
		width: "73%",
	},
	voucher: {
		bottom: 0,
		marginTop: "3%",
		paddingHorizontal: 20,
	},
	nameItemInput: {
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 5,
		borderRadius: 8,
		height: 46,
		paddingBottom: 5,
		borderColor: "#000"
	},
	topUpButton: {
		position: "absolute",
		zIndex: 3,
		elevation: 3,
		top: 0,
		right: -10
	},
	paymentButton: {
		flexDirection: "row",
		paddingHorizontal: 30,
		marginTop: 40
	},
	arrowIcon: {
		color: AppTheme.colors.primary,
		marginLeft: 10
	},
	button: {
		width: "60%",
		height: 50,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary
	},
});