import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import AuthService from "src/services/authService";
import { store } from "src/redux/store";
import DeviceInfo from "react-native-device-info";

const getToken = () => {
	messaging()
		.getToken()
		.then(async(token) => {
			console.info("firebase token", token);
			const { auth } = store.getState();
			const data = {
				deviceToken: token,
				deviceType: Platform.OS,
				deviceId: DeviceInfo.getDeviceId(),
				uniqueId: DeviceInfo.getUniqueId(),
				apiLevel: await DeviceInfo.getApiLevel(),
				buildId: await DeviceInfo.getBuildId(),
				brandName: DeviceInfo.getBrand(),
				display: await DeviceInfo.getDisplay(),
				deviceName: await DeviceInfo.getDeviceName(),
				manufacturer: await DeviceInfo.getManufacturer(),
				deviceModel: DeviceInfo.getModel(),
				systemVersion: DeviceInfo.getSystemVersion(),
				version: DeviceInfo.getVersion(),
				deviceTypeInfo: DeviceInfo.getDeviceType(),
			};
			const userId = auth.endUser?.["objectformunique_id"];
			const serviceType = "sharingService";
			await AuthService.saveFirebaseToken(userId, data, serviceType);
		})
		.catch((error) => console.error("getToken error", error));
};
export const setBackgroundMessageHandler = () => {
	messaging().setBackgroundMessageHandler(async(remoteMessage) => {
		console.info("Message handled in the background!", remoteMessage);
	});
};

export const updateToken = async() => {
	if (Platform.OS === "ios") {
		// console.log("messaging().isDeviceRegisteredForRemoteMessages", messaging().isDeviceRegisteredForRemoteMessages);
		if (messaging().isDeviceRegisteredForRemoteMessages) {
			await messaging().registerDeviceForRemoteMessages();
		}
		const authStatus = await messaging().requestPermission();
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			getToken();
		}
	} else {
		getToken();
	}
	setBackgroundMessageHandler();
};

export const deleteToken = async() => {
	const { auth } = store.getState();
	const userId = auth.user?.id;
	await AuthService.deleteFirebaseToken(userId);
};