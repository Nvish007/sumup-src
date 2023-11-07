import * as apiRequest from "src/redux/api";

const serviceTypeUser = "userService";

export default class AuthService {
	static handleVerifyMobileNumber = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/telephone/check", data);
	}

	static handleLogin = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/login", data);
	};

	static handleCompanyLogin = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/companylogin", data);
	}

	static handleCompanyLoginForToken = (data, serviceType) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceType);
		return requestInstance.post("company/login", data);
	}

	static handleLinkUserToCompany = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.put(`company/action/link/${userId}`);
	}

	static handleRegistration = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/register", data);
	};

	static handleRequestOtp = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/otp/request", data);
	}

	static handleForgotPassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance();
		return requestInstance.post("auth/forgot-password", data);
	};

	static handleVerifyOTP = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/otp/validate", data);
	};

	static handleLogout = () => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.get("user/logout");
	};

	static saveFirebaseToken = (userId, data, serviceType) => {
		// console.log(data);
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.put(`user/${userId}/token`, data);
	};

	static deleteFirebaseToken = (userId) => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.delete(`user/${userId}/token`);
	};

	static handleDeepLink = (data) => {
		const requestInstance = apiRequest.getAuthenticatedInstance();
		return requestInstance.post("auth/deeplink/", data);
	};

	static handleSocialLogin = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/social/validate", data);
	}

	static deleteTokenFromDevice = (EndUserId, serviceType) => {
		const requestInstance = apiRequest.getAuthenticatedInstance(serviceType);
		return requestInstance.delete(`user/${EndUserId}/token`);
	};

	static onBoardingPhoneVerification = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/onBoardingPhoneVerification", data);
	}

	static forgotPassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/forgotPassword", data);
	}

	static forgotPasswordOtpVerification = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/verifyOtp/forgotPassword", data);
	}

	static resetPassword = (data) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.post("auth/resetPassword", data);
	}

	static checkUserAccess = (userId) => {
		const requestInstance = apiRequest.getUnauthenticatedInstance(serviceTypeUser);
		return requestInstance.get(`auth/checkUserAccess/${userId}`);
	}
}