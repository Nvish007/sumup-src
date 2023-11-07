import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import styles from "src/styles/pages/activeReservation";
import ButtonComponent from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";

const ActiveReservation = ({
	onReservationExpired,
	onScanNow,
	activeReservation
}) => {
	const [reservationExpiredModal, updateReservationExpiredModal] = useState(false);
	const [reservationExpired, updateReservationExpired] = useState(false);
	const [minutesCountDown, updateMinutesCountDown] = useState(0);
	const [secondsCountDown, updateSecondsCountDown] = useState(0);
	const intervalRef = useRef(0);

	const startTimer = () => {
		// Split timestamp into [ Y, M, D, h, m, s ]
		let currentDate = new Date();
		// let enddate = activeReservation.enddate.split(/[- :]/);
		let enddate = activeReservation.enddate.replace("T", " ").split(/[- :]/);
		// enddate = new Date(Date.UTC(enddate[0], enddate[1] - 1, enddate[2], enddate[3], enddate[4], enddate[5]));
		enddate = new Date(Date.UTC(enddate[0], enddate[1] - 1, enddate[2], enddate[3], enddate[4], enddate[5].split(".")[0]));
		let diff = Math.abs(enddate - currentDate); // in milliseconds
		let totalSeconds = diff / 1000; // 20 is considered as minutes and 60 is used for converting into seconds (1200 seconds).
		let minutes;
		let seconds;

		intervalRef.current = setInterval(() => {
			minutes = parseInt(totalSeconds / 60, 10);
			seconds = parseInt(totalSeconds % 60, 10);
			updateMinutesCountDown(minutes);
			updateSecondsCountDown(seconds);
			if (totalSeconds <= 0) {
				updateReservationExpired(true);
				onReservationExpired();
				updateReservationExpiredModal(true);
				clearInterval(intervalRef.current);
			}
			totalSeconds -= 1;
		}, 1000);
	};

	useEffect(() => {
		clearInterval(intervalRef.current);
		startTimer();
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [activeReservation]);

	return (
		<>
			{
				!reservationExpired
				&& (
					<View style={styles.container}>
						<TouchableOpacity>
							<Text style={styles.modalBorderTop} />
							<Text style={styles.modalBorderTopSec} />
						</TouchableOpacity>
						<Text style={styles.modalTitle}>{translate("activeReservation.title")}</Text>
						<View
							style={styles.card}
						>
							{
								(activeReservation.fleet_type === "7")
									? <Image source={Images.markerDetailsScreen.chargingPoint} style={styles.bicycleIcon} />
									: <Image source={Images.common.bicycleBoxImage} style={styles.bicycleIcon} />
							}
							<View style={styles.bicycleInfo}>
								{
									(activeReservation.fleet_type === "7")
										? <Text style={styles.InfoTitle}>{translate("activeReservation.chargePoint")}</Text>
										: <Text style={styles.InfoTitle}>{translate("activeReservation.ebike")}</Text>
								}
								<Text style={styles.batteryPercentage}>{ activeReservation?.location?.name }</Text>
								<Text style={styles.batteryPercentage}>{`${translate("activeReservation.expiring")} ${minutesCountDown} ${translate("activeReservation.min")} ${secondsCountDown} ${translate("activeReservation.seconds")}`}</Text>
							</View>
						</View>
						<ButtonComponent
							buttonText={translate("homeScreen.buttonText")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onScanNow}
						/>
					</View>
				)
			}
			<Modal
				isVisible={reservationExpiredModal}
				onBackdropPress={() => updateReservationExpiredModal(false)}
			>
				<View
					style={styles.unlockBikeContainer}
				>
					{
						(activeReservation.fleet_type === "7")
							? <Text style={styles.unlockBikeTitle1}>{translate("activeReservation.chargePointExpired")}</Text>
							: <Text style={styles.unlockBikeTitle1}>{translate("activeReservation.ebikeExpired")}</Text>
					}
					<Image source={Images.common.redClockIcon} style={styles.unlockBikeClockIcon} />
					<Text style={styles.unlockBikeTitle2}>{translate("activeReservation.notice")}</Text>
					<ButtonComponent
						buttonText={translate("activeReservation.okay")}
						style={styles.buttonContainer}
						buttonStyle={styles.OkayButton}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={() => updateReservationExpiredModal(false)}
					/>
				</View>
			</Modal>
		</>
	);
};

ActiveReservation.propTypes = {
	onReservationExpired: PropTypes.func.isRequired,
	onScanNow: PropTypes.func.isRequired,
	activeReservation: PropTypes.object.isRequired
};

export default ActiveReservation;