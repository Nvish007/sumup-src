import {
	QR_SCAN_SUCCESS,
	COMPANY_INFO_SUCCESS,
	COMPANY_SETTINGS_SUCCESS,
	COMPANY_DESIGN_SUCCESS,
	COMPANY_API_URL,
	COMPANY_REGISTRATION_SUCCESS,
	RESET_COMPANY,
	COMPANY_SUPPORT_SUCCESS,
	COMPANY_LIST_SUCCESS,
} from "../actions/companyActions";

const initialState = {
	qrScanData: null,
	companyInfo: null,
	settings: null,
	design: null,
	registration: null,
	apiUrl: null,
	support: null,
	companyList: []
};

const companyReducer = (state = initialState, action) => {
	switch (action.type) {
		case QR_SCAN_SUCCESS:
			return { ...state, qrScanData: action.data };
		case COMPANY_INFO_SUCCESS:
			return { ...state, companyInfo: action.data };
		case COMPANY_SETTINGS_SUCCESS:
			return { ...state, settings: action.data };
		case COMPANY_DESIGN_SUCCESS:
			return { ...state, design: action.data };
		case COMPANY_API_URL:
			return { ...state, apiUrl: action.data };
		case COMPANY_REGISTRATION_SUCCESS:
			return { ...state, registration: action.data };
		case 	COMPANY_SUPPORT_SUCCESS:
			return { ...state, support: action.data };
		case COMPANY_LIST_SUCCESS:
			return { ...state, companyList: action.data };
		case RESET_COMPANY:
			return initialState;
		default:
			return state;
	}
};

export default companyReducer;
