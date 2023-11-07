import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	modal: {
		flex: 1,
		backgroundColor: "white",
		margin: 0,
		marginHorizontal: 0,
		marginBottom: 0,
		justifyContent: "flex-start",
	},
	modalFlagImage: {
		width: 30,
		height: 30,
		borderRadius: 100,
		marginRight: 20
	},
	modalLanguageText: {
		color: "#000",
		fontSize: 18,
		lineHeight: 27,
		fontFamily: AppTheme.fonts.DMSansMedium
	},
	languageList: {
		height: 60,
		marginLeft: 0,
		paddingRight: 0,
		borderBottomWidth: 0
	},
	modalScrollView: {
		paddingTop: 110,
		paddingHorizontal: 25,
		paddingBottom: 62,
		marginTop: 20
	},
	backArrowIcon: {
		width: 18,
		height: 15,
		resizeMode: "cover"
	},
	screenFixHeader: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		paddingVertical: 20,
		zIndex: 5,
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		height: 64,
		backgroundColor: AppTheme.colors.white
	},
	headerText: {
		...commonStyles.header1,
		lineHeight: 27,
		textAlign: "center",
		letterSpacing: -0.3,
		color: AppTheme.colors.fontColor,
		position: "relative",
		zIndex: 9
	},
	backButton: {
		position: "absolute",
		left: 15,
	}
});