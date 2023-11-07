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
		borderRadius: 10,
		shadowColor: "#C1C1C1",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.6,
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	carDetails: {
		flexDirection: "column",
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
	padding: {
		paddingVertical: 10
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
		color: "#008C44",
		opacity: 0.87,
		marginTop: 3
	},
	carBlog: {
		flexDirection: "row",
		marginBottom: 5,
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
	center: {
		justifyContent: "center",
		paddingVertical: "50%"
	},
	margin: {
		padding: 30,
		marginLeft: 20
	},
	buttonTextsStyle: {
		...commonStyles.buttonText,
	},
	confirmButton: {
		width: "40%",
		borderRadius: 8,
		backgroundColor: AppTheme.colors.primary,
		height: 44,
		margin: 10
	},
	noReservationFound: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15
	},
	button: {
		backgroundColor: "#008C44",
		borderRadius: 10,
		height: 47,
		width: "50%"
	},
});