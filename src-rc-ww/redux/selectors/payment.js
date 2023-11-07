import { createSelector } from "reselect";

export const getPaymentInfo = createSelector(
	(state) => state.payment,
	(payment) => payment.paymentInfo
);

export const getReferralCode = createSelector(
	(state) => state.payment,
	(payment) => payment?.referralCodeResponse?.["referral_code"]
);