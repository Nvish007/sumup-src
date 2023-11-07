import { createSelector } from "reselect";

export const getPaymentMethodInfo = createSelector(
	(state) => state.stripe,
	(stripe) => stripe.paymentMethodInfo
);