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
		paddingHorizontal: 20
	},
	card: {
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
	cardTextContainer: {
		marginLeft: 30
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
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	cardStyle: {
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
	locationText: {
		...commonStyles.caption10,
		lineHeight: 18,
		color: "#000",
		opacity: 0.87,
	},
	locationText2: {
		...commonStyles.caption5,
		lineHeight: 18,
		color: "#000",
		opacity: 0.87,
		textAlign: "center",
		// paddingHorizontal: 80,
	},
	titleFont: {
		...commonStyles.regular4,
		color: "#000",
		opacity: 0.87,
		width: 100
	},
	mainCard: {
		paddingBottom: 15
	},
	ScrollProblem: { marginBottom: 80 }
});