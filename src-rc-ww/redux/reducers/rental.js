import {
	CAN_CLOSE_RENTAL_SUCCESS,
	START_RENTAL_SUCCESS,
	CANCEL_RENTAL_SUCCESS,
	ON_SELECT_RESERVATION,
	UPDATE_STATE_OF_CAR
} from "../actions";

const initialState = {
	result: [],
	rentalId: null,
	selectReservationInfo: {},
	isRentCancel: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CAN_CLOSE_RENTAL_SUCCESS:
			return { ...state, result: action.payload };
		case START_RENTAL_SUCCESS:
			return { ...state, rentalId: action.payload };
		case CANCEL_RENTAL_SUCCESS:
			return { ...state, rentalId: action.payload, isRentCancel: !initialState.isRentCancel };
		case ON_SELECT_RESERVATION:
			return { ...state, selectReservationInfo: action.payload };
		case UPDATE_STATE_OF_CAR:
			return { ...state, rentalId: null };
		default:
			return state;
	}
};

export default reducer;
