import {
	END_CHARGING_SESSION
} from "../actions/chargingActions";

const initialState = {
	endChargingInfo: null
};

const chargingReducer = (state = initialState, action) => {
	switch (action.type) {
		case END_CHARGING_SESSION:
			return { ...state, endChargingInfo: action.payload };
		default:
			return state;
	}
};

export default chargingReducer;
