import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/bikePopUp";
import ButtonComponent from "src/components/ButtonComponent";
import { Images } from "src/assets/images";

const BikePopUp = ({
	isVisible,
	onClose,
	userId,
	serviceType,
	scanQrResponse,
	dockingUnlockSuccess,
	dockingUnlockFail,
	dispatchDockingUnlock,
	onBikeUnlockSuccess,
	dispatchResetMqttState,
	refreshHomeScreen
}) => {
	const [unlockBikeModal, updateUnlockBikeModal] = useState(false);
	const [bikeNotTakenModal, updatebikeNotTakenModal] = useState(false);
	const [countDown, updateCountDown] = useState(0);
	const intervalId = useRef(0);

	const startTimer = () => {
		let seconds = 10;
		updateCountDown(seconds);
		intervalId.current = setInterval(() => {
			seconds -= 1;
			updateCountDown(seconds);
			if (seconds <= 0) {
				clearInterval(intervalId.current);
			}
		}, 1000);
	};

	const onDockingUnlockResponse = (response) => {
		if (response.success) {
			startTimer();
		} else {
			updateUnlockBikeModal(false);
		}
	};

	const onConfirm = () => {
		updateUnlockBikeModal(true);
		updateCountDown(10); // Setting default countdown count to 10
		dispatchResetMqttState(); // It will clear dockingUnlockSuccess and dockingUnlockFail mqtt redux state to default(false)
		const dokingUnlockInfo = { userId };
		const dockingStationId = scanQrResponse?.station?._id;
		dispatchDockingUnlock(dockingStationId, dokingUnlockInfo, onDockingUnlockResponse, serviceType);
	};

	const checkDockingStatus = () => {
		if (dockingUnlockSuccess && unlockBikeModal) {
			clearInterval(intervalId.current);
			updateUnlockBikeModal(false);
			onClose();
			onBikeUnlockSuccess();
			dispatchResetMqttState();
			// console.info("Docking Unlocked Success", dockingUnlockSuccess);
		}
		if (dockingUnlockFail && unlockBikeModal) {
			clearInterval(intervalId.current);
			updateUnlockBikeModal(false);
			// updatebikeNotTakenModal(true);
			setTimeout(() => updatebikeNotTakenModal(true), 400);
			dispatchResetMqttState();
			// console.info("Docking Unlocked Fail", dockingUnlockFail);
		}
	};

	const goBack = () => {
		updateUnlockBikeModal(false);
		onClose();
		refreshHomeScreen();
	};

	useEffect(() => {
		checkDockingStatus();
	}, [dockingUnlockSuccess, dockingUnlockFail]);

	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={() => onClose()}
		>
			<View style={styles.container}>
				<Text style={styles.modalBorderTop} />
				<Text style={styles.modalBorderTopSec} />
				<Text style={styles.modalTitle}>{translate("bikePopUp.startRent")}</Text>
				<View
					style={styles.card}
				>
					<Image source={Images.common.bicycle} style={styles.bicycleIcon} />
					<View style={styles.bicycleInfo}>
						<Text style={styles.InfoTitle}>{translate("bikePopUp.ebike")}</Text>
						{
							(scanQrResponse?.bike?.parameters?.bikeBatteryCapacity) && (
								<Text style={styles.batteryPercentage}>{`${translate("bikePopUp.battery")} ${scanQrResponse?.bike?.parameters?.bikeBatteryCapacity}%`}</Text>
							)
						}
					</View>
				</View>
				{
					(scanQrResponse?.site && scanQrResponse?.station)
						&& (
							<ButtonComponent
								buttonText={scanQrResponse?.bike?.parameters?.bikeBatteryCapacity <= 20 ? translate("bikePopUp.lowBattery") : translate("bikePopUp.confirm")}
								style={styles.buttonContainer}
								buttonStyle={styles.button}
								textStyle={styles.buttonTextsStyle}
								buttonClicked={onConfirm}
								disabled={scanQrResponse?.bike?.parameters?.bikeBatteryCapacity <= 20}
							/>
						)
				}
			</View>
			<Modal
				isVisible={unlockBikeModal}
			>
				<View
					style={styles.unlockBikeContainer}
				>
					{
						countDown === 0
						&&	(
							<TouchableOpacity
								onPress={goBack}
							>
								<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
							</TouchableOpacity>
						)
					}
					<Text style={styles.unlockBikeTitle1}>{translate("bikePopUp.dockModal")}</Text>
					<Text style={styles.unlockBikeTitle2}>{`${translate("bikePopUp.countDown")} 20`}</Text>
					<Text style={styles.unlockBikeSecText}>{translate("bikePopUp.seconds")}</Text>
					<Image source={Images.common.watch} style={styles.unlockBikeClockIcon} />
				</View>
			</Modal>
			<Modal
				isVisible={bikeNotTakenModal}
				onBackdropPress={() => updatebikeNotTakenModal(false)}
			>
				<View
					style={styles.updatebikeContainer}
				>
					<TouchableOpacity
						onPress={() => updatebikeNotTakenModal(false)}
						style={styles.backButton}
					>
						<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
					</TouchableOpacity>
					<Text style={styles.updatebikeTitle1}>{translate("bikePopUp.outOfTime")}</Text>
					<Image source={Images.common.redClockIcon} style={styles.updatebikeClockIcon} />
					<Text style={styles.updatebikeTitle2}>{translate("bikePopUp.message")}</Text>
				</View>
			</Modal>
		</Modal>
	);
};

BikePopUp.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	userId: PropTypes.string.isRequired,
	serviceType: PropTypes.string.isRequired,
	scanQrResponse: PropTypes.object.isRequired,
	dispatchDockingUnlock: PropTypes.func.isRequired,
	onBikeUnlockSuccess: PropTypes.func.isRequired,
	dockingUnlockSuccess: PropTypes.bool.isRequired,
	dockingUnlockFail: PropTypes.bool.isRequired,
	dispatchResetMqttState: PropTypes.func.isRequired,
	refreshHomeScreen: PropTypes.func.isRequired
};

export default BikePopUp;