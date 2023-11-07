import { createSelector } from "reselect";

export const getAllTopup = createSelector(
	(state) => state.topup,
	(topup) => topup.topupList?.topups
);

export const getWalletAmount = createSelector(
	(state) => state.topup,
	(topup) => topup.topupList?.wallet
);