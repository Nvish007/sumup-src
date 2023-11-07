import AuthService from "src/services/authService";
import OnBoardingService from "src/services/onBoardingService";
// import { deleteToken } from "src/utils/firebase";
import { translate } from "src/locales/i18n";
import { showAPIErrorAlert } from "src/utils/native";
import { KeyValueStore } from "src/utils/KeyValueStore";
import { Alert } from "react-native";
import { loadingStart, loadingEnd, loadingError, loadingFailed } from "./loadingActions";
import { companyOnBoardingInfoSuccess } from "./onBoardingActions";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const COMPANY_LOGIN_SUCCESS = "COMPANY_LOGIN_SUCCESS";
export const COMPANY_LOGIN_FOR_TOKEN_SUCCESS = "COMPANY_LOGIN_FOR_TOKEN_SUCCESS";
export const RESET_AUTH_STATE = "RESET_AUTH_STATE";
export const VERIFIED_MOBILE_NUMBER = "VERIFIED_MOBILE_NUMBER";
export const VALID_OTP = "VALID_OTP";
export const UPDATE_USER_STATUS = "UPDATE_USER_STATUS";
export const ON_BOARDING_SHOWED = "ON_BOARDING_SHOWED";
export const DEEP_LINK_SUCCESS = "DEEP_LINK_SUCCESS";
export const GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS";
export const FACEBOOK_LOGIN_SUCCESS = "FACEBOOK_LOGIN_SUCCESS";
export const APPLE_LOGIN_SUCCESS = "APPLE_LOGIN_SUCCESS";
export const USER_LINKED_TO_COMPANY_SUCCESS = "USER_LINKED_TO_COMPANY_SUCCESS";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_TOKEN = "RESET_PASSWORD_TOKEN";
export const TOKEN_REFRESH_START = "TOKEN_REFRESH_START";
export const TOKEN_REFRESH_END = "TOKEN_REFRESH_END";
export const SHOW_WALKTHROUGH = "SHOW_WALKTHROUGH";

/* REGISTRATION ACTIONS */
export const registrationSuccess = (data) => ({
	type: REGISTRATION_SUCCESS,
	data
});

/* LOGIN ACTIONS */
export const logInSuccess = (data) => ({
	type: LOG_IN_SUCCESS,
	data
});

/* COMPANY LOGIN ACTIONS */
export const companyLoginSuccess = (data) => ({
	type: COMPANY_LOGIN_SUCCESS,
	data
});

/* COMPANY LOGIN FOR TOKEN ACTIONS */
export const companyLoginForTokenSuccess = (data) => ({
	type: COMPANY_LOGIN_FOR_TOKEN_SUCCESS,
	data
});

/* USER LINKED TO COMPANY SUCCESS */
export const userLinkedToCompanySuccess = (data) => ({
	type: USER_LINKED_TO_COMPANY_SUCCESS,
	data
});

/* RESET AUTH STATE ACTIONS */
export const resetAuthState = () => ({
	type: RESET_AUTH_STATE
});

/* Verify Mobile Number Actions */
export const verifiedMobileNumber = (data) => ({
	type: VERIFIED_MOBILE_NUMBER,
	data
});

/* USER STATUS CODE (50, 60, 100) */
export const updateUserStatus = (data) => ({
	type: UPDATE_USER_STATUS,
	data
});

/* OTP Actions */
export const validOtp = (data) => ({
	type: VALID_OTP,
	data
});

/* ON_BOARDING ACTIONS */
export const onBoardingShowed = () => ({
	type: ON_BOARDING_SHOWED
});

/* DEEP LINK ACTIONS */
export const deepLinkSuccess = (data) => ({
	type: DEEP_LINK_SUCCESS,
	data
});

/* Google ACTIONS */
export const googleLoginSuccess = (data) => ({
	type: GOOGLE_LOGIN_SUCCESS,
	data
});

/* Facebook ACTIONS */
export const facebookLoginSuccess = (data) => ({
	type: FACEBOOK_LOGIN_SUCCESS,
	data
});

/* Apple ACTIONS */
export const appleLoginSuccess = (data) => ({
	type: APPLE_LOGIN_SUCCESS,
	data
});

/* UPDATE PROFILE PICTURE */
export const updateProfilePicture = (data) => ({
	type: UPDATE_PROFILE_PICTURE,
	data
});

