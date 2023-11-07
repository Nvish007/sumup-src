import React from "react";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import { View, Text, Image } from "react-native";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/activeRentalEnd";

const ActiveRentalEnd = ({
	isVisible,
	onClose
}) => {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
		>
			<View style={styles.container}>
				<Text style={styles.message}>{translate("activeRentalEnd.rideEnd")}</Text>
				<Text style={styles.message}>{translate("activeRentalEnd.rideText")}</Text>
				<Text style={styles.message}>{translate("activeRentalEnd.rideText1")}</Text>
				<Image source={Images.common.thumbsUp} style={styles.thumbsUpImage} />
			</View>
		</Modal>
	);
};

ActiveRentalEnd.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default ActiveRentalEnd;