import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 5,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		flexGrow: 1
	},
	appLogoContainer: {
		height: 100,
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 0,
		marginTop: 30
	},
	textInputContainer: {
		paddingTop: 0,
		paddingHorizontal: 20,
		width: "100%"
	},
	buttonContainer: {
		paddingTop: 15,
		paddingHorizontal: 20,
		width: "100%",
	},
	OrView: {
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	socialLoginContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
	loginContainer: {
		marginTop: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 30
	},
	loginText: {
		color: "#3F6B8E",
		flexDirection: "column"
	},
	formContainer: {
		width: "100%"
	}
});