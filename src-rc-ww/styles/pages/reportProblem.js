import { StyleSheet } from "react-native";
import commonStyles from "src/styles/common";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	reservationsScrollView: {
		paddingHorizontal: 10,
		paddingTop: 10
	},
	mainView: {
		paddingHorizontal: 10,
	},
	subView: {
		// paddingHorizontal: 30,
		flexDirection: "row",
		justifyContent: "center"
	},
	titleText: {
		...commonStyles.regular4,
		color: "#000000",
		opacity: 0.87,
	},
	subText: {
		...commonStyles.Title2,
		color: "#000000",
		opacity: 0.87,
		marginLeft: 5
	},
	invalidText: {
		...commonStyles.regular5,
		color: "#FF5959",
		opacity: 0.87,
		marginLeft: 5
	},
	icon: {
		marginLeft: 5
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 10,
		height: 47,
	},
	imageContainer: {
		flexDirection: "row",
		marginTop: 20,
		justifyContent: "space-evenly"
	},
	image: {
		height: 150,
		width: 100
	},
	reportProblemScreen: {
		flex: 1,
		paddingBottom: 40
	},
	reservationsDetailsView: {
		paddingHorizontal: 20,
		marginTop: 20
	},
	texts: {
		fontSize: 16,
		marginBottom: 10
	},
	textInput: {
		backgroundColor: "transparent",
		borderBottomWidth: 1,
	},
	textArea: {
		backgroundColor: "#FFFFFF",
		marginBottom: 20
	},
	bikeImage: {
		marginBottom: 45,
		height: 280,
		backgroundColor: "#FFFFFF",
		resizeMode: "contain",
		width: "100%"
	},
	bottomFixedPart: {
		position: "relative",
		bottom: 0,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
		// marginTop: 50,
		paddingTop: 50
		// paddingVertical: 15,
	},
	attachButton: {
		borderRadius: 5,
		backgroundColor: "#bababa",
		flexDirection: "row",
		height: 40,
		width: "40%",
		justifyContent: "center",
		alignItems: "center"
	},
	modalContainer: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	modalBikeImage: {
		height: 280,
		backgroundColor: "#FFFFFF",
		resizeMode: "contain",
		width: "100%"
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 10,
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
		width: 60,
		height: 60,
		borderRadius: 30,
	},
	uploadOptionsModal: {
		margin: 0,
		justifyContent: "flex-end",
	},
	uploadOptionsContainer: {
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		backgroundColor: "white",
		paddingBottom: 40
	},
	uploadOptionButton: {
		marginTop: 10,
		width: 300,
		borderWidth: 0.5,
		borderColor: AppTheme.colors.lightGray,
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		justifyContent: "center"
	},
});