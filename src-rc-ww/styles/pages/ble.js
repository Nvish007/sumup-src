import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	subContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	rowContainer: {
		flexDirection: "row",
		padding: 10,
		paddingTop: 20,
	},
	confirmButton: {
		width: "90%",
		height: 50,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		marginBottom: 10,
	},
	connectButton: {
		width: "50%",
		height: 40,
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		marginBottom: 10
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	buttonSubTextStyle: {
		...commonStyles.buttonText,
		marginRight: "25%"
	},
	scrollView: {
		marginHorizontal: 20
	},
	listContainer: {
		margin: 5,
		padding: 5,
		borderRadius: 5,
		borderWidth: 0.5
	},
	labelText: {
		fontSize: 16,
		fontWeight: "bold"
	},
	subText: {
		fontSize: 12,
		fontWeight: "300"
	}
});