import {
	LOADING_START,
	LOADING_SUCCESSFUL,
	LOADING_ERROR
} from "src/redux/actions/loadingActions";

const initialState = {
	isLoading: false,
	hasLoadingFailed: false,
	loadingError: null,
	loadingText: ""
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_START:
			return { isLoading: true, hasLoadingFailed: false, loadingError: null, loadingText: action.payload };
		case LOADING_SUCCESSFUL:
			return { isLoading: false, hasLoadingFailed: false, loadingError: null, loadingText: "" };
		case LOADING_ERROR:
			return { isLoading: false, hasLoadingFailed: true, loadingError: action.error, loadingText: "" };
		default:
			return state;
	}
};

export default reducer;