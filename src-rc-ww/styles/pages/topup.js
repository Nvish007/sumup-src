import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	cardContainer: {
		paddingBottom: 15,
		paddingHorizontal: 20
	},
	scrollView: {
		paddingHorizontal: 10,
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
		elevation: 5,
	},
	cardContent: {
		height: 170,
		alignItems: "flex-start",
		justifyContent: "space-between",
		paddingHorizontal: 30
	},
	cardContent1: {
		height: "60%",
		alignItems: "flex-start",
		justifyContent: "space-between",
		paddingHorizontal: 30,
	},
	topupName: {
		...commonStyles.regular4,
		marginTop: 10,
	},
	topupPrice: {
		...commonStyles.regular,
	},
	topupAmount: {
		...commonStyles.regular
	},
	buttonStyle: {
		width: 95,
		height: 50,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText
	},
	wallet: {
		paddingLeft: 5,
		paddingBottom: 10
	},
	width: {
		width: "73%",
	},
	voucher: {
		bottom: 0,
		marginTop: "5%"
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
	buttonContainer: {
		paddingBottom: 17
	},
	button: {
		width: "60%",
		height: 50,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 15,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	titleText1: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 20,
		marginBottom: 25
	},
	titleText2: {
		...commonStyles.regular4,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 20,
		paddingBottom: 30
	},
	outerButton: {
		paddingHorizontal: 95,
		marginLeft: 50,
		marginBottom: 10
	},
	padding: {
		paddingVertical: 10
	},
	row: {
		flexDirection: "row"
	},
	buttonPosition: {
		position: "absolute",
		top: -5,
		left: 60
	}
});