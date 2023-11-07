import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	profileScrollView: {
	},
	profileMainView: {
		paddingHorizontal: 10,
	},
	textInputContainer: {
		backgroundColor: "transparent",
		borderBottomWidth: 1,
	},
	profileImageView: {
		flex: 1,
		marginTop: 35,
		alignItems: "center",
		flexDirection: "column"
	},
	profileImage: {
		width: 90,
		height: 90,
		borderRadius: 90,
		resizeMode: "cover",
		marginBottom: 10,
	},
	changePasswordText: {
		color: AppTheme.colors.primary,
		marginBottom: 10
	},
	colLeft: {
		paddingRight: 5,
	},
	colRight: {
		paddingLeft: 5,
	},
	updateButton: {
		marginTop: 20,
		marginBottom: 40
	},
	languageSelect: {
		backgroundColor: "transparent",
		elevation: 0,
	},
	languageSelectText: {
		fontSize: 14,
		paddingHorizontal: 10
	},
});