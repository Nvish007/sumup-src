import { createSelector } from "reselect";

export const getSiteInformation = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation
);

export const getStationId = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation?.station?.stationId
);

export const getLocationName = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation?.location?.name
);

export const getAvailability = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation?.available
);

export const getStationDbId = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation?.station?._id
);

export const getCarName = createSelector(
	(state) => state.scan,
	(scan) => scan.siteInformation?.car?.name
);