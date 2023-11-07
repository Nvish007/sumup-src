import { Alert, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { translate } from "src/locales/i18n";

export function isEmpty(value) {
	return value === null || value === "" || value === undefined;
}

export function isEmptyObject(obj) {
	return Object.keys(obj).length === 0 ? true : false;
}

export function isIOS() {
	return Platform.OS === "ios";
}

export function showAlert(title, message, buttonText, onAlertOk) {
	Alert.alert(
		title,
		message,
		[
			{
				text: buttonText ? buttonText : "Ok",
				onPress: () => {
					if (onAlertOk) onAlertOk();
				}
			}
		],
		{ cancelable: false }
	);
}

export function scanConfirmAlert(onConfirm) {
	Alert.alert(
		translate("welcomeScreen.scanAlertTitle"),
		"",
		[
			{
				text: translate("welcomeScreen.canceltext"),
				style: "cancel"
			},
			{
				text: translate("welcomeScreen.scantext"),
				onPress: onConfirm,
			}
		],
		{ cancelable: false }
	);
}

export function getErrorMessage(error) {
	if (error.response && error.response.data) {
		const breakMessage = error.response.data.message;
		return breakMessage.replace(",", "\n");
	} else {
		return "Something went wrong, please try again.";
	}
}

export function showAPIErrorAlert(error) {
	showAlert("Error", getErrorMessage(error), "", () => {});
}

export function getDeviceUniqueId() {
	return DeviceInfo.getUniqueId();
}