import { StyleSheet } from "react-native";

export default StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingHorizontal: 25
	},
	selectCompanyTitle: {
		paddingTop: 100,
		fontSize: 28,
		fontWeight: "bold",
		color: "#505050",
		paddingLeft: 0
	},
	companyListContainer: {
		paddingHorizontal: 0
	},
	companyContainer: {
		marginTop: 10,
		width: "100%",
		height: 75,
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: "row"
	},
	companyImage: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	companyDetails: {
		flex: 1.5
	},
	logo: {
		width: 80,
		height: 80,
		resizeMode: "contain"
	},
	companyName: {
		paddingTop: 30,
		fontSize: 15,
		fontWeight: "bold"
	},
	companyIconsContainer: {
		flexDirection: "row"
	},
	companyCycleIcon: {
		paddingTop: 5
	},
	companyCarIcon: {
		paddingTop: 5,
		paddingLeft: 30
	}
});