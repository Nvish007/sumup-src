import React, { useEffect, useLayoutEffect } from "react";
import { Alert, View, Text } from "react-native";
import Button from "src/components/ButtonComponent";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/ble";
import { connect } from "react-redux";
import { startRental, cancelRental } from "src/redux/actions";
import { getEndUserId } from "src/redux/selectors";
import useBLE from "src/utils/hooks/useBLE";
import { isEmpty } from "src/utils/native";

const BLE = ({
	route,
	navigation,
	endUserId,
	dispatchStartRental,
	dispatchCancelRental
}) => {
	const siteInformation = route?.params?.siteInformation;
	const showLock = route?.params?.showLock;
	const activeRental = route?.params?.activeRental;

	const {
		// allDevices,
		requestPermission,
		scanForDevices,
		// stopDeviceScan,
		// connectToDevice,
		connectedDevice,
		lockStatus,
		unlockAction,
		lockAction,
		disconnectDevice,
		bleManager,
		deviceRef,
		isUnlocking,
		isLocking
	} = useBLE();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.bleDevelopment")
		});
	}, [navigation]);

	useEffect(() => {
		return () => {
			if (deviceRef.current && deviceRef.current.id) {
				disconnectDevice(deviceRef.current.id);
			}
		};
	}, []);

	useEffect(() => {
		try {
			bleManager.enable();
		} catch (e) {
			console.log("test2");
		}
		const sub = bleManager.onStateChange((state) => {
			if (state === "PoweredOn") {
				scanAndConnect();
				// sub.remove();
			} else if (state === "Unknown") {
				console.info("wait for connection");
			} else {
				Alert.alert("There is an issue with the bluetooth connection. \n\nPlease restart the app");
			}
		}, true);

		return async() => {
			sub.remove();
			bleManager.stopDeviceScan();
		};
	}, []);

	const scanAndConnect = async() => {
		requestPermission((isGranted) => {
			console.log(isGranted);
			if (isGranted) {
				scanForDevices(isEmpty(activeRental) ? siteInformation?.bike?.properties?.axalockid : activeRental?.asset?.properties?.axalockid);
			}
		});
	};

	const onStartRentResponse = (res) => {
		navigation.navigate("Home", { isNavigate: true });
		Alert.alert(res.message);
	};

	const startRent = () => {
		const data = { userId: endUserId, assetId: siteInformation?.bike._id, status: "active", startDate: new Date() };
		dispatchStartRental(data, onStartRentResponse);
	};

	useEffect(() => {
		if (lockStatus === "OPEN" && isEmpty(activeRental?.rental.id)) {
			startRent();
		}
		if (lockStatus === "LOCKCLOSED") {
			handleEndRide();
		}
	}, [lockStatus]);

	const onCancelRideResponse = () => {
		navigation.navigate("Home");
	};

	const handleEndRide = () => {
		const { rental } = activeRental;
		dispatchCancelRental(rental?.id, onCancelRideResponse);
	};

	const handleUnlockAction = async() => {
		const deviceName = isEmpty(activeRental) ? siteInformation?.bike?.properties?.axalockid : activeRental?.asset?.properties?.axalockid;
		unlockAction(deviceName);
	};

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<Text>{translate("ble.lockType")}</Text>
				{/* {
					!isEmpty(connectedDevice)
					&& (
						<View style={styles.listContainer}>
							<Text>
								Connected device:
								{" "}
								{connectedDevice?.name}
							</Text>
							<Text>
								Device id:
								{" "}
								{connectedDevice?.id}
							</Text>
						</View>
					)
				} */}
				{
					!isEmpty(showLock)
					&& (
						<>
							<View style={styles.rowContainer}>
								<Button
									buttonText={translate("ble.unlock")}
									buttonStyle={styles.confirmButton}
									textStyle={styles.buttonTextsStyle}
									disabled={!(connectedDevice && connectedDevice.id)}
									isLoading={isUnlocking}
									buttonClicked={() => handleUnlockAction()}
								/>
							</View>
							{
								activeRental?.rental
								&& (
									<Button
										buttonText={translate("ble.endRide")}
										buttonStyle={styles.confirmButton}
										textStyle={[styles.buttonSubTextStyle]}
										disabled={isEmpty(activeRental?.rental)}
										isLoading={isLocking}
										buttonClicked={() => lockAction()}
									/>
								)
							}
							<Text style={styles.buttonTextsStyle}>
								{`${translate("ble.status")} ${lockStatus}`}
							</Text>
						</>
					)
				}
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchStartRental: startRental,
	dispatchCancelRental: cancelRental,
};

export default connect(mapStateToProps, mapDispatchToProps)(BLE);