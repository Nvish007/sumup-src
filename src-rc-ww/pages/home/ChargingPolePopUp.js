import PropTypes from "prop-types";
import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import styles from "src/styles/pages/chargingPolePopUp";
import ButtonComponent from "src/components/ButtonComponent";
// import { ChargingStation } from "src/assets/svgs";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";

const ChargingPolePopUp = ({
	isVisible,
	onClose,
	data,
	dispatchStartTransaction,
}) => {
	const [Success, setSuccess] = useState(false);
	const [Denied, setDenied] = useState(false);

	const onResponse = (response) => {
		// console.info("res", response);
		if (response?.success) {
			setSuccess(true);
		} else {
			setDenied(true);
		}
	};
	const onConfirm = () => {
		let info = { userId: data.userId, assetId: data.qrContent };
		dispatchStartTransaction(info, onResponse);
	};
	const closeSuccess = () => {
		setSuccess(false);
		setTimeout(() => {
			onClose();
		}, 100);
	};
	const closeDenied = () => {
		setDenied(false);
		setTimeout(() => {
			onClose();
		}, 100);
	};
	return (
		<>
			<Modal
				isVisible={isVisible}
				onBackdropPress={onClose}
				style={styles.modal}
			>
				<View style={styles.container}>
					<Text style={styles.modalBorderTop} />
					<Text style={styles.modalBorderTopSec} />
					<Text style={styles.modalTitle}>{translate("chargingPolePopUp.startRent")}</Text>
					<View
						style={styles.card}
					>
						{/* <ChargingStation fill="#000000" /> */}
						<Image
							source={Images.markerDetailsScreen.chargingPoint}
							style={styles.contentCharginPointImage}
						/>
						<View style={styles.chargingPoleInfo}>
							<Text style={styles.chargingPoleTitle}>{translate("chargingPolePopUp.chargingPoint")}</Text>
							<Text>11 kW</Text>
							<Text>{`24/7 ${translate("chargingPolePopUp.available")}`}</Text>
						</View>
					</View>
					<ButtonComponent
						buttonText={translate("chargingPolePopUp.confirm")}
						style={styles.buttonContainer}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onConfirm}
					/>
				</View>
				<Modal
					isVisible={Success}
					onBackdropPress={closeSuccess}
				>
					<View
						style={styles.popUpContainer}
					>
						<Text style={styles.message}>{translate("chargingPolePopUp.charging")}</Text>
						<Text style={styles.message}>{translate("chargingPolePopUp.instruction")}</Text>
						<Image source={Images.common.thumbsUp} style={styles.thumbIcon} />
						<ButtonComponent
							buttonText={translate("activeReservation.okay")}
							style={styles.buttonContainer}
							buttonStyle={styles.OkayButton}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={closeSuccess}
						/>
					</View>
				</Modal>
				<Modal
					isVisible={Denied}
					onBackdropPress={closeDenied}
				>
					<View
						style={styles.popUpContainer}
					>
						<Text style={styles.message1}>{translate("chargingPolePopUp.unable")}</Text>
						<Text style={styles.message1}>{translate("chargingPolePopUp.warning")}</Text>
						<Image source={Images.common.thumbsDown} style={styles.thumbIcon} />
						<ButtonComponent
							buttonText={translate("activeReservation.okay")}
							style={styles.buttonContainer}
							buttonStyle={styles.OkayButton}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={closeDenied}
						/>
					</View>
				</Modal>
			</Modal>
		</>
	);
};

ChargingPolePopUp.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default ChargingPolePopUp;