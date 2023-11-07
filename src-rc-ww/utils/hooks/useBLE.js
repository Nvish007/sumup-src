import AsyncStorage from "@react-native-community/async-storage";
import { useState, useRef } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";
// import { stringToBytes } from "convert-string";
import { Buffer } from "buffer";
import ScanService from "src/services/scanService";
// import base64 from "react-native-base64";
const bleManager = new BleManager();

export default function useBLE() {
	const [allDevices, setAllDevices] = useState([]);
	const [connectedDevice, setConnectedDevice] = useState(null);
	const [lockStatus, setLockStatus] = useState("Enabling bluetooth");
	const [isUnlocking, setIsUnlocking] = useState(false);
	const [isLocking, setIsLocking] = useState(false);
	const deviceRef = useRef(null);

	let lockStatusInt = 0;
	const requestPermission = async(callback) => {
		if (Platform.OS === "android") {
			const grantedStatus = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: "Location Permission",
					message: "Bluetooth Low Energy Needs Location Permission",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
					buttonNeutral: "Maybe Later",
				},
			);
			callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
		} else {
			callback(true);
		}
	};

	const isDuplicateDevice = (devices, nextDevice) => devices.findIndex((device) => nextDevice.id === device.id) > -1;

	// const fetchConnectedDevices = async() => {
	// 	const serviceUUIDs = await AsyncStorage.getItem("connectedPeripherals");
	// 	if (serviceUUIDs) {
	// 		const connectedPeripherals = await bleManager.connectedDevices([serviceUUIDs]);
	// 		if (connectedPeripherals.length > 0) {
	// 			setConnectedDevice(connectedPeripherals[0]);
	// 			bleManager.stopDeviceScan();
	// 		}
	// 	}
	// };

	// const handleWriteCharacteristics = async(item) => {
	// 	console.info("item", item);
	// 	await bleManager.writeCharacteristicWithResponseForDevice(connectedDevice.id,
	// 		connectedDevice.serviceUUIDs[0],
	// 		"00001525-e513-11e5-9260-0002a5d5c51b",
	// 		Buffer.from(item, "hex").toString("base64"));
	// };

	const unlockAction = async(deviceName) => {
		try {
			setIsUnlocking(true);
			const { data } = await ScanService.getAXAkeys(deviceName);

			const axaEkey = data.keys;
			const axaToken = data.pass;

			const axaEkeyList = axaEkey.split("-");
			const axaEkeyOtp = axaToken.split("-");

			const isConnected = await connectedDevice.isConnected();

			if (!isConnected) {
				await connectedDevice.connect();
			}

			const isConnected2 = await connectedDevice.isConnected();
			console.info(isConnected2);
			if (isConnected2) {
				await connectedDevice.discoverAllServicesAndCharacteristics();
				console.info("isConnected");
				setLockStatus("Unlocking");
				startStreamingData(connectedDevice);
				let lockInfo = await bleManager.readCharacteristicForDevice(connectedDevice.id,
					connectedDevice.serviceUUIDs[0],
					"00001524-e513-11e5-9260-0002a5d5c51b");
				const heartRateData = Buffer.from(lockInfo.value, "base64").readUInt16LE(0);
				console.info(heartRateData);
				for(let i = 0; i < axaEkeyList.length; i++) {
					console.info(axaEkeyList[i]);
					console.info(`axaEkeyList${i}`);
					await bleManager.writeCharacteristicWithResponseForDevice(connectedDevice.id,
						connectedDevice.serviceUUIDs[0],
						"00001525-e513-11e5-9260-0002a5d5c51b",
						Buffer.from(axaEkeyList[i], "hex").toString("base64"));
				}

				await bleManager.writeCharacteristicWithResponseForDevice(connectedDevice.id,
					connectedDevice.serviceUUIDs[0],
					"00001525-e513-11e5-9260-0002a5d5c51b",
					Buffer.from(axaEkeyOtp[data?.index], "hex").toString("base64"));
				setIsUnlocking(false);
			}
		} catch (e) {
			console.info(">>>>ERROR<<<");
			console.info(e);
			unlockAction(deviceName);
		}
	};

	const lockAction = async() => {
	
		setIsLocking(true);
		const isConnected = await connectedDevice.isConnected();

		if (!isConnected) {
			await connectedDevice.connect();
		}

		const isConnected2 = await connectedDevice.isConnected();

		if (isConnected2) {
			await connectedDevice.discoverAllServicesAndCharacteristics();
			let lockInfo = await bleManager.readCharacteristicForDevice(connectedDevice.id,
				connectedDevice.serviceUUIDs[0],
				"00001524-e513-11e5-9260-0002a5d5c51b");
			const lockStatusInfo = Buffer.from(lockInfo.value, "base64").readUInt16LE(0);
			
			if (lockStatusInfo == 17) {
				bleManager.cancelDeviceConnection(connectedDevice.id);
				setLockStatus("LOCKCLOSED");
				setIsLocking(false);
			} else if (lockStatusInfo == 1) {
				setIsLocking(false);
				Alert.alert("Chain not attached", "You have to attach the chain!");
			} else {
				setIsLocking(false);
				Alert.alert("Lock not closed", "Push the button on the side of the lock and close the lock!");
			}
		}
	};

	const scanForDevices = async(deviceName) => {
		// deviceName = "AXA:780728F50107892F254E";
		if (connectedDevice) {
			console.info("CONNECTED");
		} else {
			console.info("NOT CONNECTED");
		}

		bleManager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				console.info("starterror");
				scanForDevices(deviceName);
				console.info("error", error);
			}

			if (device && device.name) {
				console.info("device.name", device.name);
				// if (device.name === "OnePlus Bullets Wireless Z2") {
				if (device.name == deviceName) {
					console.info("FOUND");
					bleManager.stopDeviceScan();
					connectToDevice(device);
					// lockStatus = "Connecting to device";
					setLockStatus("Connecting to lock");
					setAllDevices((prevState) => {
						if (!isDuplicateDevice(prevState, device)) {
							return [...prevState, device];
						}
						return prevState;
					});
				}
			}
		});
	};
	const stopDeviceScan = () => bleManager.stopDeviceScan();

	const onHeartRateUpdate = (
		error,
		characteristic,
	) => {
		console.info("update");
		if (error) {
			console.info(error);
			return -1;
		} else if (!characteristic?.value) {
			return -1;
		}
		const heartRateData = Buffer.from(characteristic.value, "base64").readUInt16LE(0);
		console.info("heartRateData", heartRateData);
		switch (heartRateData) {
			case 1:
				// lockStatus = "CLOSED";
				setLockStatus("CLOSED");
				lockStatusInt = 1;
				bleManager.cancelDeviceConnection(connectedDevice.id);
				console.info(lockStatus);
				// HERE THE ACTION TO END RENT SHOULD BE STARTED
				break;
			case 0:
				// lockStatus = "OPEN";
				setLockStatus("OPEN");
				console.info(lockStatus);
				setIsUnlocking(false);
				lockStatusInt = 0;
				// HERE THE ACTION TO START RENT SHOULD BE STARTED
				break;
		}
	};

	const startStreamingData = async() => {
		if (connectedDevice) {
			const isConnected = await connectedDevice.isConnected();
			if (!isConnected) {
				await connectedDevice.connect();
			}
			const isConnected2 = await connectedDevice.isConnected();
			if (isConnected2) {
				console.info(">>>> CONNECTED AND START CHARACTER <<<");
				await connectedDevice.discoverAllServicesAndCharacteristics();
				connectedDevice.monitorCharacteristicForService(
					connectedDevice.serviceUUIDs[0],
					"00001524-e513-11e5-9260-0002a5d5c51b",
					(error, characteristic) => onHeartRateUpdate(error, characteristic),
				);
			}
		} else {
			console.info("No Device Connected");
		}
	};

	const disconnectDevice = async(deviceId) => {
		return new Promise((resolve, reject) => {
			bleManager.cancelDeviceConnection(deviceId)
				.then((rest) => {
					console.info("rest", rest);
					setConnectedDevice(null);
					deviceRef.current = null;
				})
				.catch((err) => console.log("error on cancel connection", err));
		});
	};

	const connectToDevice = async(device) => {
		try {
			await device.connect({ autoConnect: false });
			const isConnected = await device.isConnected();
			setConnectedDevice(device);
			deviceRef.current = device;
			console.info("device.serviceUUIDs", device.serviceUUIDs);
			setLockStatus("Connected to lock");
			startStreamingData();
			if (isConnected && device.serviceUUIDs) {
				AsyncStorage.setItem("connectedPeripherals", device.serviceUUIDs[0]);
				setConnectedDevice(device);
				deviceRef.current = device;
				// setLockStatus("Connected to lock");
				// disconnecteDevice(device);
				console.info("Will get here");
				// startStreamingData();
			}
		} catch (e) {
			// Alert.alert("FAILED TO CONNECT", JSON.stringify(e?.message));
			console.info("FAILED TO CONNECT", JSON.stringify(e));
		}
	};

	// const connectToDevice = async(device) => {
	// 	try {
	// 		await device.connect();
	// 		const isConnected = await device.isConnected();
	// 		if (isConnected) {
	// 			console.info("device.serviceUUIDs", device.serviceUUIDs);
	// 			setConnectedDevice(device);
	// 			setLockStatus("Connected to lock");
	// 			console.info("Will get here");
	// 			bleManager.stopDeviceScan();
	// 			startStreamingData();
	// 		}
	// 	} catch (e) {
	// 		// Alert.alert("FAILED TO CONNECT", JSON.stringify(e?.message));
	// 		console.info("FAILED TO CONNECT", JSON.stringify(e));
	// 	}
	// };

	return {
		requestPermission,
		scanForDevices,
		stopDeviceScan,
		connectToDevice,
		connectedDevice,
		allDevices,
		lockStatus,
		lockStatusInt,
		lockAction,
		unlockAction,
		disconnectDevice,
		bleManager,
		deviceRef,
		isUnlocking,
		isLocking,
	};
}