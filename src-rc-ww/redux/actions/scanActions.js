import { showAlert } from "src/utils/native";
import ScanService from "src/services/scanService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const MOBILTIY_SCAN_QR_SUCCESS = "MOBILTIY_SCAN_QR_SUCCESS";

const serviceType = "sharingService";

/* MOBILITY SCAN ACTIONS */
export const scanSuccess = (payload) => ({
	type: MOBILTIY_SCAN_QR_SUCCESS,
	payload
});

export function scanQRRequested(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: siteInformation } = await ScanService.scanQR(data, serviceType);
			dispatch(scanSuccess(siteInformation?.data));
			dispatch(loadingEnd());
			callback(siteInformation?.data);
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function kmDockingUnlock(data) {
	return async(dispatch) => {
		try {
			const { unlockData, stationId } = data;
			dispatch(loadingStart());
			const { data: response } = await ScanService.kmDockingUnlock(unlockData, stationId);
			showAlert("Success", response.message);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleStartTransaction(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ScanService.startTransaction(data, serviceType);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
			dispatch(loadingError(error));
		}
	};
}

export function handleCarUnlock(data, callback) {
	return async(dispatch, getState) => {
		try {
			// dispatch(loadingStart());
			const { rental: { selectReservationInfo } } = getState();
			const { data: response } = await ScanService.carUnlock(data, serviceType);
			callback(response, selectReservationInfo);
			// dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
			dispatch(loadingError(error));
		}
	};
}

export function handleLockerOpen(data, callback) {
	
	alert('ttt');
	return async(dispatch) => {
		try {
			// dispatch(loadingStart());
			alert('ok');
			const { data: response } = await ScanService.lockerOpen(data, serviceType);
			console.log(data);
			//callback(response);
			// dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
		}
	};
}

export function handleLockerEndRent(data, callback) {
	return async(dispatch) => {
		try {
			// dispatch(loadingStart());
			const { data: response } = await ScanService.lockerEndRent(data, serviceType);
			callback(response);
			// dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
			dispatch(loadingError(error));
		}
	};
}


export function handleAXAkeys(callback) {
	return async(dispatch) => {
		try {
			// dispatch(loadingStart());
			const { data } = await ScanService.getAXAkeys();
			console.info("data", data);
			callback(data);
			// dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
			dispatch(loadingError(error));
		}
	};
}