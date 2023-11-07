import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "src/styles/pages/activeCharging";
import ButtonComponent from "src/components/ButtonComponent";
import { translate } from "src/locales/i18n";
import { Images } from "src/assets/images";
import dayjs from "dayjs";

const ActiveCharging = ({
	navigation,
	activeCharging,
	endChargingInfo,
	serviceType,
	updateMap,
	dispatchGetLocation,
	dispatchEndCharging
}) => {
	// console.info("endChargingInfo :", endChargingInfo);
	const [showCarDetails, setShowCarDetails] = useState(false);
	const [isVisible, updateIsVisible] = useState(false);
	const [endCharging, updateEndCharging] = useState(false);
	// const [loader, setLoader] = useState(false);
	// const [startDateTime, setStartDateTime] = useState("");
	// const [endDateTime, setEndDateTime] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");

	const endRide = () => {
		updateEndCharging(true);
	};

	const contactSupport = () => {
		navigation.navigate("Support");
	};

	const onResponse = () => {
		updateEndCharging(false);
		setTimeout(() => {
			updateIsVisible(true);
		}, 500);
	};

	const onEndCharging = () => {
		const data = {
			chargeBoxId: activeCharging?.asset?._id,
			connectorId: activeCharging?.session?.connectorID,
			endDate: activeCharging?.session?.endDate,
			status: "inactive",
			endValue: activeCharging?.session?.endValue,
			stopReason: activeCharging?.session?.stopReason,
			chargerBoxSessionId: activeCharging?.session?.chargerBoxSessionId
		};
		dispatchEndCharging(data, onResponse);
	};

	const onCloseCharging = () => {
		updateEndCharging(false);
	};

	const onClose = () => {
		dispatchGetLocation(updateMap, serviceType);
		updateIsVisible(false);
	};

	useEffect(() => {
		const startUTC = dayjs.utc(endChargingInfo?.startDate);
		const endUTC = dayjs.utc(endChargingInfo?.endDate);
		const startTimeZone = dayjs.utc(startUTC).local().format("YYYY-MM-DD HH:mm");
		const endTimeZone = dayjs.utc(endUTC).local().format("YYYY-MM-DD HH:mm");

		const startTime = dayjs(startTimeZone);
		const endTime = dayjs(endTimeZone);
		const diff = endTime.diff(startTime, "second");
		const diffFormat = new Date(diff * 1000 * 24).toISOString().substr(11, 8);
		const diffValue = diffFormat.split(":");
		setHours(diffValue[0]);
		setMinutes(diffValue[1]);
	}, [endChargingInfo]);

	return (
		<>
			<View
				style={styles.mainContainer}
				hasBackdrop={false}
				onStartShouldSetResponder={() => setShowCarDetails(!showCarDetails)}
			>
				{
					showCarDetails
						?	(
							<TouchableOpacity
								onPress={() => setShowCarDetails(false)}
								style={styles.modalBorders}
							>
								<Text style={styles.locationBorderTop} />
							</TouchableOpacity>
						)
						:	(
							<TouchableOpacity
								onPress={() => setShowCarDetails(true)}
								style={styles.modalBorders}
							>
								<Text style={styles.modalBorderTop} />
								<Text style={styles.modalBorderTopSec} />
							</TouchableOpacity>
						)
				}
				{
					showCarDetails
						?	(
							<Text style={styles.modalCarTitle}>{translate("activeCharging.activeCharging")}</Text>
						)
						: 	(
							<Text style={styles.modalTitle}>{translate("activeCharging.activeCharging")}</Text>
						)
				}
				<View
					style={styles.card}
				>
					<Image source={Images.markerDetailsScreen.chargingPoint} style={showCarDetails ? styles.chargeIcon2 : styles.chargeIcon} />
					<View style={styles.chargeInfo}>
						{
							(showCarDetails)
						&& (
							<Text style={styles.infoTitle}>{translate("activeCharging.chargeStation")}</Text>
						)
						}
						<Text style={styles.batteryPercentage}>11 KW</Text>
						{
							(showCarDetails)
						&& (
							<Text style={styles.batteryPercentage}>{translate("activeCharging.location")}</Text>
						)
						}
						<Text style={styles.batteryPercentage}>{translate("activeCharging.charged")}</Text>
						{
							(!showCarDetails)
						&& (
							<Text style={styles.batteryPercentage}>{translate("activeCharging.remains")}</Text>
						)
						}
					</View>
				</View>
				{
					showCarDetails
					&& (
						<View style={styles.carDetails}>
							<View style={styles.chargeDetails}>
								<TouchableOpacity style={styles.chargeCard} onPress={endRide}>
									<Image source={Images.common.closeImage} style={styles.closeIcon} />
									<Text style={styles.endChargeText}>{translate("activeCharging.endCharging")}</Text>
								</TouchableOpacity>
								<View style={styles.chargeInfo}>
									<TouchableOpacity style={styles.chargeCard} onPress={contactSupport}>
										<Image source={Images.common.supportImage} style={styles.supportIcon} />
										<Text style={styles.supportText}>{translate("activeCharging.contact")}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)
				}
				<Modal
					isVisible={endCharging}
					onBackdropPress={onCloseCharging}
					style={styles.modal}
				>
					<View style={styles.container}>
						<TouchableOpacity
							onPress={() => onCloseCharging()}
							style={styles.backButton}
						>
							<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
						</TouchableOpacity>
						<Text style={styles.titleText}>{translate("activeCharging.title")}</Text>
						<View style={styles.detailsList}>
							<Image source={Images.common.connectIcon} style={styles.connectIcon} />
							<Text style={styles.detailsListText}>{translate("activeCharging.disconnect")}</Text>
						</View>
						<View style={styles.detailsList}>
							<Image source={Images.common.closeImage} style={styles.closeImage} />
							<Text style={styles.detailsListText}>{translate("activeCharging.closeText")}</Text>
						</View>
						<View style={[styles.detailsList, styles.detailsListLast]}>
							<Image source={Images.common.doneIcon} style={styles.doneIcon} />
							<Text style={[styles.detailsListText, styles.detailsListLastText]}>
								{translate("activeCharging.doneText")}
							</Text>
						</View>
						<ButtonComponent
							buttonText={translate("activeCharging.buttonText")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onEndCharging}
							// disabled={loader}
						/>
					</View>
				</Modal>
				<Modal
					isVisible={isVisible}
					onBackdropPress={onClose}
					style={styles.modal}
				>
					<View style={styles.container}>
						<Text style={styles.titleText1}>{translate("activeCharging.message")}</Text>
						<View>
							<View style={styles.row}>
								<Text style={styles.titleText2}>{translate("activeCharging.charging")}</Text>
								<Text style={styles.subText}>{hours ? `${hours}:${minutes}` : "00:00"}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.titleText2}>{translate("activeCharging.volume")}</Text>
								<Text style={styles.subText}>{endChargingInfo?.usage ? `${endChargingInfo.usage} kW` : "0 kW" }</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.titleText2}>{translate("activeCharging.cost")}</Text>
								<Text style={styles.subText}>{endChargingInfo?.price ? `€ ${endChargingInfo.price}` : "€ 0"}</Text>
							</View>
						</View>
						<View style={styles.backButton}>
							<Text style={[styles.titleText2, styles.carDetails]}>
								{translate("activeCharging.greeting")}
							</Text>
						</View>
						<ButtonComponent
							buttonText={translate("activeCharging.okay")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onClose}
						/>
					</View>
				</Modal>
			</View>
		</>
	);
};

ActiveCharging.propTypes = {
	navigation: PropTypes.object.isRequired,
	activeCharging: PropTypes.object.isRequired,
};

export default ActiveCharging;