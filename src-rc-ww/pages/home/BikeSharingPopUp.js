import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/bikePopUp";
import ButtonComponent from "src/components/ButtonComponent";
import { Images } from "src/assets/images";

const BikeSharingPopUp = ({
	isVisible,
	onClose,
	siteInformation,
	navigation
}) => {
	const onConfirm = () => {
		onClose();
		navigation.navigate("BLE", { siteInformation, showLock: true });
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

BikeSharingPopUp.prototype = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default BikeSharingPopUp;