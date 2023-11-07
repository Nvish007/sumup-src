import * as authActions from "./authActions";

export default function resetAuthActions() {
	return (dispatch) => {
		dispatch(authActions.resetAuthState());
	};
}