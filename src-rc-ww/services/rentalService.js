import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class RentalService {
	static canCloseRental = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/canClose", data);
	}

	static closeRental = () => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/close");
	}

	static updateStateOfCar = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/updateRental", data);
	}

	static startRental = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/createRental", data);
	}

	static endRentalCar = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("car/endRental", data);
	}

	static cancelRental = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/cancelRental", data);
	}

	static closeCarRental = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/closeCar", data);
	}

	static endRentalFeedback = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/endFeedback", data);
	}

	static carSteps = () => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get("company/info/carSteps");
	}

	static carFixedKey = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("car/fixedKey", data);
	}
}