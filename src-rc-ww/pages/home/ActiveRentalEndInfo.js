import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Images } from "src/assets/images";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "src/styles/pages/activeRentalEndInfo";
import { translate } from "src/locales/i18n";

const ActiveRentalEndInfo = ({
	isVisible,
	onClose,
	isAxaLockAvailable,
	onFindNearestLocationClick
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
				<Text style={styles.titleText}>{translate("endBikeRide.title")}</Text>
				{
					isAxaLockAvailable
						? (
							<View style={styles.viewMargin}>
								<View style={styles.detailsList}>
									<Text style={[styles.textMargin]}>1.</Text>
									<Text style={styles.detailsListText}>{translate("activeRentalEnd.axaLockGuide1")}</Text>
								</View>
								<View style={styles.detailsList}>
									<Text style={[styles.textMargin]}>2.</Text>
									<Text style={styles.detailsListText}>{translate("activeRentalEnd.axaLockGuide2")}</Text>
								</View>
								<View style={[styles.detailsList, styles.detailsListLast]}>
									<Text style={[styles.textMargin]}>3.</Text>
									<Text style={[styles.detailsListText, styles.detailsListLastText]}>
										{translate("activeRentalEnd.axaLockGuide3")}
									</Text>
								</View>
							</View>
						)
						: (
							<View>
								<View style={styles.detailsList}>
									<Image source={Images.common.locationIcon} style={styles.locationIcon} />
									<Text style={styles.detailsListText}>{translate("endBikeRide.message1")}</Text>
								</View>
								<View style={styles.detailsList}>
									<Image source={Images.common.stationIcon} style={styles.stationIcon} />
									<Text style={styles.detailsListText}>{translate("endBikeRide.message2")}</Text>
								</View>
								<View style={[styles.detailsList, styles.detailsListLast]}>
									<Image source={Images.common.doneIcon} style={styles.doneIcon} />
									<Text style={[styles.detailsListText, styles.detailsListLastText]}>
										{translate("endBikeRide.message3")}
									</Text>
								</View>
							</View>
						)
				}
				{
					!isAxaLockAvailable
					&& (
						<ButtonComponent
							buttonText={translate("endBikeRide.buttonText")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onFindNearestLocationClick}
						/>
					)
				}
			</View>
		</Modal>
	);
};

ActiveRentalEndInfo.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onFindNearestLocationClick: PropTypes.func.isRequired
};

export default ActiveRentalEndInfo;