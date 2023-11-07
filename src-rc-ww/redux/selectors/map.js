import { createSelector } from "reselect";

export const getLocationList = createSelector(
	(state) => state.map,
	(map) => map.locationList?.locationsData
);

export const getActiveReservation = createSelector(
	(state) => state.map,
	(map) => map.locationList?.reservation
);

export const getActiveRental = createSelector(
	(state) => state.map,
	(map) => map.locationList?.rental
);

export const getLocationDetails = createSelector(
	(state) => state.map,
	(map) => map.locationDetails
);

export const getFleetTypeCar = createSelector(
	(state) => state.map,
	(map) => map.fleetTypeCar
);

export const getActiveCharging = createSelector(
	(state) => state.map,
	(map) => map.locationList.charging
);