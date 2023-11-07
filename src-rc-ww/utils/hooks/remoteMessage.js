import { useEffect } from "react";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

function handleRemoteMessage(remoteMessage) {
	if (remoteMessage && remoteMessage.data && remoteMessage.data.type) {
		// Don't show notification alert
	} else {
		Alert.alert(
			remoteMessage.notification.title,
			remoteMessage.notification.body || "",
			[
				{ text: "OK" }
			]
		);
	}
}

function useRemoteMessage() {
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async(remoteMessage) => {
			console.info("remoteMessage", remoteMessage);
			handleRemoteMessage(remoteMessage);
			// Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);
}

export default useRemoteMessage;