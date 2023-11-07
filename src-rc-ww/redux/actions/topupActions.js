import TopupService from "src/services/topupService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const TOP_UP_LIST_SUCCESS = "TOP_UP_LIST_SUCCESS";
export const SELECTED_TOP_UP = "SELECTED_TOP_UP";
export const TOP_UP_LOADER = "TOP_UP_LOADER";

export const topupListSuccess = (payload) => ({
	type: TOP_UP_LIST_SUCCESS,
	payload
});

export const selectedTopup = (payload) => ({
	type: SELECTED_TOP_UP,
	payload
});

export const setTopupLoader = (payload) => ({
	type: TOP_UP_LOADER,
	payload
});

export function getTopupList(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await TopupService.getTopupList(data);
			dispatch(topupListSuccess(response?.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function addTopupToUserWallet(callback) {
	return async(dispatch, getState) => {
		try {
			dispatch(loadingStart());
			const { topup: { selectedTopup: usedTopup }, auth: { endUser } } = getState();
			const data = { userId: endUser.objectformunique_id, topupId: usedTopup.id };
			const { data: response } = await TopupService.addTopupToUserWallet(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}