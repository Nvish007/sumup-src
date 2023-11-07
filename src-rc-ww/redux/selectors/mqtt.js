import { createSelector } from "reselect";

export const getDockingUnlockSuccess = createSelector(
	(state) => state.mqtt,
	(mqtt) => mqtt.dockingUnlockSuccess
);

export const getDockingUnlockFail = createSelector(
	(state) => state.mqtt,
	(mqtt) => mqtt.dockingUnlockFail
);

export const getRentalEnd = createSelector(
	(state) => state.mqtt,
	(mqtt) => mqtt.rentalEnd
);

export const getCarRideStatus = createSelector(
	(state) => state.mqtt,
	(mqtt) => mqtt.carRideStatus
);