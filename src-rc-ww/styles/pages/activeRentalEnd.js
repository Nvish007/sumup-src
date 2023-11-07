import { StyleSheet } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

export default StyleSheet.create({
	container: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingVertical: 57,
		alignItems: "center",
		paddingHorizontal: 70,
	},
	message: {
		...commonStyles.header1,
		fontFamily: AppTheme.fonts.PoppinsSemiBold,
		lineHeight: 30,
		marginBottom: 0,
		textAlign: "center",
		color: "#00380D",
		letterSpacing: -0.3,
	},
	thumbsUpImage: {
		width: 89,
		height: 86,
		resizeMode: "cover",
		marginBottom: 5,
		marginTop: 50
	}
});