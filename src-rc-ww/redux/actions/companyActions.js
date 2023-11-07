import CompanyService from "src/services/companyService";
import { showAlert } from "src/utils/native";
import { KeyValueStore } from "src/utils/KeyValueStore";
import { resetAuthState } from "./authActions";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";
import { updateTheme } from "./theme";

export const QR_SCAN_SUCCESS = "QR_SCAN_SUCCESS";
export const COMPANY_INFO_SUCCESS = "COMPANY_INFO_SUCCESS";
export const COMPANY_SETTINGS_SUCCESS = "COMPANY_SETTINGS_SUCCESS";
export const COMPANY_DESIGN_SUCCESS = "COMPANY_DESIGN_SUCCESS";
export const RESET_COMPANY = "RESET_COMPANY";
export const COMPANY_API_URL = "COMPANY_API_URL";
export const COMPANY_REGISTRATION_SUCCESS = "COMPANY_REGISTRATION_SUCCESS";
export const COMPANY_LIST_SUCCESS = "COMPANY_LIST_SUCCESS";
export const COMPANY_SUPPORT_SUCCESS = "COMPANY_SUPPORT_SUCCESS";

/* QR CODE ACTIONS */
export const qrScanSuccess = (data) => ({
	type: QR_SCAN_SUCCESS,
	data
});

/* COMPANY DETAILS ACTIONS */
export const companyInfoSuccess = (data) => ({
	type: COMPANY_INFO_SUCCESS,
	data
});

/* COMPANY SETTING ACTIONS */
export const companySettingsSuccess = (data) => ({
	type: COMPANY_SETTINGS_SUCCESS,
	data
});

/* COMPANY DESIGN SETTINGS ACTIONS */
export const companyDesignSuccess = (data) => ({
	type: COMPANY_DESIGN_SUCCESS,
	data
});

/* COMPANY LIST ACTIONS */
export const companyListSuccess = (data) => ({
	type: COMPANY_LIST_SUCCESS,
	data
});

export const resetCompany = () => ({
	type: RESET_COMPANY
});

export const setCompanyApiUrl = (data) => ({
	type: COMPANY_API_URL,
	data
});

export const companyRegistrationSuccess = (data) => ({
	type: COMPANY_REGISTRATION_SUCCESS,
	data
});

/* COMPANY SUPPORT ACTION */
export const companySupportSuccess = (data) => ({
	type: COMPANY_SUPPORT_SUCCESS,
	data
});

/* This function will scan QR code and get company Information as well */
export function scanQRAndGetCompanyInfo(data) {
	return async(dispatch) => {
		try {
			const { identifier } = data;
			dispatch(loadingStart());
			const { data: scanQRResult } = await CompanyService.scanQR(data);
			dispatch(qrScanSuccess(scanQRResult.data));
			if (scanQRResult.success) {
				await KeyValueStore.setItem("token", scanQRResult.data.token);
				await KeyValueStore.setItem("identifier", identifier);
				const { data: company } = await CompanyService.getCompanyInfoSettings();
				if (company.success) {
					const { data: { companyInfo, companyDesign, companySettings, registration } } = company;
					dispatch(companyDesignSuccess(companyDesign));
					dispatch(updateTheme(companyDesign));
					dispatch(companySettingsSuccess(companySettings));
					dispatch(companyInfoSuccess(companyInfo));
					dispatch(companyRegistrationSuccess(registration));
					dispatch(loadingEnd());
				} else {
					dispatch(loadingEnd());
					showAlert("Error", company.message);
				}
			} else {
				dispatch(loadingEnd());
				showAlert("Error", scanQRResult.message);
			}
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function scanCompanyQR(data) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: scanQRResult } = await CompanyService.scanQR(data);
			dispatch(qrScanSuccess(scanQRResult.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function exitCompany() {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			await KeyValueStore.clear();
			dispatch(resetCompany());
			dispatch(resetAuthState());
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleGetCompanyList(userId) {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await CompanyService.getCompanyList(userId);
			dispatch(companyListSuccess(response?.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function handleGetCompanySupport() {
	return async(dispatch) => {
		try {
			dispatch(loadingStart());
			const { data: response } = await CompanyService.getCompanySupport();
			dispatch(companySupportSuccess(response.data));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}