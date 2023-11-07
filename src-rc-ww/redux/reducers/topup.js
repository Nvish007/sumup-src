import {
	TOP_UP_LIST_SUCCESS,
	SELECTED_TOP_UP,
	TOP_UP_LOADER
} from "../actions";

const initialState = {
	topupList: null,
	selectedTopup: null,
	loader: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TOP_UP_LIST_SUCCESS:
			return { ...state, topupList: action.payload };
		case SELECTED_TOP_UP:
			return { ...state, selectedTopup: action.payload };
		case TOP_UP_LOADER:
			return { ...state, loader: action.payload };
		default:
			return state;
	}
};

export default reducer;