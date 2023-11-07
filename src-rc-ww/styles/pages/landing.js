import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: "white",
	},
	container: {
		position: "relative",
		display: "flex",
		paddingHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		paddingBottom: 60,
	},
	appLogoContainer: {
		height: 80,
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 25,
		marginTop: 80
	},
	logo: {
		width: 180,
		height: 80,
		resizeMode: "contain"
	},
	formContainer: {
		width: "100%",
		paddingHorizontal: 0,
		marginTop: 0
	},
	mainTitle: {
		...commonStyles.Title,
		color: AppTheme.colors.fontColor,
		fontWeight: "500",
		marginBottom: 3,
		opacity: 0.8,
	},
	mainDescription: {
		...commonStyles.regular,
		color: AppTheme.colors.fontColor,
		marginBottom: 10,
		opacity: 0.6
	},
	countryFlagIcon: {
		height: 21,
		width: 34,
		marginRight: 5,
		resizeMode: "contain"
	},
	phoneNumberTitle: {
		...commonStyles.caption,
		paddingLeft: 20,
		paddingTop: 30,
		color: AppTheme.colors.fontColor,
		marginBottom: 5,
		opacity: 0.8
	},
	phoneInputButton: {
		backgroundColor: AppTheme.colors.white,
		height: 50,
		borderRadius: 5,
		borderWidth: 0.5
	},
	phoneInputIcons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	phoneIcon: {
		color: AppTheme.colors.fontColor,
		paddingLeft: 18,
		paddingRight: 10
	},
	phoneNumberText: {
		...commonStyles.regular1,
		paddingLeft: 15,
		color: AppTheme.colors.darkBlack,
		opacity: 0.6
	},
	underLineText: {
		position: "relative",
		borderBottomWidth: 1,
		borderBottomColor: AppTheme.colors.primary,
		height: 20,
		marginVertical: 20,
		width: "100%"
	},
	OrText: {
		...commonStyles.caption1,
		textAlign: "center",
		position: "absolute",
		top: 10,
		left: "40%",
		right: 0,
		flex: 1,
		width: 50,
		color: AppTheme.colors.primary,
		backgroundColor: AppTheme.colors.white
	},
	phoneInput: {
		paddingHorizontal: 0
	},
	buttonContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		paddingVertical: 20,
		paddingHorizontal: 25,
		backgroundColor: AppTheme.colors.white
	},
	arrowRightIcon: {
		position: "absolute",
		top: 32,
		right: 40
	},
	error: {
		color: "red",
		marginTop: 5,
		fontSize: 15,
	},
	socialLinksContainer: {
		flex: 1,
		width: "100%",
		flexDirection: "column",
		paddingTop: 20
	},
	socialLinks: {
		marginBottom: 20,
		height: 44,
		width: "100%",
		flex: 1,
		borderRadius: 8,
		borderWidth: 1,
		paddingLeft: "23%",
		flexDirection: "row",
		alignItems: "center",
	},
	socialLinksIMG: {
		height: 18,
		width: 18,
		resizeMode: "cover",
		marginRight: 8,
	},
	socialLinksIcon: {
		marginRight: 8,
		width: 18,
		marginLeft: 2
	},
	socialLinksText: {
		...commonStyles.caption2,
		paddingRight: 0,
		letterSpacing: -0.4,
	},
	socialFBText: {
		color: AppTheme.colors.facebookBlue
	},
	socialLinksFB: {
		borderColor: AppTheme.colors.facebookBlue
	},
	socialGoogleText: {
		color: AppTheme.colors.darkGray
	},
	socialLinksGoogle: {
		borderColor: AppTheme.colors.darkGray
	},
	companyLogin: {
		marginTop: 10,
		flexDirection: "row"
	},
	companyAccountText: {
		...commonStyles.caption3,
		letterSpacing: -0.2,
	},
	LogInHereText: {
		...commonStyles.caption3,
		letterSpacing: -0.2,
		paddingLeft: 5,
		color: AppTheme.colors.primary
	}
});