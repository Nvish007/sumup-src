import {
	GET_DOCUMENT
} from "../actions";

const initialState = {
	documentInfo: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOCUMENT:
			return { ...state, documentInfo: action.payload };
		default:
			return state;
	}
};

export default reducer;