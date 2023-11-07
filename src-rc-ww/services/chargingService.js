import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class ChargingService {
	static handleEndCharging = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("chargingpole/endChargingSession", data);
	}
}