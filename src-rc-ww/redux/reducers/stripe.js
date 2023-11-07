import {
	SELECTED_PAYMENT_METHOD,
	DETACH_PAYMENT_METHOD,
} from "../actions";

const initialState = {
	paymentMethodInfo: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECTED_PAYMENT_METHOD:
			return { ...state, paymentMethodInfo: action.payload };
		case DETACH_PAYMENT_METHOD:
			return { ...state, paymentMethodInfo: null };
		default:
			return state;
	}
};

export default reducer;
