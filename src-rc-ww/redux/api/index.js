import axios from "axios";
import Config from "react-native-config";
import { store } from "../store";
import { getDeviceUniqueId } from "../../utils/native";

export function getAPIUrl(type) {
	let url;
	switch (type) {
		case "sharingService":
			url = Config.SHARING_API_URL;
			break;
		case "userService":
			url = Config.API_URL;
			break;
		case "sentinelService":
			url = "https://ms-dev.wowconnect.be:3009/";
			break;
		case "bleService":
			url = "https://new.wowconnect.be/axaerlkeys.php";
			break;
		default:
			url = Config.API_URL;
			break;
	}
	return url;
}

export function getUnauthenticatedInstance(serviceType) {
	return axios.create({
		baseURL: getAPIUrl(serviceType),
		headers: {
			"device-id": getDeviceUniqueId()
		},
		timeout: parseInt(Config.REQUEST_TIMEOUT)
	});
}

export function getAuthenticatedInstance(serviceType) {
	return axios.create({
		baseURL: getAPIUrl(serviceType),
		headers: {
			"Authorization": store.getState().auth.token,
			"device-id": getDeviceUniqueId()
		},
		timeout: parseInt(Config.REQUEST_TIMEOUT)
	});
}
