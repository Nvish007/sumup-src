import { StyleSheet, Dimensions } from "react-native";
import AppTheme from "src/styles/theme";
import { isIOS } from "src/utils/native";

const dimensions = Dimensions.get("window");
const menuTopHeight = Math.round((dimensions.height / 2) - 54);
const menuBottomHeight = Math.round((dimensions.height / 2) + 32);

export default StyleSheet.create({
	drawerContentScrollView: {
		paddingTop: 0,
		backgroundColor: "rgba(255,255,255,0.68)",
		height: "100%"
	},
	drawerContent: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.68)",
		height: "100%"
	},
	userInfoSection: {
		paddingTop: isIOS() ? 67 : 40,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 40,
		height: menuTopHeight,
	},
	drawerSectionBlack: {
		paddingHorizontal: 0,
		paddingTop: 20,
		paddingBottom: 15,
	},
	drawerSectionWhite: {
		paddingHorizontal: 5,
		paddingTop: 20,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30
	},
	drawerMenuProfile: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: "#ffffff",
		marginHorizontal: -5,
		paddingVertical: 4,
		paddingHorizontal: 15,
	},
	menuICon: {
		position: "absolute",
		right: 10
	},
	drawerItemGrey: {
		color: "#FFFFFF",
		fontSize: 14,
		marginLeft: -30
	},
	drawerMenuStyleBlack: {
		marginTop: 0,
		height: 44
	},
	drawerMenuStyle: {
		marginTop: 0,
		height: 44
	},
	drawerItem: {
		color: "#FFFFFF",
		fontSize: 12
	},
	drawerBottomItem: {
		marginLeft: 0,
		color: "#000000",
		fontSize: 16
	},
	backButton: {
		marginBottom: 22
	},
	backArrowIcon: {
		width: 20,
		height: 18,
		resizeMode: "cover"
	},
	profileSection: {
		flexDirection: "column",
		justifyContent: "center",
		marginBottom: 10,
		position: "relative",
		alignItems: "center",
	},
	title: {
		flexDirection: "row",
		justifyContent: "center",
		textAlign: "center",
		color: "#000",
		opacity: 0.87,
		fontSize: 18,
		lineHeight: 27,
		fontFamily: AppTheme.fonts.PoppinsMedium,
	},
	profileImage: {
		width: 97,
		height: 97,
		borderWidth: 3,
		// borderColor: "#008C44",
		borderColor: AppTheme.colors.primary,
		borderRadius: 100
	},
	editIcon: {
		width: 32,
		height: 32,
		borderRadius: 100,
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#F4F4F4",
		position: "relative",
		top: -36,
		zIndex: 9,
		marginRight: -60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	editImage: {
		width: 13,
		height: 13
	},
	customerCareIcon: {
		width: 62,
		height: 62,
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 100,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: 30,
		top: -30
	},
	customerCareImage: {
		width: 33,
		height: 33,
	},
	listScrollView: {
		height: menuBottomHeight,
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	menuList: {
		height: 45,
		marginLeft: 0,
		paddingRight: 0,
		borderBottomWidth: 0
	},
	MenuListMain: {
		marginBottom: 30
	},
	menuListLogout: {
		// marginTop: 28,
		marginBottom: 28,
	},
	menuIcon: {
		width: 20,
		height: 20,
		resizeMode: "cover",
		marginRight: 20
	},
	LogoutIcon: {
		width: 22,
		height: 22,
		resizeMode: "cover",
		marginRight: 18
	},
	menuText: {
		fontSize: 16,
		lineHeight: 20,
		height: 45,
		fontFamily: AppTheme.fonts.DMSansMedium,
		color: "#6C707B"
	},
	logoutText: {
		fontSize: 16,
		lineHeight: 20,
		height: 45,
		fontFamily: AppTheme.fonts.DMSansMedium,
		color: "#FF5959"
	},
	rightArrowIcon: {
		width: 7,
		height: 12,
		marginTop: -20,
		resizeMode: "cover",
	},
	rightRedArrowIcon: {
		color: "#F91B1B",
		fontSize: 18,
		fontWeight: "900"
	}
});