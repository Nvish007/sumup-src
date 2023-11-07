import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "src/styles/pages/activeRental";
import ButtonComponent from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import ActiveRentalEndInfo from "src/pages/home/ActiveRentalEndInfo";
import ActiveRentalEnd from "src/pages/home/ActiveRentalEnd";
import ActiveRideEnd from "src/pages/home/ActiveRideEnd";
import { isEmpty } from "src/utils/native";

const ActiveRental = ({
	activeRental,
	userId,
	serviceType,
	rentalEnd,
	updateMap,
	navigation,
	onFindNearestLocation,
	dispatchGetLocation,
	dispatchCanCloseRental,
	dispatchCloseRental,
	dispatchHandleOpenBikeLock,
	dispatchResetMqttState
}) => {
	const [isLoading, updateIsLoading] = useState(false);
	const [showBikeDetails, setShowBikeDetails] = useState(false);
	const [endRideInfoPopUp, updateEndRideInfoPopUp] = useState(false);
	const [endRidePopUp, updateEndRidePopUp] = useState(false);
	const [closeRentalModal, updatecloseRentalModal] = useState(false);
	const userInfo = {
		user_id: "985",
		rental_id: "111",
		latitude: "50",
		longitude: "4",
		result: "100"
	};
	const onCloseRental = () => {
		dispatchCloseRental();
		updatecloseRentalModal(false);
		setShowBikeDetails(false);
		Alert.alert(translate("alert.close"));
	};

	// const closeRentalPopUp = () => {
	// 	updatecloseRentalModal(false);
	// };

	const getResponse = (response) => {
		if (response.data?.code === 10) {
			updateEndRideInfoPopUp(true);
		} else if (response.data?.code === 20) {
			Alert.alert(response.message);
		} else if (response.data?.code === 0) {
			Alert.alert(translate("alert.error"));
		} else if (response.data?.code === 100) {
			updatecloseRentalModal(true);
		}
	};
	const onCanCloseRental = () => {
		dispatchCanCloseRental(userInfo, getResponse);
	};
	const onOpenBikeLockResponse = () => {
		updateIsLoading(false);
	};

	const openBikeLock = () => {
		updateIsLoading(true);
		const { rental } = activeRental;
		const data = { userId, assetId: rental?.assetId };
		dispatchHandleOpenBikeLock(data, onOpenBikeLockResponse, serviceType);
	};

	const navigateToBLE = () => navigation.navigate("BLE", { activeRental, showLock: true });

	const onFindNearestLocationClick = () => {
		updateEndRideInfoPopUp(false);
		setShowBikeDetails(false);
		onFindNearestLocation();
	};

	const onCloseOfActiveRentalEnd = () => {
		updateEndRidePopUp(false);
		dispatchGetLocation(updateMap, serviceType);
		dispatchResetMqttState();
	};

	useEffect(() => {
		if (rentalEnd) {
			updateEndRidePopUp(true);
		}
	}, [rentalEnd]);

	return (
		<>
			<View style={styles.mainContainer} onStartShouldSetResponder={() => setShowBikeDetails(!showBikeDetails)}>
				{
					showBikeDetails
						? (
							<Text style={styles.locationBorderTop} />
						)
						: (
							<>
								<Text style={styles.modalBorderTop} />
								<Text style={styles.modalBorderTopSec} />
							</>
						)
				}
				<Text style={styles.modalTitle}>{translate("activeBike.activeRide")}</Text>
				<View
					style={styles.card}
				>
					<Image source={Images.common.bicycle} style={styles.bicycleIcon} />
					<View style={styles.bicycleInfo}>
						<Text style={styles.InfoTitle}>{translate("activeBike.ebike")}</Text>
					</View>
				</View>
				{
					showBikeDetails
					&& (
						<View style={styles.bikeDetails}>
							<View style={styles.rideDetails}>
								<View>
									<TouchableOpacity
										style={[styles.rideCard, styles.rideLeftCard]}
										onPress={onCanCloseRental}
									>
										<Image source={Images.common.closeImage} style={styles.closeIcon} />
										<Text style={styles.rideText}>{translate("activeBike.endRide")}</Text>
									</TouchableOpacity>
								</View>
								<View>
									<TouchableOpacity style={styles.rideCard} onPress={() => navigation.navigate("Support")}>
										<Image source={Images.common.supportImage} style={styles.supportIcon} />
										<Text style={styles.supportText}>{translate("activeBike.contact")}</Text>
									</TouchableOpacity>
								</View>
							</View>
							{
								isEmpty(activeRental.asset.properties.axalockid)
									? (
										<View>
											<Text style={styles.rideDetailsTitle}>{translate("activeBike.stop")}</Text>
											<Text style={styles.rideDetailsText}>
												{translate("activeBike.message1")}
												{translate("activeBike.message2")}
											</Text>
										</View>
									)
									: (
										<View>
											<Text style={styles.rideDetailsTitle}>{translate("activeBike.lockDuringRide")}</Text>
											<Text style={styles.rideDetailsText}>
												{translate("activeBike.lockGuide")}
											</Text>
										</View>
									)
							}
							<View style={styles.rideDetails}>
								{
									!isEmpty(activeRental.asset.properties.axalockid)
										? (
											<>
												<ButtonComponent
													buttonText={translate("activeBike.actiesSlot")}
													style={styles.buttonContainer}
													buttonStyle={styles.button}
													textStyle={styles.buttonTextsStyle}
													buttonClicked={navigateToBLE}
													isLoading={isLoading}
													disabled={isLoading}
												/>
												<ButtonComponent
													buttonText={translate("activeBike.endRide")}
													style={styles.buttonContainer}
													buttonStyle={styles.button}
													textStyle={styles.buttonTextsStyle}
													buttonClicked={navigateToBLE}
													disabled={isLoading}
												/>
											</>
										)
										: (
											<ButtonComponent
												buttonText={translate("activeBike.openLock")}
												buttonStyle={styles.button}
												textStyle={styles.buttonTextsStyle}
												buttonClicked={openBikeLock}
												disabled={isLoading}
											/>
										)
								}
							</View>
						</View>
					)
				}
			</View>
			<ActiveRentalEndInfo
				isVisible={endRideInfoPopUp}
				onClose={() => updateEndRideInfoPopUp(false)}
				isAxaLockAvailable={!isEmpty(activeRental.asset.properties.axalockid)}
				onFindNearestLocationClick={() => onFindNearestLocationClick()}
			/>
			<ActiveRideEnd
				isVisible={closeRentalModal}
				onClose={() => updatecloseRentalModal(false)}
				onCloseRental={() => onCloseRental()}
			/>
			<ActiveRentalEnd
				isVisible={endRidePopUp}
				onClose={() => onCloseOfActiveRentalEnd()}
			/>
		</>
	);
};

ActiveRental.propTypes = {
	activeRental: PropTypes.object.isRequired,
	userId: PropTypes.string.isRequired,
	serviceType: PropTypes.string.isRequired,
	rentalEnd: PropTypes.bool.isRequired,
	updateMap: PropTypes.object.isRequired,
	onFindNearestLocation: PropTypes.func.isRequired,
	dispatchCanCloseRental: PropTypes.func.isRequired,
	dispatchHandleOpenBikeLock: PropTypes.func.isRequired,
	dispatchResetMqttState: PropTypes.func.isRequired,
};

export default ActiveRental;