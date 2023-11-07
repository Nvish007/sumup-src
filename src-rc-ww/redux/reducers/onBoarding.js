import Config from "react-native-config";
import {
	COMPANY_ON_BOARDING_INFO_SUCCESS,
	USER_DETAILS
} from "../actions";

const initialState = {
	onBoardingInfo: null,
	userDetails: null,
	stripePublishableKey: Config.STRIPE_PUBLISHABLE_KEY
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case COMPANY_ON_BOARDING_INFO_SUCCESS: {
			const previousState = { ...state };
			if (action.data?.stripe) {
				previousState.stripePublishableKey = action.data.stripe;
			}
			return { ...previousState, onBoardingInfo: action.data };
		}
		case USER_DETAILS:
			return { ...state, userDetails: action.data };
		default:
			return state;
	}
};

export default reducer;