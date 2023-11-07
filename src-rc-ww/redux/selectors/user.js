import { createSelector } from "reselect";

export const getUser = createSelector(
	(state) => state.auth,
	(auth) => auth.user
);

export const getUserId = createSelector(
	(state) => state.auth,
	(auth) => auth.user?._id
);

export const getEndUserId = createSelector(
	(state) => state.auth,
	(auth) => auth.endUser?.["objectformunique_id"]
);

export const getUserEmail = createSelector(
	(state) => state.auth,
	(auth) => auth.user?.email
);

export const getUserStatusCode = createSelector(
	(state) => state.auth,
	(auth) => auth.userStatusCode
);

export const getUserVerified = createSelector(
	(state) => state.auth,
	(auth) => auth.userVerified
);

export const getOnBoardingShowed = createSelector(
	(state) => state.auth,
	(auth) => auth.onBoardingShowed
);

export const getUserLinkedWithCompany = createSelector(
	(state) => state.auth,
	(auth) => auth.company
);

export const getUserInfo = createSelector(
	(state) => state.auth,
	(auth) => auth.userInfo
);

export const getLoginMethod = createSelector(
	(state) => state.auth,
	(auth) => auth.method
);

export const getLogoutState = createSelector(
	(state) => state.auth,
	(auth) => auth.logout
);

export const getToken = createSelector(
	(state) => state.auth,
	(auth) => auth.token
);

export const getUserProfilePicture = createSelector(
	(state) => state.auth,
	(auth) => auth.endUser?.["client_detail"]?.["Profile picture"]?.url?.[0]
);

export const getClientGroupImage = createSelector(
	(state) => state.auth,
	(auth) => auth.endUser?.["clientgroup_image"]
);

export const getClientGroupId = createSelector(
	(state) => state.auth,
	(auth) => auth.endUser?.["clientgroup_id"]
);

export const getLanguage = createSelector(
	(state) => state.auth,
	(auth) => auth.endUser?.language
);

export const getUserNumber = createSelector(
	(state) => state.auth,
	(auth) => auth.user?.telephone
);

export const getResetPasswordToken = createSelector(
	(state) => state.auth,
	(auth) => auth.resetPasswordToken
);

export const getTokenRefreshed = createSelector(
	(state) => state.auth,
	(auth) => auth.tokenRefreshed
);

export const getWalkthrough = createSelector(
	(state) => state.auth,
	(auth) => auth.showWalkthrough
);