import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class StripeService {
	static createCustomer = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/createCustomer", data);
	}

	static createSetupIntent = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/createSetupIntent", data);
	}

	static createPaymentIntent = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/createPaymentIntent", data);
	}

	static confirmPayment = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/confirmPaymentIntent", data);
	}

	static getPaymentMethod = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`stripe/getPaymentMethod/${userId}`);
	}

	static detachPaymentMethod = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/detachPaymentMethod", data);
	}

	static updatePaymentId = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("stripe/updatePayment", data);
	}
}