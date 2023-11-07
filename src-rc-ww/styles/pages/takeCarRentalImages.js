import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 20
	},
	safeView: {
		flex: 1,
		backgroundColor: AppTheme.colors.white
	},
	title: {
		...commonStyles.regular,
		textAlign: "center"
	},
	cameraIconContainer: {
		marginTop: 30,
		alignItems: "center"
	},
	cameraIcon: {
		width: 300,
		height: 250,
		resizeMode: "contain"
	},
	imageResult: {
		marginTop: 30
	},
	horizontalLine: {
		borderBottomColor: "#D3D3D3",
		borderBottomWidth: 2
	},
	imageTitle: {
		...commonStyles.regular4,
		textAlign: "center",
		marginTop: 10
	},
	imageContainer: {
		flexDirection: "row",
		justifyContent: "space-around"
	},
	imageSection: {
		flexDirection: "row"
	},
	imageSectionTitle1: {
		marginRight: 20
	},
	singleImageContainer: {
		flexDirection: "column"
	},
	carIcon: {
		width: 70,
		height: 70,
		resizeMode: "contain",
		marginLeft: 10
	},
	carImage: {
		height: 110,
		width: 120
	},
	singleImageContainerTitle: {
		paddingTop: 10,
		color: "#808080",
		marginLeft: 20
	},
	lastHorizontalLine: {
		marginTop: 20
	},
	verifyButtonContainer: {
		backgroundColor: AppTheme.colors.white,
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
	buttonContainer: {
		paddingTop: 15,
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
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
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
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
	message: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#2ea166",
		letterSpacing: -0.3,
	},
	popUpContainer: {
		backgroundColor: "white",
		paddingVertical: 40,
		paddingHorizontal: 25,
		borderRadius: 20,
		alignItems: "center"
	},
	OkayButton: {
		width: 250,
		borderRadius: 8,
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		height: 49,
		marginTop: 30,
		marginBottom: 0
	},
	thumbIcon: {
		width: 67,
		height: 69,
		marginTop: 25
	},
});