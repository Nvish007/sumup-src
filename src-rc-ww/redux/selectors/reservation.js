import { createSelector } from "reselect";

export const getRentalList = createSelector(
	(state) => state.reservation,
	(reservation) => reservation.rentalList
);

export const getSelectedRent = createSelector(
	(state) => state.reservation,
	(reservation) => reservation.selectedRent
);

export const getLocationAndFleets = createSelector(
	(state) => (state.reservation),
	(reservation) => reservation.locationAndFleetTypes,
);

export const getMyReservationList = createSelector(
	(state) => state.reservation,
	(reservation) => reservation.myReservations
);

export const getAvailableReservations = createSelector(
	(state) => state.reservation,
	(reservation) => reservation.availableReservations
);
