import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Images } from "src/assets/images";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "src/styles/pages/activeRideEnd";
import { translate } from "src/locales/i18n";

const ActiveRideEnd = ({
	isVisible,
	onClose,
	onCloseRental
}) => {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onClose}
			style={styles.modal}
		>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => onClose()}
					style={styles.backButton}
				>
					<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
				</TouchableOpacity>
				<Text style={styles.titleText}>{translate("activeRideEnd.title")}</Text>
				<View style={styles.detailsList}>
					<Image source={Images.common.lockCloseIcon} style={styles.lockCloseIcon} />
					<Text style={styles.detailsListText}>{translate("activeRideEnd.lockText")}</Text>
				</View>
				<View style={styles.detailsList}>
					<Image source={Images.common.closeImage} style={styles.cancelIcon} />
					<Text style={styles.detailsListText}>{translate("activeRideEnd.cancelText")}</Text>
				</View>
				<View style={[styles.detailsList, styles.detailsListLast]}>
					<Image source={Images.common.doneIcon} style={styles.doneIcon} />
					<Text style={[styles.detailsListText, styles.detailsListLastText]}>
						{translate("activeRideEnd.doneText")}
					</Text>
				</View>
				<ButtonComponent
					buttonText={translate("activeRideEnd.confirmEnd")}
					style={styles.buttonContainer}
					buttonStyle={styles.button}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onCloseRental}
				/>
			</View>
		</Modal>
	);
};

ActiveRideEnd.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onCloseRental: PropTypes.func.isRequired
};

export default ActiveRideEnd;