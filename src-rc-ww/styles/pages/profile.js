import { StyleSheet } from "react-native";
// import AppTheme from "src/utils/appTheme";

export default StyleSheet.create({
	profileScrollView: {
		backgroundColor: "#f6f6f6"
	},
	formArea: {
		marginTop: 20,
		backgroundColor: "#ffffff",
		paddingBottom: 0
	},
	formInputItem: {
		marginLeft: 0,
		paddingTop: 3,
		paddingHorizontal: 10,
		borderBottomColor: "#e9e9e9",
		borderBottomWidth: 1,
	},
	profileMainView: {
		paddingHorizontal: 0,
	},
	profileImageView: {
		flex: 1,
		marginTop: 35,
		paddingHorizontal: 15,
		alignItems: "flex-start",
		flexDirection: "column"
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 100,
		resizeMode: "cover",
		marginBottom: 10,
	},
	profileUpdateButton: {
		backgroundColor: "#000000",
		position: "absolute",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		left: 20,
		bottom: 0,
		width: 34,
		height: 34,
		borderRadius: 34
	},
	textInputContainer: {
		backgroundColor: "transparent",
	},
	inputLabel: {
		fontSize: 14,
		marginLeft: 15,
		marginBottom: 5,
		paddingBottom: 5,
		color: "#8e8d8d"
	},
	addCreditCard: {
		paddingTop: 15,
		paddingHorizontal: 10,
		width: "100%"
	},
	submitButton: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingHorizontal: 10,
		width: "100%"
	},
});