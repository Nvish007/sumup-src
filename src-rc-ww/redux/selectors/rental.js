import { createSelector } from "reselect";

export const getRentalResult = createSelector(
	(state) => state.rental,
	(rental) => rental.result
);

export const getRentalId = createSelector(
	(state) => state.rental,
	(rental) => rental.rentalId
);

export const getSelectedReservation = createSelector(
	(state) => state.rental,
	(rental) => rental.selectReservationInfo
);

export const getIsRentCancel = createSelector(
	(state) => state.rental,
	(rental) => rental.isRentCancel
);