/* FORGOT PASSWORD ACTION */
export const forgotPasswordSuccess = (data) => ({
	type: FORGOT_PASSWORD_SUCCESS,
	data
});

/* RESET PASSWORD TOKEN */
export const resetPasswordToken = (data) => ({
	type: RESET_PASSWORD_TOKEN,
	data
});

/* TOKEN REFRESH ACTIONS */
export const tokenRefreshStart = () => ({
	type: TOKEN_REFRESH_START
});

export const tokenRefreshEnd = () => ({
	type: TOKEN_REFRESH_END
});

export function byPassLoginForTest() {
	return (dispatch) => {
		dispatch(logInSuccess({ email: "test@gmail.com" }));
	};
}

export const showWalkthrough = (data) => ({
	type: SHOW_WALKTHROUGH,
	data
});

export function handleLogIn(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleLogin(data);
			const { data: { user, company, endUser, method } } = response;
			dispatch(logInSuccess({ user, endUser, method, company }));
			/* updating app language from api response */
			// if (endUser?.language) {
			// 	setLanguage(endUser.language);
			// }
			dispatch(showWalkthrough(true));
			if (company && endUser) {
				const endUserId = endUser?.["objectformunique_id"];
				const { data: res } = await AuthService.checkUserAccess(endUserId);
				if (res?.data?.userAccess === false) {
					Alert.alert(translate("alert.expired"));
				} else if (endUser.onboarding === "0") {
					/* if onboarding === 0 means we will not show onboarding screen to user */
					const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
					dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
					dispatch(onBoardingShowed());
				} else {
					/* if onboarding === 1 means we will show onBoarding screen to user */
					const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
					dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
					const { data: onBoardingResponse } = await OnBoardingService.handleCompanyInfoOnBoarding({ userId: endUser?.["objectformunique_id"], validated: user?.validated });
					dispatch(companyOnBoardingInfoSuccess(onBoardingResponse?.data));
					callback(response.data);
				}
			} else {
				callback(response.data);
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingFailed(error));
			showAPIErrorAlert(error);
		}
	};
}

export function handleRegistration(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleRegistration(data);
			const { data: { user, company, endUser, method } } = response;
			dispatch(registrationSuccess({ user, endUser, method, company }));
			dispatch(showWalkthrough(true));
			if (company && endUser?.onboarding === "0") {
				/* if onboarding === 0 means we will not show onboarding screen to user */
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				dispatch(onBoardingShowed());
			} else if (company && endUser?.onboarding === "1") {
				/* if onboarding === 1 means we will show onBoarding screen to user */
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				const { data: onBoardingResponse } = await OnBoardingService.handleCompanyInfoOnBoarding({ userId: endUser?.["objectformunique_id"], validated: user?.validated });
				dispatch(companyOnBoardingInfoSuccess(onBoardingResponse?.data));
				callback(response?.data);
			} else {
				/* if company = false and endUser = null user will navigated to company list screen */
				callback(response?.data);
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleRequestOtp(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			await AuthService.handleRequestOtp({
				"telephone": `${data.countryCode}${data.mobileNumber}`
			});
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleVerifyOtp(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleVerifyOTP(data);
			if (response?.data?.code === 1 && response?.data?.verify) {
				/* Valid OTP update user state in auth reducer */
				dispatch(validOtp(response?.data?.user));
			}
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleLogout(EndUserId, serviceType) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			await AuthService.deleteTokenFromDevice(EndUserId, serviceType);
			KeyValueStore.deleteItem("checkDate");
			dispatch(resetAuthState());
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleVerifyMobileNumber(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleVerifyMobileNumber(data);
			console.log('data:: ', data);
			dispatch(updateUserStatus(response?.data?.code));
			if (response?.data?.code === 100 || response?.data?.code === 60) {
				/* user is validated */
				dispatch(verifiedMobileNumber(response?.data?.user));
			}
			dispatch(loadingEnd());
			callback(response);
		} catch (error) {
			console.log('error:: ', error);
			dispatch(loadingError(error));
		}
	};
}

export function handleDeepLinkVerification(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleDeepLink(data);
			if (response?.data?.user) {
				dispatch(deepLinkSuccess(response?.data?.user));
			}
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			callback("404");
			console.info(error);
			dispatch(loadingEnd());
			// dispatch(loadingError(error));
		}
	};
}

