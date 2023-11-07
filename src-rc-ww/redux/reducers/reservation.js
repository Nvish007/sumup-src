import {
	RENTAL_LIST_SUCCESS,
	ON_SELECT_RENT,
	LOCATION_AND_FLEET_TYPES,
	MY_RESERVATIONS_SUCCESS,
	SEARCH_RESERVATION_SUCCESS,
	LOCATE_RESERVATION,
	RESET_LOCATE_RESERVATION,
} from "../actions";

const initialState = {
	rentalList: [],
	selectedRent: {},
	locationAndFleetTypes: {},
	myReservations: [],
	availableReservations: [],
	showReservationLocation: false,
	selectedReservationLocation: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case RENTAL_LIST_SUCCESS:
			return { ...state, rentalList: action.payload };
		case ON_SELECT_RENT:
			return { ...state, selectedRent: action.payload };
		case LOCATION_AND_FLEET_TYPES:
			return { ...state, locationAndFleetTypes: action.payload };
		case MY_RESERVATIONS_SUCCESS:
			return { ...state, myReservations: action.payload };
		case SEARCH_RESERVATION_SUCCESS:
			return { ...state, availableReservations: action.payload };
		case LOCATE_RESERVATION:
			return { ...state, showReservationLocation: true, selectedReservationLocation: action.payload };
		case RESET_LOCATE_RESERVATION:
			return { ...state, showReservationLocation: false, selectedReservationLocation: {} };
		default:
			return state;
	}
};

export default reducer;
