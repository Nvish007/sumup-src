import { StyleSheet } from "react-native";

export default StyleSheet.create({
	KMDockingPart: {
		paddingHorizontal: 15
	},
	kmDockingCard: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		flexDirection: "row",
		backgroundColor: "#ffffff",
		borderWidth: 1,
		borderColor: "#6fb666",
		borderRadius: 4
	},
	colRight: {
		paddingLeft: 10
	},
	imgBox: {
		flex: 1,
		borderRadius: 4,
		backgroundColor: "#6fb666"
	},
	qIconButton: {
		position: "absolute",
		zIndex: 6,
		top: -6,
		right: 0
	},
	nameTexts: {
		paddingRight: 20,
		fontWeight: "bold",
		fontSize: 16,
		color: "#000000",
		marginBottom: 5
	},
	locationTexts: {
		paddingRight: 35,
		fontWeight: "bold",
		fontSize: 15,
		color: "#636363",
		marginBottom: 5
	},
	colRightButtonPart: {
		marginTop: 5,
		flexDirection: "row"
	},
	bottomColRight: {
		paddingLeft: 5
	},
	bottomColLeft: {
		paddingRight: 5
	},
	availableTexts: {
		textAlign: "center",
		paddingHorizontal: 4,
		paddingVertical: 6,
		borderRadius: 6,
		fontSize: 14,
		fontWeight: "bold",
		color: "#FFFFFF",
		backgroundColor: "#6fb666"
	},
	unAvailableTexts: {
		textAlign: "center",
		paddingHorizontal: 4,
		paddingVertical: 6,
		borderRadius: 6,
		fontSize: 14,
		fontWeight: "bold",
		color: "#FFFFFF",
		backgroundColor: "#d95555"
	},
	unlockButton: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 6,
		backgroundColor: "#000000",
		color: "#FFFFFF"
	},
	unlockText: {
		textAlign: "center",
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 5,
		color: "#FFFFFF"
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0,
		marginBottom: 20
	}
});