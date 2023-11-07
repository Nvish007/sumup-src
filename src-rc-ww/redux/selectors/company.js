import { createSelector } from "reselect";

export const getCompanyInfo = createSelector(
	(state) => state.company,
	(company) => company.companyInfo
);

export const getCompanyLogo = createSelector(
	(state) => state.company,
	(company) => company.design?.logo
);

export const getCompanyTemplate = createSelector(
	(state) => state.company,
	// eslint-disable-next-line camelcase
	(company) => company.settings?.template_name
);

export const getEnableRegistration = createSelector(
	(state) => state.company,
	(company) => company.registration?.enableRegistration
);

export const getCompanyDesign = createSelector(
	(state) => state.company,
	(company) => company.design
);

export const getCompanySettings = createSelector(
	(state) => state.company,
	(company) => company.settings
);

export const getCompanyRegistration = createSelector(
	(state) => state.company,
	(company) => company.registration
);

export const getQRScannedData = createSelector(
	(state) => state.company,
	(company) => company.qrScanData
);

export const getCompanyList = createSelector(
	(state) => state.company,
	(company) => company.companyList
);

export const getCompanySupport = createSelector(
	(state) => state.company,
	(company) => company.support
);