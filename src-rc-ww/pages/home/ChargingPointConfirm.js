import PropTypes from "prop-types";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Button from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/markerDetails";
import dayjs from "dayjs";

const ChargingPointConfirm = ({
	isVisible,
	onClose,
	onSuccess,
	data,
	dispatchCreateReservation
}) => {
	const { locationExternalId, locationname, endUserId } = data;
	const [isLoading, updateIsLoading] = useState(false);

	const onCreateReservationResponse = (response) => {
		updateIsLoading(false);
		if (response.success) {
			onSuccess();
		}
	};

	const onConfirm = () => {
		updateIsLoading(true);
		const bookingInfo = {
			user_id: endUserId,
			location: locationExternalId,
			fleet_type: "7",	// if this value change then also need to change fleet_type on ActiveReservation.js file.
			startdate: dayjs(),
			enddate: dayjs().add(20, "minutes"),
		};
		// console.info(bookingInfo);
		dispatchCreateReservation(bookingInfo, onCreateReservationResponse);
	};

	return (
		<Modal
			isVisible={isVisible}
			style={styles.modalConfirm}
		>
			<View style={[styles.container]}>
				<TouchableOpacity
					onPress={() => onClose()}
					style={styles.backButton}
				>
					<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
				</TouchableOpacity>
				<View style={styles.ConfirmContent}>
					<Text style={styles.ConfirmText}>{translate("chargePointBooking.popUpText1")}</Text>
					<Text style={styles.ConfirmText}>
						{`${translate("chargePointBooking.popUpText2")} "${locationname}" `}
						<Text style={styles.boldText}>{translate("chargePointBooking.popUpText3")}</Text>
					</Text>
					<Image source={Images.markerDetailsScreen.watchImg} style={styles.watchImgIcon} />
					<Button
						buttonText={translate("chargePointBooking.confirm")}
						buttonStyle={styles.ConfirmButton}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onConfirm}
						isLoading={isLoading}
						disabled={isLoading}
					/>
				</View>
			</View>
		</Modal>
	);
};

ChargingPointConfirm.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	dispatchCreateReservation: PropTypes.func.isRequired
};

export default ChargingPointConfirm;
