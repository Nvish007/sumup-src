import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";

export default class ReservationService {
	static getRentalList = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`user/${userId}/rentals`);
	}

	static rentalGiveFeedback = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/giveFeedback", data);
	}

	static createReservation = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.put("reservation", data);
	}

	static openSentinelLock = (data) => {
		console.log("aaaa");
		const requestInstance = apiRequest.getUnauthenticatedInstance("sentinelService");
		return requestInstance.post("commands/unlock", data);
	}

	static cancelReservation = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("reservation/cancel", data);
	}

	static dockingUnlock = (dockingStationId, data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post(`kingmeter/docking/${dockingStationId}/unlock`, data);
	}

	static openBikeLock = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("kingmeter/smartlock/unlockByAsset", data);
	}

	static handleLocationTypes = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`user/${userId}/locationstypes`);
	}

	static handleUploadCarImages = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("rental/uploadCarPhotos", data);
	}

	static getReservations = (endUserId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.get(`user/${endUserId}/reservations`);
	}

	static searchReservation = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/search/reservation", data);
	}

	static extendReservation = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/extendReservation", data);
	}
}