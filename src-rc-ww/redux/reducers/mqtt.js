import {
	DOCKING_UNLOCK_SUCCESS,
	DOCKING_UNLOCK_FAIL,
	RENTAL_END,
	RESET_MQTT_STATE,
	CAR_RIDE_STATUS
} from "../actions";

const initialState = {
	dockingUnlockSuccess: false,
	dockingUnlockFail: false,
	rentalEnd: false,
	carRideStatus: {}
};

const mqtt = (state = initialState, action) => {
	switch (action.type) {
		case DOCKING_UNLOCK_SUCCESS:
			return { ...state, dockingUnlockSuccess: true };
		case DOCKING_UNLOCK_FAIL:
			return { ...state, dockingUnlockFail: true };
		case RENTAL_END:
			return { ...state, rentalEnd: true };
		case CAR_RIDE_STATUS:
			return { ...state, carRideStatus: action.payload };
		case RESET_MQTT_STATE:
			return initialState;
		default:
			return state;
	}
};

export default mqtt;