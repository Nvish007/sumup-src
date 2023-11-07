import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";
const serviceTypeUser = "userService";

export default class ProfileService {
	static uploadProfilePicture = (objectFormUniqueId, data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post(`user/${objectFormUniqueId}/uploadProfilePicture`, data);
	}

	static updatePassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/updatepassword", data);
	};

	static getDocument = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`user/getDocumentsById/${data}`);
	}

	static deleteDocument = (objectFormUniqueId, data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post(`user/deleteDocumentById/${objectFormUniqueId}`, data);
	}
}