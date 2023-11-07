import DamageReportService from "src/services/damageReportService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export function handleDamageReport(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await DamageReportService.handleDamgeReport(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}