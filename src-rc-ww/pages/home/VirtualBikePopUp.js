import React, { } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, Alert, } from "react-native";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/bikePopUp";
import ButtonComponent from "src/components/ButtonComponent";
import { Images } from "src/assets/images";

const VirtualBikePopUp = ({
	isVisible,
	onClose,
	userId,
	siteInformation,
	// dispatchCreateReservation,
	dispatchOpenSentinelLock,
	navigation
}) => {
	const onResponse = (res) => {
		if (!res.data.body) {
			Alert.alert("Please activate the lock");
		} else {
			Alert.alert("Have a safe ride");
		}
	};

	// const onResponseReservation = (res) => {
	// 	console.info(res);
	// 	onClose();
	// };

	const onConfirm = () => {
		if (siteInformation.type === "bikesharing") {
			onClose();
			navigation.navigate("BLE", { siteInformation, showLock: true });
			return;
		}
		let data = {
			userId,
			asset_id: siteInformation?.bike._id,
			enddate: null,
			fleet_type: 4,
			location: 0,
			startdate: new Date(),
		};
		dispatchOpenSentinelLock(data, onResponse);
	};

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
					</View>
				</View>
				<ButtonComponent
					buttonText={translate("bikePopUp.confirm")}
					style={styles.buttonContainer}
					buttonStyle={styles.button}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onConfirm}
					// disabled={}
				/>
			</View>
		</Modal>
	);
};

VirtualBikePopUp.prototype = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default VirtualBikePopUp;