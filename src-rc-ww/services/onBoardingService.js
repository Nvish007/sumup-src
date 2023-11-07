import * as apiRequest from "src/redux/api";

const serviceType = "sharingService";

export default class OnBoardingService {
	static handleCompanyInfoOnBoarding = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("company/info/onboarding", data);
	}

	static saveOnBoardingInfo = (userId, data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post(`user/${userId}/saveOnboarding`, data);
	}

	static uploadOnBoardingDocument = (userId, data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post(`user/${userId}/uploadDocument`, data);
	}

	static updateUserOnBoardingStatus = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("user/updateOnBoardingStatus", data);
	}

	static saveAddressInfo = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("user/updateAddress", data);
	}

	static getUserDetails = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.get(`user/${userId}`);
	}
}