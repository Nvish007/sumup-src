import { store } from "src/redux/store";

// eslint-disable-next-line prefer-destructuring
const theme = store.getState().theme;

console.log('theme::: ', theme);

export const AppTheme = {
	colors: {
		primary: theme.colors.primary,
		secondary: theme.colors.secondary,
		success: theme.colors.success,
		headerTintColor: theme.colors.headerTintColor,
		fontColor: theme.colors.fontColor,
		lightGray: theme.colors.lightGray,
		darkGray: theme.colors.darkGray,
		facebookBlue: theme.colors.facebookBlue,
		darkBlack: theme.colors.darkBlack,
		white: theme.colors.white,
		black: theme.colors.black
	},
	fonts: {
		PoppinsRegular: "Poppins-Regular",
		PoppinsMedium: "Poppins-Medium",
		PoppinsSemiBold: "Poppins-SemiBold",
		PoppinsItalic: "Poppins-Italic",
		DMSansRegular: "DMSans-Regular",
		DMSansMedium: "DMSans-Medium",
		DMSansBold: "DMSans-Bold"
	}
};

export default AppTheme;