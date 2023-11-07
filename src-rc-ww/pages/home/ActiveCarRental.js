import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "src/styles/pages/activeCarRental";
import { Images } from "src/assets/images";
// import ButtonComponent from "src/components/ButtonComponent";
import dayjs from "dayjs";
import Config from "react-native-config";
import { translate } from "src/locales/i18n";
// import { showAlert } from "src/utils/native";

const ActiveCarRental = ({
	activeRental,
	carRideStatus,
	// userId,
	navigation,
	// dispatchHandleCarUnlock,
	// dispatchHandleCarLock,
	dispatchHandleCarSteps,
}) => {
	const [showCarDetails, setShowCarDetails] = useState(false);
	const [countDownDay, setCountDownDay] = useState(0);
	const [countDownHour, setCountDownHour] = useState(0);
	const [countDownMinute, setCountDownMinute] = useState(0);
	const [countDownSecond, setCountDownSecond] = useState(0);
	// const [loader, setLoader] = useState(false);
	const intervalRef = useRef(0);

	// console.info("active", activeRental?.status);

	// const onCarLockUnlockResponse = (response) => {
	// 	if (response.success) {
	// 		// showAlert("Success", response?.message);
	// 	} else {
	// 		showAlert("Error", response?.message);
	// 	}
	// };

	// useEffect(() => {
	// 	setLoader(false);
	// }, [carRideStatus]);

	// const onCarLock = () => {
	// 	setLoader(true);
	// 	const data = { userId, qrContent: activeRental?.asset?._id, type: "car" };
	// 	dispatchHandleCarLock(data, onCarLockUnlockResponse);
	// 	setTimeout(() => {
	// 		setLoader(false);
	// 	}, 20000);
	// };
	// const onCarUnlock = () => {
	// 	setLoader(true);
	// 	const data = { userId, qrContent: activeRental?.asset?._id, type: "car" };
	// 	dispatchHandleCarUnlock(data, onCarLockUnlockResponse);
	// 	setTimeout(() => {
	// 		setLoader(false);
	// 	}, 20000);
	// };

	const startCountDown = () => {
		if (activeRental?.rental?.endDate) {
			intervalRef.current = setInterval(() => {
				const currentDate = dayjs().format("YYYY-MM-DDTHH:mm:ss.sss");
				const endDate = activeRental?.rental?.endDate;
				const endDateInLocal = dayjs.utc(endDate).local().format("YYYY-MM-DDTHH:mm:ss.sss");
				const difference = dayjs(endDateInLocal).diff(currentDate);
				if (difference <= 0) {
					clearInterval(intervalRef.current);
				} else {
					const second = 1000; // how many milliseconds in 1 second;
					const minute = second * 60;
					const hour = minute * 60;
					const day = hour * 24;
					const days = Math.floor(difference / day);
					const hours = Math.floor((difference % day) / hour);
					const minutes = Math.floor((difference % hour) / minute);
					const seconds = Math.floor((difference % minute) / second);
					setCountDownDay(days);
					setCountDownHour(hours);
					setCountDownMinute(minutes);
					setCountDownSecond(seconds);
				}
			}, 1000);
		}
	};

	const onResponse = (res) => {
		if (res?.carPhotos) {
			navigation.navigate("EndCarRideTakeCarImages");
		} else if (res?.carState) {
			navigation.navigate("EndCarRideCarState");
		} else {
			navigation.navigate("EndCarRideCarFinalCheck");
		}
	};

	const endRide = () => {
		dispatchHandleCarSteps(onResponse);
	};

	const contactSupport = () => {
		navigation.navigate("Support");
	};

	const onExtend = () => {
		navigation.navigate("ExtendReservation");
	};

	useEffect(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		startCountDown();
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [activeRental]);
	return (
		<View
			style={styles.mainContainer}
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
						<Text style={styles.modalCarTitle}>{translate("activeCarRental.activeRide")}</Text>
					)
					: 	(
						<Text style={styles.modalTitle}>{translate("activeCarRental.activeRide")}</Text>
					)
			}
			<View
				style={styles.card}
			>
				{
					(showCarDetails) && (carRideStatus?.["door_lock"] === "locked" || carRideStatus?.["door_lock"] === "unlock pending")
					&&	(
						<Image source={Images.common.lockIcon2} style={styles.lockIcon1} />
					)
				}
				{
					(!showCarDetails) && (carRideStatus?.["door_lock"] === "locked" || carRideStatus?.["door_lock"] === "unlock pending")
					&&	(
						<Image source={Images.common.lockIcon2} style={styles.lockIcon2} />
					)
				}
				{
					(activeRental?.asset?.properties?.photo)
						? <Image source={{ uri: `${Config.ASSET_SERVICE}${activeRental.asset.properties.photo[0]}` }} style={styles.carIcon} />
						: <Image source={Images.common.car} style={styles.carIcon} />
				}
				<View style={styles.carInfo}>
					<Text style={styles.infoTitle}>{activeRental?.asset?.name}</Text>
					<Text style={styles.batteryPercentage}>{activeRental?.asset?.properties?.["license-plate"]}</Text>
					<Text style={styles.batteryPercentage}>
						{`${countDownDay} Days ${countDownHour} Hours \n ${countDownMinute} Minutes ${countDownSecond} Seconds`}
					</Text>
				</View>
			</View>
			{
				showCarDetails
					&& (
						<View style={styles.carDetails}>
							<View style={styles.rideDetails}>
								<View>
									<TouchableOpacity style={styles.rideCard} onPress={endRide}>
										<Image source={Images.common.closeImage} style={styles.closeIcon} />
										<Text style={styles.endRideText}>{translate("activeCarRental.endRide")}</Text>
									</TouchableOpacity>
								</View>
								<View>
									<TouchableOpacity
										onPress={onExtend}
										style={styles.rideCard}
									>
										<Image source={Images.common.watch2} style={styles.watchIcon} />
										<Text style={styles.extendRideText}>{translate("activeCarRental.extendRide")}</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity style={styles.rideCard} onPress={contactSupport}>
									<Image source={Images.common.supportImage} style={styles.supportIcon} />
									<Text style={styles.supportText}>{translate("activeCarRental.contact")}</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.rideDetailsTitle}>{translate("activeCarRental.stop")}</Text>
							{/* <ButtonComponent
								buttonText="lock/unlock"
								buttonStyle={styles.button}
								textStyle={styles.buttonTextsStyle}
							/> */}
							<View style={styles.buttonContainer}>
								<Text style={styles.rideDetailsTitle}>{translate("activeCarRental.keyLock")}</Text>
								{/* {
									(carRideStatus?.["door_lock"] === "unlocked" || carRideStatus?.["door_lock"] === "lock pending")
									&& (
										<ButtonComponent
											buttonText={translate("activeCarRental.lock")}
											buttonStyle={styles.button}
											textStyle={styles.buttonTextsStyle}
											buttonClicked={onCarLock}
											isLoading={loader}
											disabled={loader}
											withText={translate("activeCarRental.locking")}
										/>
									)
								}
								{
									(carRideStatus.door_lock === "locked" || carRideStatus?.["door_lock"] === "unlock pending")
									&& (
										<ButtonComponent
											buttonText={translate("activeCarRental.unlock")}
											buttonStyle={styles.button}
											textStyle={styles.buttonTextsStyle}
											buttonClicked={onCarUnlock}
											isLoading={loader}
											disabled={loader}
											withText={translate("activeCarRental.unlocking")}
										/>
									)
								} */}
							</View>
						</View>
					)
			}
		</View>
	);
};

ActiveCarRental.propTypes = {
	activeRental: PropTypes.object.isRequired,
	// userId: PropTypes.string.isRequired,
	navigation: PropTypes.object.isRequired,
	// dispatchHandleCarUnlock: PropTypes.func.isRequired,
	// dispatchHandleCarLock: PropTypes.func.isRequired,
	dispatchHandleCarSteps: PropTypes.func.isRequired
};

export default ActiveCarRental;