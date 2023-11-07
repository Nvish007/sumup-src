import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	safeView: {
		flex: 1,
		backgroundColor: "white"
	},
	reservationsScrollView: {
		paddingHorizontal: 20,
		paddingTop: 20
	},
	myReservationList: {
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 5,
		elevation: 5,
		marginBottom: 43,
	},
	carDetails: {
		flexDirection: "row",
		marginTop: 15,
		marginBottom: 5,
		paddingHorizontal: 32
	},
	carImage: {
		width: 116,
		height: 106,
		marginRight: 35,
		resizeMode: "cover"
	},
	bikeImage: {
		width: 116,
		height: 106,
		marginRight: 35,
		resizeMode: "cover"
	},
	chargingImage: {
		width: 80,
		height: 100,
		marginRight: 35,
		resizeMode: "cover"
	},
	carTitle: {
		...commonStyles.regular4,
		color: "#000000",
		opacity: 0.87,
	},
	carModelText: {
		...commonStyles.caption10,
		color: "#000000",
		opacity: 0.87,
	},
	locationText: {
		...commonStyles.caption10,
		color: "#000000",
		opacity: 0.87,
	},
	locationDate: {
		...commonStyles.caption10,
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		marginTop: 3
	},
	carBlog: {
		flexDirection: "row",
		marginBottom: 35,
		paddingHorizontal: 15,
		justifyContent: "space-between"
	},
	carBlogInner: {
		backgroundColor: "#F8F8F8",
		borderRadius: 4.56193,
		width: "30%",
		height: 61,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 3
	},
	searchIcon: {
		width: 18,
		height: 18,
		resizeMode: "cover",
		marginBottom: 3
	},
	editIcon: {
		width: 18,
		height: 18,
		resizeMode: "cover",
		marginBottom: 3
	},
	detailsIcon: {
		width: 18,
		height: 18,
		resizeMode: "cover",
		marginBottom: 3
	},
	carBlogTitle: {
		fontSize: 12,
		lineHeight: 18,
		fontFamily: AppTheme.fonts.PoppinsRegular,
		color: "#000000",
		opacity: 0.87,
		letterSpacing: -0.273716,
		marginBottom: 0
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	confirmButton: {
		width: "100%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		height: 44
	},
	noReservationFound: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15
	},
	clickText: {
		...commonStyles.caption7,
		// color: "#008C44",
		color: AppTheme.colors.primary,
		opacity: 0.87,
		// textAlign: "center",
		// paddingHorizontal: 80,
	},
	container: {
		backgroundColor: AppTheme.colors.white,
		paddingTop: 25,
		paddingBottom: 35,
		borderRadius: 20,
		paddingHorizontal: 20,
		width: "100%"
	},
	titleText: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 60,
		marginBottom: 25
	},
	titleText2: {
		...commonStyles.header2,
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		textAlign: "center",
		paddingHorizontal: 15,
		marginBottom: 25
	},
	button: {
		// backgroundColor: "#008C44",
		backgroundColor: AppTheme.colors.primary,
		borderRadius: 8,
		height: 47,
	},
	closeIcon: {
		position: "absolute",
		top: 10,
		right: 15
	}
});