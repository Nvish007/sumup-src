import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class TopupService {
	static getTopupList = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`user/${userId}/topups`);
	}

	static addTopupToUserWallet = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/addTopup/toWallet", data);
	}
}