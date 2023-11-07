import { createSelector } from "reselect";

export const getEndChargingInfo = createSelector(
	(state) => state.charging,
	(charging) => charging.endChargingInfo
);