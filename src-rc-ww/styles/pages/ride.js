import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	listViewContainer: {

	},
	cardContainer: {
		paddingBottom: 15,
		paddingHorizontal: 9
	},
	textContainer: {
		paddingHorizontal: 90,
		paddingVertical: 100,
		fontSize: 20
	},
	card: {
		borderRadius: 8,
		borderWidth: 0,
		borderColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 3.84,
		elevation: 5
	},
	cardContent: {
		height: 84,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	cardImage: {
		marginLeft: 0,
		width: 61,
		height: 58,
		resizeMode: "cover",
	},
	cardImage1: {
		marginLeft: 50,
		width: 61,
		height: 58,
		resizeMode: "cover",
	},
	cardTextContainer: {
		marginTop: 10
	},
	cardButtonContainer: {
		marginLeft: 30
	},
	cardButton: {
		width: 96,
		height: 44,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
	},
	cardButton1: {
		width: 96,
		height: 44,
		borderRadius: 8,
		marginRight: 50,
		backgroundColor: AppTheme.colors.primary,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	locationText: {
		...commonStyles.caption10,
		lineHeight: 18,
		color: AppTheme.colors.primary,
		opacity: 0.87,
		textAlign: "center",
	},
	locationText2: {
		...commonStyles.caption10,
		lineHeight: 18,
		color: AppTheme.colors.primary,
		opacity: 0.87,
	},
	titleFont: {
		...commonStyles.regular4,
		color: "#000",
		opacity: 0.87,
		textAlign: "center",
	},
	noRidesAvailable: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 50
	},
	titleText: {
		...commonStyles.regular4,
		color: "#000000",
		opacity: 0.87,
	},
	titleText1: {
		...commonStyles.regular4,
		color: "#000000",
		opacity: 0.87,
		textAlign: "center",
		paddingHorizontal: 100
	},
});