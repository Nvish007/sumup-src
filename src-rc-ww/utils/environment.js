import Config from "react-native-config";

export function getApiEndpoint(environment) {
	let apiUrl;
	switch (environment) {
		case "local":
			apiUrl = Config.LOCAL_API_URL;
			break;
		case "development":
			apiUrl = Config.DEVELOPMENT_API_URL;
			break;
		case "staging":
			apiUrl = Config.STAGING_API_URL;
			break;
		case "production":
			apiUrl = Config.PRODUCTION_API_URL;
			break;
		default:
			apiUrl = Config.DEVELOPMENT_API_URL;
			break;
	}
	return apiUrl;
}