export function handleSocialLoginVerification(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleSocialLogin(data);
			const { data: { user, company, endUser, method } } = response;
			dispatch(logInSuccess({ user, endUser, method, company }));
			if (company && endUser.onboarding === "0") {
				/* onboarding screen will not show to user */
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				dispatch(onBoardingShowed());
			} else if (company && endUser.onboarding === "1") {
				/* onboarding screen will shown to user */
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				const { data: onBoardingResponse } = await OnBoardingService.handleCompanyInfoOnBoarding({ userId: endUser?.["objectformunique_id"], validated: user?.validated });
				dispatch(companyOnBoardingInfoSuccess(onBoardingResponse?.data));
				callback(response.data);
			} else {
				callback(response.data);
			}
			dispatch(loadingEnd());
		} catch (error) {
			if (error.response?.status === 401) {
				callback(error.response?.status);
			} else {
				dispatch(loadingError(error));
				showAPIErrorAlert(error);
			}
		}
	};
}

export function handleGoogleVerification(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			dispatch(googleLoginSuccess(data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleFacebookVerification(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			dispatch(facebookLoginSuccess(data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleAppleVerification(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			dispatch(appleLoginSuccess(data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleLinkUserToCompany(data, serviceType, callback) {
	return async(dispatch, getState) => {
		try {
			dispatch(loadingStart());
			/* Getting token from user service and update in redux store */
			const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: data.identifier }, serviceType);
			dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
			const { data: response } = await AuthService.handleLinkUserToCompany(data.userId);
			dispatch(userLinkedToCompanySuccess({ company: response?.data?.company, endUser: response?.data?.endUser }));
			/* Getting token from sharing service and update in redux store */
			const { data: companyLoginSharing } = await AuthService.handleCompanyLoginForToken({ identifier: data.identifier }, "sharingService");
			dispatch(companyLoginForTokenSuccess(companyLoginSharing?.data?.token));
			if (response?.data?.endUser?.onboarding === "0") {
				dispatch(onBoardingShowed());
			} else {
				const { auth: { user } } = getState();
				const { data: onBoardingResponse } = await OnBoardingService.handleCompanyInfoOnBoarding({ userId: response?.data?.endUser?.["objectformunique_id"], validated: user?.validated });
				dispatch(companyOnBoardingInfoSuccess(onBoardingResponse?.data));
				callback(response);
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleCompanyLogin(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.handleCompanyLogin(data);
			const { data: { user, company, endUser, method } } = response;
			dispatch(companyLoginSuccess({ user, company, endUser, method }));
			if (company && endUser.onboarding === "0") {
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				dispatch(onBoardingShowed());
			} else if (company && endUser.onboarding === "1") {
				const { data: companyLogin } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
				dispatch(companyLoginForTokenSuccess(companyLogin?.data?.token));
				const { data: onBoardingResponse } = await OnBoardingService.handleCompanyInfoOnBoarding({ userId: endUser?.["objectformunique_id"], validated: user?.validated });
				dispatch(companyOnBoardingInfoSuccess(onBoardingResponse?.data));
				callback(response.data);
			} else {
				callback(response.data);
			}
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleCompanyLoginForToken(callback) {
	return async(dispatch, getState) => {
		try {
			dispatch(loadingStart());
			dispatch(tokenRefreshStart());
			const { auth: { company } } = getState();
			const { data: response } = await AuthService.handleCompanyLoginForToken({ identifier: company.identifier }, "sharingService");
			dispatch(companyLoginForTokenSuccess(response?.data?.token));
			dispatch(tokenRefreshEnd());
			callback();
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function onBoardingPhoneVerification(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.onBoardingPhoneVerification(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function forgotPassword(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.forgotPassword(data);
			const userInfo = { _id: response?.data?.userId, telephone: response?.data.telephone, ...data };
			dispatch(forgotPasswordSuccess(userInfo));
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function forgotPasswordOtpVerification(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.forgotPasswordOtpVerification(data);
			dispatch(resetPasswordToken(response?.data?.token));
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function resetPassword(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.resetPassword(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function checkUserAccess(data, callback) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await AuthService.checkUserAccess(data);
			callback(response);
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}