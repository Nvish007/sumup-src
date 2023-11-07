
import PaymentService from "src/services/paymentService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const PAYMENT_LIST = "PAYMENT_LIST";
export const REFERRAL_CODE_RESPONSE = "REFERRAL_CODE_RESPONSE";

export const onPaymentList = (payload) => ({
	type: PAYMENT_LIST,
	payload
});

export const referralCodeResponse = (payload) => ({
	type: REFERRAL_CODE_RESPONSE,
	payload
});

export function handlePaymentList(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: { data: response } } = await PaymentService.handlePaymentList(data);
			dispatch(onPaymentList(response));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleVoucherCode(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await PaymentService.handleVoucherCode(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleReferralCode(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: { data: response } } = await PaymentService.handleReferralCode(data);
			dispatch(referralCodeResponse(response));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}