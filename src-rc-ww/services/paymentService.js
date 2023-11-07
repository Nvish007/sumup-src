import * as apiRequest from "src/redux/api";

const serviceTypeSharing = "sharingService";
// const serviceTypeUser = "userService";

export default class PaymentService {
	static handlePaymentList = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/getPayments", data);
	}

	static handleVoucherCode = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/consumeVoucher", data);
	}

	static handleReferralCode = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceTypeSharing);
		return requestInstance.post("user/getReferralCode", data);
	}
}