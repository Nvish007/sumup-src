import ChargingService from "src/services/chargingService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const END_CHARGING_SESSION = "END_CHARGING_SESSION";

export const onEndCharging = (payload) => ({
	type: END_CHARGING_SESSION,
	payload
});

export function handleEndCharging(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ChargingService.handleEndCharging(data);
			dispatch(onEndCharging(response?.data));
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}