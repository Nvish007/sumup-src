import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class CompanyService {
	static scanQR = async(data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("company/login", data);
	}

	static getCompanyInfoSettings = async() => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.get("company/info/settings");
	}

	static getCompanyList = (userId) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.get(`company/list/${userId}`);
	}

	static getCompanySupport = () => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get("company/info/support");
	}
}