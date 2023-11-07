import * as apiRequest from "src/redux/api";

export default class MapService {
	static getLocationList = (user, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.get(`location/map?latitude=${user.latitude}&longitude=${user.longitude}&userId=${user.userId}`);
	}
}