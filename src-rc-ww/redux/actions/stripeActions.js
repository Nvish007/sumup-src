import StripeService from "src/services/stripeService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";

export const SELECTED_PAYMENT_METHOD = "SELECTED_PAYMENT_METHOD";
export const DETACH_PAYMENT_METHOD = "DETACH_PAYMENT_METHOD";

export const selectedPaymentMethod = (payload) => ({
	type: SELECTED_PAYMENT_METHOD,
	payload
});

export const onDetachPaymentMethod = () => ({
	type: DETACH_PAYMENT_METHOD
});

export function createCustomer(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await StripeService.createCustomer(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function createSetupIntent(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await StripeService.createSetupIntent(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function createPaymentIntent(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart(data.text));
			const { data: response } = await StripeService.createPaymentIntent(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleConfirmPayment(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart(data.text));
			const { data: response } = await StripeService.confirmPayment(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			console.info(error);
			dispatch(loadingError(error));
		}
	};
}

export function handleGetPaymentMethod(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: { data: response } } = await StripeService.getPaymentMethod(data);
			dispatch(selectedPaymentMethod(response));
			dispatch(loadingEnd());
		} catch (error) {
			console.info("error", error);
			// dispatch(loadingError(error));
		}
	};
}

export function handleDetachPaymentMethod(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await StripeService.detachPaymentMethod(data);
			dispatch(onDetachPaymentMethod());
			console.info("Response from action", response);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handlePaymentId(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await StripeService.updatePaymentId(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}