import { StyleSheet } from "react-native";

export default StyleSheet.create({
	walktroughComponentMain: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	zeekIconText: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignContent: "center",
		position: "absolute",
		top: 25,
		left: 15
	},
	zeekText: {
		marginLeft: 5,
		fontSize: 14,
		color: "#fff"
	},
	skipButtonPart: {
		position: "absolute",
		top: 55,
		left: 15
	},
	skipButtonTexts: {
		fontSize: 18,
		color: "#fff"
	},
	walktroughContentPart: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingTop: 60,
		marginBottom: 15
	},
	logoImagePart: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 25
	},
	logoImage: {
		width: 200,
		height: 60
	},
	screenTitle: {
		color: "#fff",
		marginTop: 0,
		fontWeight: "bold",
		fontSize: 16,
		paddingHorizontal: 10
	},
	screenContent: {
		paddingHorizontal: 10,
		marginTop: 10,
		color: "#fff",
		fontSize: 16
	},
	doneButtonPart: {
		position: "absolute",
		right: 15,
	},
	doneButtonText: {
		fontSize: 18,
		bottom: 5,
		color: "#fff"
	}
});