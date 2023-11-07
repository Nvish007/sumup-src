import {
	LOCATION_LIST_SUCCESS,
	CREATE_RESERVATION_SUCCESS,
	MQTT_UPDATE_LOCATION,
	SET_SELECTED_LOCATION,
	USER_CURRENT_LOCATION,
	FLEET_TYPE_CAR,
} from "../actions";

const initialState = {
	locationList: {},
	locationDetails: {},
	currentLocation: {},
	fleetTypeCar: false,
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOCATION_LIST_SUCCESS:
			return { ...state, locationList: action.payload };
		case CREATE_RESERVATION_SUCCESS:
			return { ...state, locationList: { ...state.locationList, reservation: { ...action.payload } } };
		case SET_SELECTED_LOCATION:
			return { ...state, locationDetails: action.payload };
		case USER_CURRENT_LOCATION:
			return { ...state, currentLocation: action.payload };
		case MQTT_UPDATE_LOCATION: {
			return onLocationUpdate(state, action);
		}
		case FLEET_TYPE_CAR: {
			return { ...state, fleetTypeCar: action.payload };
		}
		default:
			return state;
	}
};

function onLocationUpdate(state, action) {
	const index = state.locationList.locationsData.findIndex((locationData) => locationData.location._id === action.payload._id);
	let locationsData = [...state.locationList.locationsData];
	let locationDetails = { ...state.locationDetails };
	if (index > -1) {
		locationsData[index].ebike = action.payload.ebike;
		if (locationDetails?.location?._id === action.payload._id) {
			locationDetails = {
				...locationDetails,
				ebike: action.payload.ebike
			};
		}
	}
	return { ...state, locationList: { ...state.locationList, locationsData: [...locationsData] }, locationDetails: locationDetails };
}

export default mapReducer;