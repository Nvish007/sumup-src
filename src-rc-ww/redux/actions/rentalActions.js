import RentalService from "src/services/rentalService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const CAN_CLOSE_RENTAL_SUCCESS = "CAN_CLOSE_RENTAL_SUCCESS";
export const START_RENTAL_SUCCESS = "START_RENTAL_SUCCESS";
export const CANCEL_RENTAL_SUCCESS = "CANCEL_RENTAL_SUCCESS";
export const ON_SELECT_RESERVATION = "ON_SELECT_RESERVATION";
export const END_RENTAL_CAR = "END_RENTAL_CAR";
export const UPDATE_STATE_OF_CAR = "UPDATE_STATE_OF_CAR";

/* CAN CLOSE RENTAL  */
export const canCloseRentalSuccess = (payload) => ({
	type: CAN_CLOSE_RENTAL_SUCCESS,
	payload
});

/* START RENTAL */
export const startRentalSuccess = (payload) => ({
	type: START_RENTAL_SUCCESS,
	payload
});

/* CANCEL RENTAL */
export const cancelRentalSuccess = (payload) => ({
	type: CANCEL_RENTAL_SUCCESS,
	payload
});

export const selectReservation = (payload) => ({
	type: ON_SELECT_RESERVATION,
	payload
});

export const startEndRentalCarSuccess = (payload) => ({
	type: END_RENTAL_CAR,
	payload
});

export const updateStateOfCarSuccess = () => ({
	type: UPDATE_STATE_OF_CAR
});

export function handleCanCloseRental(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.canCloseRental(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleCloseRental() {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.closeRental();
			console.info("res", response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function updateStateOfCar(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.updateStateOfCar(data);
			dispatch(updateStateOfCarSuccess());
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function startRental(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.startRental(data);
			if (response?.data?.rentalId) {
				dispatch(startRentalSuccess(response?.data?.rentalId));
			}
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function endRentalCar(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.endRentalCar(data);
			dispatch(startEndRentalCarSuccess(response?.data?.rentalId));
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function cancelRental(id, callback) {
	return async(dispatch, getState) => {
		try {
			const { rental: { rentalId } } = getState();
			if (rentalId) {
				dispatch(loadingStart());
				await RentalService.cancelRental({ rentalId });
				dispatch(cancelRentalSuccess(null));
				callback();
				dispatch(loadingEnd());
			} else {
				dispatch(loadingStart());
				await RentalService.cancelRental({ rentalId: id });
				dispatch(cancelRentalSuccess(null));
				callback();
				dispatch(loadingEnd());
			}
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function closeCarRental(data, callback) {
	return async(dispatch) => {
		try	{
			dispatch(loadingStart());
			const { data: response } = await RentalService.closeCarRental(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function endRentalFeedback(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.endRentalFeedback(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleCarSteps(callback) {
	return async(dispatch, getState) => {
		try {
			dispatch(loadingStart());
			const { rental: { selectReservationInfo } } = getState();
			const { data: response } = await RentalService.carSteps();
			callback(response?.data, selectReservationInfo);
			dispatch(loadingEnd());
		} catch {
			dispatch(loadingError());
		}
	};
}

export function handleCarFixedKey(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await RentalService.carFixedKey(data);
			console.info("response", response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}