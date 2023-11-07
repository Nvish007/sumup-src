import OnBoardingService from "src/services/onBoardingService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const COMPANY_ON_BOARDING_INFO_SUCCESS = "COMPANY_ON_BOARDING_INFO_SUCCESS";
export const USER_DETAILS = "USER_DETAILS";

/* COMPANY ONBOARDING SUCCESS */
export const companyOnBoardingInfoSuccess = (data) => ({
	type: COMPANY_ON_BOARDING_INFO_SUCCESS,
	data
});

export const saveUserDetails = (data) => ({
	type: USER_DETAILS,
	data
});

export function saveOnBoardingInfo(userId, data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await OnBoardingService.saveOnBoardingInfo(userId, data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function uploadOnBoardingDocument(userId, data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await OnBoardingService.uploadOnBoardingDocument(userId, data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function updateUserOnBoardingStatus() {
	return async(dispatch, getState) => {
		try {
			const { auth: { endUser } } = getState();
			const data = { userId: endUser?.["objectformunique_id"], status: 0 };
			dispatch(loadingStart());
			await OnBoardingService.updateUserOnBoardingStatus(data);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function saveAddressInfo(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await OnBoardingService.saveAddressInfo(data);
			console.info(response);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleUserDetails(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await OnBoardingService.getUserDetails(data);
			dispatch(saveUserDetails(response.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}