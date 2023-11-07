import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black"
	},
	backButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		margin: 5,
		position: "absolute",
		top: 50,
		right: 20,
		zIndex: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	buttonText: {
		fontSize: 21,
	},
	QRscannerBottomButton: {
		padding: 16,
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 20
	},
	scannerBtns: {
		width: 60,
		height: 48,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		backgroundColor: "rgba(255,255,255,0.5)",
		marginHorizontal: 15
	},
	keyboardIcon: {
		width: 30,
		height: 30,
		resizeMode: "contain"
	}
});