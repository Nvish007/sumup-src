import ReservationService from "src/services/reservationService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";
import { createReservationSuccess } from "./mapActions";

export const RENTAL_LIST_SUCCESS = "RENTAL_LIST_SUCCESS";
export const ON_SELECT_RENT = "ON_SELECT_RENT";
export const LOCATION_AND_FLEET_TYPES = "LOCATION_AND_FLEET_TYPES";
export const ON_LOCATION_TYPES = "ON_LOCATION_TYPES";
export const ON_FLEET_TYPES = "ON_FLEET_TYPES";
export const MY_RESERVATIONS_SUCCESS = "MY_RESERVATIONS_SUCCESS";
export const SEARCH_RESERVATION_SUCCESS = "SEARCH_RESERVATION_SUCCESS";
export const LOCATE_RESERVATION = "LOCATE_RESERVATION";
export const RESET_LOCATE_RESERVATION = "RESET_LOCATE_RESERVATION";

/* RENTALS ACTIONS */
export const rentalListSuccess = (payload) => ({
	type: RENTAL_LIST_SUCCESS,
	payload
});

export const selectRent = (payload) => ({
	type: ON_SELECT_RENT,
	payload
});

export const onLoactionAndFleetTypes = (payload) => ({
	type: LOCATION_AND_FLEET_TYPES,
	payload
});

export const onLoactionTypes = (payload) => ({
	type: ON_LOCATION_TYPES,
	payload
});

export const onFleetTypes = (payload) => ({
	type: ON_FLEET_TYPES,
	payload
});

export const myReservationSuccess = (payload) => ({
	type: MY_RESERVATIONS_SUCCESS,
	payload
});

export const searchReservationSuccess = (payload) => ({
	type: SEARCH_RESERVATION_SUCCESS,
	payload
});

/* LOCATE RESERVATION ACTIONS */
export const locateReservation = (payload) => ({
	type: LOCATE_RESERVATION,
	payload
});

export const resetLocateReservation = (payload) => ({
	type: RESET_LOCATE_RESERVATION,
	payload
});

export function handleRentalList(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: { data: rentalList } } = await ReservationService.getRentalList(data);
			dispatch(rentalListSuccess(rentalList));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleRentalGiveFeedback(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: { data: response } } = await ReservationService.rentalGiveFeedback(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleCreateReservation(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.createReservation(data);
			callback(response);
			if (data?.["fleet_type"] === "ebike") {
				dispatch(createReservationSuccess(response?.data?.reservation));
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleOpenSentinelLock(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			console.log("cccc");
			const { data: response } = await ReservationService.openSentinelLock(data);
			callback(response);
			if (data?.["fleet_type"] === "ebike") {
				dispatch(createReservationSuccess(response?.data?.reservation));
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function cancelReservation(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.cancelReservation(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleDockingUnlock(dockingStationId, data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart);
			const { data: response } = await ReservationService.dockingUnlock(dockingStationId, data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleOpenBikeLock(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart);
			const { data: response } = await ReservationService.openBikeLock(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleLocationTypes(data) {
	// console.info(data);
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.handleLocationTypes(data);
			dispatch(onLoactionAndFleetTypes(response.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleUploadCarImages(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.handleUploadCarImages(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function getMyReservations() {
	return async(dispatch, getState) => {
		try {
			dispatch(loadingStart());
			const { auth: { endUser } } = getState();
			const { data: response } = await ReservationService.getReservations(endUser.objectformunique_id);
			if (response.data) {
				dispatch(myReservationSuccess(response.data));
			} else {
				dispatch(myReservationSuccess([]));
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function searchReservation(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.searchReservation(data);
			if (response?.data?.length > 0) {
				dispatch(searchReservationSuccess(response?.data));
			}
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function extendReservation(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ReservationService.extendReservation(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}