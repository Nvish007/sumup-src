import MQTT from "sp-react-native-mqtt";
import { store } from "src/redux/store";
import { dockingUnlockSuccess, dockingUnlockFail, rentalEnd, handleCarRideStatus, handleLocationInfo } from "src/redux/actions";
import Config from "react-native-config";
import { showAlert } from "./native";

const { MQTT_URL, MQTT_USERNAME, MQTT_PASSWORD } = Config;
const { getState, dispatch } = store;
let client;
// let isConnected;
export class MqttService {
	static connect = async() => {
		try {
			const userId = getState().auth.endUser?.["objectformunique_id"];
			const CLIENT_ID = Math.random().toString(36).substring(7) + userId;
			client = await MQTT.createClient({
				uri: MQTT_URL,
				user: MQTT_USERNAME,
				pass: MQTT_PASSWORD,
				auth: true,
				clientId: CLIENT_ID
			});
			client.on("closed", () => {
				console.info("mqtt.event.closed");
			});
			client.on("error", (message) => {
				console.info("mqtt.event.error", message);
			});
			client.on("message", (message) => {
				console.info("mqtt.event.message", message);
				const { topic } = message;
				const event = topic.split("/").slice(-1)?.[0];
				console.info("event new console", event);
				switch (event) {
					case "docking_unlock_fail": {
						dispatch(dockingUnlockFail());
						break;
					}
					case "docking_unlock": {
						dispatch(dockingUnlockSuccess());
						break;
					}
					case "rental_end": {
						dispatch(rentalEnd());
						// console.info("rental_end", event);
						break;
					}
					case "status": {
						// console.info(" Store info in redux", message.data);
						dispatch(handleCarRideStatus(message.data));
						break;
					}
					case "location_update": {
						dispatch(handleLocationInfo(message.data));
					}
				}
			});
			client.on("connect", () => {
				console.info("mqtt connected");
				client.subscribe(`mobileapp/${userId}/#`, 0);
				client.subscribe("mobileapp/general/location_update", 0);
			});
			client.connect();
		} catch (error) {
			showAlert("Error", error);
		}
	};

	static subscribeOnEvent = async(assetId) => {
		if (assetId) {
			client.subscribe(`mobileapp/car/${assetId}/status`, 0);
		}
	}
}

// MQTT.createClient({
// 	uri: MQTT_URL,
// 	user: "mqtt_user",
// 	pass: "mqtt_user",
// 	auth: true,
// 	clientId: CLIENT_ID
// }).then(function(client) {
// 	client.on("closed", function() {
// 		console.info("mqtt.event.closed");
// 	});
// 	client.on("error", function(msg) {
// 		console.info("mqtt.event.error", msg);
// 	});
// 	client.on("message", function(msg) {
// 		console.info("mqtt.event.message", msg);
// 	});
// 	client.on("connect", function() {
// 		console.info("connected");
// 		// client.publish("", 0);
// 		client.subscribe(`mobileapp/${userId}/#`, 0);
// 	});
// 	client.connect();
// }).catch(function(err) {
// 	console.info(err);
// });

// export const Mqtt = async() => {
// 	const client = await MQTT.createClient({
// 		uri: MQTT_URL,
// 		user: MQTT_USERNAME,
// 		pass: MQTT_PASSWORD,
// 		auth: true,
// 		clientId: CLIENT_ID
// 	});
// 	return client;
// };

// let options = {
// 	keepalive: 10,
// 	clientId: CLIENT_ID,
// 	protocolId: "MQTT",
// 	protocolVersion: 4,
// 	clean: true,
// 	reconnectPeriod: 1000,
// 	connectTimeout: 30 * 1000,
// 	will: {
// 		topic: "WillMsg",
// 		payload: "Connection Closed abnormally..!",
// 		qos: 0,
// 		retain: false
// 	},
// 	username: MQTT_USERNAME,
// 	password: MQTT_PASSWORD,
// 	rejectUnauthorized: false
// };

// let client = mqtt.connect(MQTT_URL, options);

// client.on("error", function(err) {
// 	console.info(err);
// 	client.end();
// });

// client.on("connect", function() {
// 	console.info(`client connected:${CLIENT_ID}`);
// });

// client.subscribe("topic", { qos: 0 });

// client.publish("topic", "wss secure connection demo...!", { qos: 0, retain: false });

// client.on("message", function(topic, message) { // packet
// 	console.info(`Received Message:= ${message.toString()}\nOn topic:= ${topic}`);
// });

// client.on("close", function() {
// 	console.info(`${CLIENT_ID} disconnected`);
// });

// client.on("connect", function() {
// 	client.subscribe("presence", function(err) {
// 		if (!err) {
// 			client.publish("presence", "Hello mqtt");
// 		}
// 	});
// });

// client.on("message", function(topic, message) {
// 	// message is Buffer
// 	console.info(message.toString());
// 	client.end();
// });