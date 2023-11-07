import {
	CHANGE_THEME,
} from "src/redux/actions/theme";

const theme = {
	colors: {
		// primary: "#008C44",
		primary: "#578cf7",
		secondary: "#3F6B8E",
		success: "#12681C",
		headerTintColor: "#fff",
		primaryFontColor: "#fff",
		lightGray: "#ABABAB",
		darkGray: "#777777",
		facebookBlue: "#4B66BE",
		darkBlack: "#171717",
		white: "#FFFFFF",
		black: "#000000"
	}
};

function handleTheme(payload) {
	return {
		colors: {
			primary: payload.header_background_color,
			secondary: "#3F6B8E",
			success: "#12681C",
			headerTintColor: "#fff",
			primaryFontColor: payload.font_color_header,
			lightGray: "#ABABAB",
			darkGray: "#777777",
			facebookBlue: "#4B66BE",
			darkBlack: "#171717",
			white: "#FFFFFF",
			black: "#000000"
		}
	};
}

const reducer = (state = theme, action) => {
	switch (action.type) {
		case CHANGE_THEME:
			// return { ...state, theme: action.theme };
			return handleTheme(action.payload);
		default:
			return state;
	}
};

export default reducer;