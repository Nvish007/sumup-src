import { StyleSheet, Dimensions } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	flexContainer: {
		flex: 1
	},
	imageBackground: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	welcomeScreenlogoView: {
		flex: 1,
		alignItems: "center"
	},
	ScreenLogo: {
		width: 200,
		height: 60,
		marginTop: 50,
	},
	appLogoContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	descriptionContainer: {
		marginHorizontal: 25
	},
	learningTitle: {
		color: "black",
		fontSize: 24,
		marginTop: 15,
		textAlign: "center",
	},
	smallDescription: {
		color: "black",
		fontSize: 14,
		textAlign: "center",
		marginTop: 5,
		marginBottom: 20,
	},
	buttonContainer: {
		paddingTop: 15,
		paddingHorizontal: 20,
		width: "100%",
		marginTop: 0
	},
	viewPager: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	dotStyleContainer: {
		// alignItems: "center",
		// justifyContent: "center",
		// position: "absolute",
		// left: 0,
		// right: 0,
		// bottom: 40,
		// flexDirection: "column",
		marginBottom: 30
	},
	dotStyleList: {
		flexDirection: "row",
		alignItems: "center"
	},
	dotStyle: {
		borderColor: AppTheme.colors.primary,
		backgroundColor: "#FFF",
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		width: 10,
		height: 10,
		borderRadius: 30,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0,
		paddingLeft: 0
	}
});