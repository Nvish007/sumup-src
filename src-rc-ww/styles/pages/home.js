import { StyleSheet, Dimensions, Platform } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;

export default StyleSheet.create({
	container: {
		flex: 1
	},
	MainContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: SCREEN_HEIGHT,
		width: SCREEN_WIDTH,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	mapStyle: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	menubar: {
		position: "absolute",
		top: 35,
		left: 15,
		alignSelf: "flex-end",
	},
	sideMenus: {
		flex: 1,
		position: "absolute",
		top: 10,
		left: 10
	},
	kmDockingArea: {
		position: "absolute",
		bottom: 40,
		left: 0,
		right: 0,
		width: "100%",
		zIndex: 999
	},
	markerArea: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		width: "100%",
		zIndex: 999
	},
	userview: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 40,
		width: 40,
		backgroundColor: "white",
		marginBottom: 10,
		borderRadius: 5
	},
	locationview: {
		height: 41.68,
		width: 41.68,
		backgroundColor: AppTheme.colors.white,
		marginBottom: 10,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	locationbutton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	compassIcon: {
		width: 30,
		height: 30,
		resizeMode: "contain"
	},
	helpview: {
		height: 40,
		width: 40,
		backgroundColor: "white",
		borderRadius: 5
	},
	helpbutton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: "#777"
	},
	textBold: {
		fontWeight: "500",
		color: "#000"
	},
	buttonText: {
		fontSize: 21,
		color: "rgb(0,122,255)"
	},
	scanNowButtonPart: {
		position: "absolute",
		zIndex: 9,
		bottom: 40
	},
	menuButton: {
		flex: 1,
		backgroundColor: AppTheme.colors.white,
		width: 41.68,
		height: 41.68,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		position: "absolute",
		top: 10,
		right: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	filterButton: {
		flex: 1,
		backgroundColor: AppTheme.colors.white,
		width: 41.68,
		height: 41.68,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		position: "absolute",
		right: 10,
		...Platform.select({
			ios: {
				top: 105,
			},
			android: {
				top: 80,
			}
		})
	},
	filterIcon: {
		width: 30,
		height: 30,
		resizeMode: "contain"
	},
	navigationBars: {
		flex: 1,
		width: 42,
		height: 42,
		backgroundColor: AppTheme.colors.white,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center"
	},
	sidebarMenuIcon: {
		width: 25,
		height: 25,
		resizeMode: "cover"
	},
	dialpadView: {
		height: 60,
		width: 70,
		position: "absolute",
		top: 100,
		right: 10,
		backgroundColor: "#A0A0A0",
		borderRadius: 5,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	flashlightView: {
		height: 60,
		width: 70,
		position: "absolute",
		top: 100,
		left: 10,
		backgroundColor: "#A0A0A0",
		borderRadius: 5,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	scanButton: {
		borderRadius: 8
	},
	scanButtonText: {
		...commonStyles.buttonText,
	},
	cover: {
		backgroundColor: "rgba(0,0,0,.5)",
	},
	otpSuccessModal: {
		paddingVertical: 22,
		paddingHorizontal: 10,
		backgroundColor: "white",
		width: "100%",
		height: "100%",
		borderRadius: 20,
		alignItems: "center"
	},
	popupOTPtexts: {
		fontWeight: "500",
		fontSize: 14,
		lineHeight: 24,
		color: AppTheme.colors.darkBlack,
		letterSpacing: -0.4,
		marginBottom: 5
	},
	row: {
		flexDirection: "row"
	},
	margin: {
		marginTop: 500
	},
	textView: {
		fontSize: 20,
		fontWeight: "bold"
	}
});