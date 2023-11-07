import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class DamageReportService {
	static handleDamgeReport = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("damage/add", data);
	}
}