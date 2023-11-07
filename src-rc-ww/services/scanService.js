import * as apiRequest from "src/redux/api";

export default class ScanService {
	static scanQR = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("mobility/scanQr", data);
	}

	static kmDockingUnlock = (data, stationId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.post(`kingmeter/docking/${stationId}/unlock`, data);
	}

	static startTransaction = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("chargingpole/starttransaction", data);
	}

	static carUnlock = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("car/unlock", data);
	}

	static carLock = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.post("car/lock", data);
	}

	static getAXAkeys = (deviceName) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance("bleService");
		return requestInstance.get(`?name=${deviceName}`);
	};

	static lockerOpen = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance("sharingService");
		return requestInstance.post("mobility/locker/open", data);
	}

	static lockerEndRent = (data, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance("sharingService");
		return requestInstance.post("mobility/locker/endrent", data);
	}
}