import {
	REGISTRATION_SUCCESS,
	LOG_IN_SUCCESS,
	COMPANY_LOGIN_SUCCESS,
	COMPANY_LOGIN_FOR_TOKEN_SUCCESS,
	RESET_AUTH_STATE,
	VERIFIED_MOBILE_NUMBER,
	VALID_OTP,
	UPDATE_USER_STATUS,
	ON_BOARDING_SHOWED,
	DEEP_LINK_SUCCESS,
	GOOGLE_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_SUCCESS,
	APPLE_LOGIN_SUCCESS,
	USER_LINKED_TO_COMPANY_SUCCESS,
	UPDATE_PROFILE_PICTURE,
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_TOKEN,
	TOKEN_REFRESH_START,
	TOKEN_REFRESH_END,
	SHOW_WALKTHROUGH,
} from "../actions";

const initialState = {
	user: null,
	endUser: null,
	company: null,
	token: null,
	userStatusCode: null,
	userInfo: null,
	userVerified: false,
	onBoardingShowed: false,
	logout: false,
	resetPasswordToken: null,
	tokenRefreshed: false,
	showWalkthrough: false
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case REGISTRATION_SUCCESS:
			return { ...state, user: action.data.user, endUser: action.data.endUser, method: action.data.method, company: action.data.company, userVerified: true, tokenRefreshed: true };
		case LOG_IN_SUCCESS:
			return { ...state, user: action.data.user, endUser: action.data.endUser, method: action.data.method, company: action.data.company, userVerified: true, tokenRefreshed: true };
		case COMPANY_LOGIN_SUCCESS:
			return { ...state, user: action.data.user, endUser: action.data.endUser, method: action.data.method, company: action.data.company, userVerified: true, tokenRefreshed: true };
		case COMPANY_LOGIN_FOR_TOKEN_SUCCESS:
			return { ...state, token: action.data };
		case RESET_AUTH_STATE:
			return { ...initialState, logout: true };
		case VERIFIED_MOBILE_NUMBER:
			return { ...state, user: action.data };
		case VALID_OTP:
			return { ...state, user: action.data };
		case UPDATE_USER_STATUS:
			return { ...state, userStatusCode: action.data };
		case ON_BOARDING_SHOWED:
			return { ...state, onBoardingShowed: true };
		case DEEP_LINK_SUCCESS:
			return { ...state, user: action.data };
		case GOOGLE_LOGIN_SUCCESS:
			return { ...state, userInfo: action.data };
		case FACEBOOK_LOGIN_SUCCESS:
			return { ...state, userInfo: action.data };
		case APPLE_LOGIN_SUCCESS:
			return { ...state, userInfo: action.data };
		case USER_LINKED_TO_COMPANY_SUCCESS:
			return { ...state, company: action.data.company, endUser: action.data.endUser };
		case FORGOT_PASSWORD_SUCCESS:
			return { ...state, user: { ...state.user, ...action.data } };
		case RESET_PASSWORD_TOKEN:
			return { ...state, resetPasswordToken: action.data };
		case UPDATE_PROFILE_PICTURE: {
			let endUser = { ...state.endUser };
			// console.log("endUser", endUser.client_detail);
			if (endUser && endUser.client_detail && endUser.client_detail["Profile picture"]) {
				endUser.client_detail["Profile picture"].url = [action.data];
			} else {
				endUser.client_detail["Profile picture"] = {
					"fieldtype": "Imagemanager",
					"file_name": [],
					"url": [action.data],
					"value": []
				};
			}
			return { ...state, endUser };
		}
		case TOKEN_REFRESH_START:
			return { ...state, tokenRefreshed: false };
		case TOKEN_REFRESH_END:
			return { ...state, tokenRefreshed: true };
		case SHOW_WALKTHROUGH:
			return { ...state, showWalkthrough: action.data };
		default:
			return state;
	}
};

export default authReducer;
