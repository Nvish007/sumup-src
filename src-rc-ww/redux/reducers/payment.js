import {
	PAYMENT_LIST,
	REFERRAL_CODE_RESPONSE,
} from "../actions";

const initialState = {
	paymentInfo: [],
	referralCodeResponse: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case PAYMENT_LIST:
			return { ...state, paymentInfo: action.payload };
		case REFERRAL_CODE_RESPONSE:
			return { ...state, referralCodeResponse: action.payload };
		default:
			return state;
	}
};

export default reducer;