import { combineReducers } from "redux";
import auth from "./authReducer";
import loading from "./loading";
import company from "./company";
import theme from "./theme";
import map from "./map";
import scan from "./scan";
import reservation from "./reservation";
import onBoarding from "./onBoarding";
import mqtt from "./mqtt";
import profile from "./profile";
import rental from "./rental";
import topup from "./topup";
import payment from "./payment";
import stripe from "./stripe";
import charging from "./charging";

export default combineReducers({
	auth,
	company,
	loading,
	theme,
	map,
	scan,
	reservation,
	onBoarding,
	mqtt,
	profile,
	rental,
	topup,
	payment,
	stripe,
	charging
});
