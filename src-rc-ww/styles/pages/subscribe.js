import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";

export default StyleSheet.create({
	subscribeMainView: {
		flex: 1
	},
	subscribeScrollView: {
		paddingHorizontal: 15,
		marginTop: 20,
		marginBottom: 70,
	},
	subscribeListView: {
		flexDirection: "row",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#bdbdbd",
	},
	listsTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: "#000000"
	},
	listsSubTexts: {
		fontSize: 14,
		color: AppTheme.colors.primary
	},
	listsDetails: {
		fontSize: 14,
		color: "#000000"
	},
	listingContent: {
		fontSize: 16,
		color: "#bdbdbd",
		textAlign: "right"
	},
	checkBoxStyleCol: {
		marginTop: 5,
		alignItems: "center"
	},
	renewedTexts: {
		fontSize: 13,
		paddingVertical: 5,
		color: "#5d5d5d"
	},
	bottomFixedPart: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		paddingHorizontal: 15,
		backgroundColor: "#f2f2f2"
	},
	cancelSubTexts: {
		fontSize: 14,
		marginBottom: 20,
		color: "#5d5d5d"
	},
	cancelSubButton: {
		marginBottom: 15,
	}
});