import { createSelector } from "reselect";

export const getDocumentInfo = createSelector(
	(state) => state.profile,
	(profile) => profile.documentInfo
);
