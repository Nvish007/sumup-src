import ProfileService from "src/services/profileService";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";
import { updateProfilePicture } from "./authActions";

export const GET_DOCUMENT = "GET_DOCUMENT";

export const onGetDocument = (payload) => ({
	type: GET_DOCUMENT,
	payload
});

export function uploadProfilePicture(data, profilePictureUri) {
	return async(dispatch, getState) => {
		try {
			const { auth: { endUser } } = getState();
			dispatch(loadingStart());
			await ProfileService.uploadProfilePicture(endUser.objectformunique_id, data);
			dispatch(updateProfilePicture(profilePictureUri));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function updatePassword(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ProfileService.updatePassword(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function getDocument(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ProfileService.getDocument(data);
			dispatch(onGetDocument(response.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function deleteDocument(userId, data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await ProfileService.deleteDocument(userId, data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}