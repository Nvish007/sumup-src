import {
	MOBILTIY_SCAN_QR_SUCCESS
} from "../actions/scanActions";

import {
	RESET_AUTH_STATE
} from "../actions/authActions";

const initialState = {
	siteInformation: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case MOBILTIY_SCAN_QR_SUCCESS:
			return { ...state, siteInformation: action.payload };
		case RESET_AUTH_STATE:
			return initialState;
		default:
			return state;
	}
};

export default reducer;