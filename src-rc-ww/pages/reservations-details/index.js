import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Images } from "src/assets/images";
import { Text } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/reservationsDetails";
import Button from "src/components/ButtonComponent";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import Config from "react-native-config";
import { startRental, locateReservation, cancelReservation, startRentalSuccess, getLocationsRequested, handleCarSteps, handleCarUnlock } from "src/redux/actions";
import { getEndUserId, getSelectedReservation } from "src/redux/selectors";

const ReservationsDetailsScreen = ({
	navigation,
	endUserId,
	reservation,
	dispatchStartRental,
	dispatchLocateReservation,
	dispatchCancelReservation,
	dispatchRentalSuccess,
	dispatchGetLocation,
	dispatchHandleCarSteps,
	dispatchHandleCarUnlock
}) => {
	// console.info(reservation.location);
	const [cancelModal, updateCancelModal] = useState(false);
	const [isVisible, updateIsVisible] = useState(false);
	const serviceType = "sharingService";
	const [counter, setCounter] = useState(0);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.reservationDetails")
		});
	}, [navigation]);

	useEffect(() => {
		const timer = counter > 0 && setInterval(() => {
			setCounter(counter - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [counter]);

	const onResponse = () => {
		const { location: { latitude, longitude } } = reservation;
		const userInfo = { latitude: parseFloat(latitude), longitude: parseFloat(longitude), userId: endUserId };
		dispatchGetLocation(userInfo, serviceType);
		setCounter(60);
		updateIsVisible(true);
	};

	const onRentPopUp = () => {
		const data = {
			userId: endUserId,
			qrContent: reservation.asset._id,
			type: reservation?.asset?.type
		};
		dispatchHandleCarUnlock(data, onResponse);
	};

	const onLocate = () => {
		const { location: { latitude, longitude } } = reservation;
		const data = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
		dispatchLocateReservation(data);
		navigation.navigate("Home");
	};
	const onNavigate = (res) => {
		if (res?.carPhotos) {
			navigation.navigate("TakeCarRentalImages");
		} else if (res?.carState) {
			navigation.navigate("StartRentalCarState");
		} else {
			onRentPopUp();
		}
	};

	const onStartRentResponse = () => {
		dispatchHandleCarSteps(onNavigate);
	};

	const startRent = (assetId) => {
		if (reservation?.rentalId === 0 || reservation.rentalId === null) {
			const data = { userId: endUserId, assetId, status: "active", startDate: new Date(), reservationId: reservation.id, endDate: reservation.enddate };
			dispatchStartRental(data, onStartRentResponse);
		} else {
			dispatchRentalSuccess(reservation?.rentalId);
			onStartRentResponse();
		}
	};

	const onCancelReservationResponse = () => {
		const { location: { latitude, longitude } } = reservation;
		const userInfo = { latitude: latitude, longitude: longitude, userId: endUserId };
		dispatchGetLocation(userInfo, "sharingService");
		navigation.navigate("Reservations", { navigate: "cancel" });
	};

	const onStartRide = () => {
		navigation.navigate("Home");
	};

	const onCancelReservation = () => {
		const data = { userId: endUserId, reservationId: reservation?.id };
		dispatchCancelReservation(data, onCancelReservationResponse);
		onCloseModal();
	};

	const onCloseModal = () => {
		updateCancelModal(false);
	};

	const canStartRent = () => {
		if (__DEV__) {
			return false;
		} else {
			const { startdate } = reservation;
			const startdateInLocal = dayjs.utc(startdate).local().format("YYYY-MM-DDTHH:mm:ss.sss");
			const currentdate = dayjs().format("YYYY-MM-DDTHH:mm:ss.sss");
			const startDateObject = new Date(startdateInLocal);
			const currentDateObject = new Date(currentdate);
			const minuteDifference = dayjs(startDateObject).diff(currentDateObject, "minute");
			if (minuteDifference <= 5 && minuteDifference > 0) {
				return false;
			} else {
				return true;
			}
		}
	};

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.bookingDetailsContainer}>
					{
						(reservation?.asset?.type === "car")
						&&	(
							(reservation?.asset?.properties?.photo) ? <Image source={{ uri: `${Config.ASSET_SERVICE}${reservation.asset.properties.photo[0]}` }} style={styles.bookingDetailsImage} /> : <Image source={Images.common.car} style={styles.bookingDetailsImage} />
						)
					}
					{
						(reservation?.asset?.type === "bike" || reservation?.["fleet_type"] === "1")
						&&	(
							<Image source={Images.common.bicycle} style={styles.bookingDetailsImage} />
						)
					}
					{
						(reservation?.fleettypes?.assetType == "charging_pole")
						&& (
							<Image source={Images.markerDetailsScreen.chargingPoint} style={styles.chargingImage} />
						)
					}
					<View style={styles.bookingDetails}>
						<View>
							<Text style={styles.boldText}>{reservation?.asset?.name}</Text>
							<Text style={styles.carModelText}>{reservation.asset?.properties?.["license-plate"]}</Text>
							{/* <Text style={styles.carModelText}>ABC-123</Text> */}
						</View>
						<View style={styles.bookingDetailsAddress}>
							<Text style={styles.boldText}>{reservation?.location?.name}</Text>
							<Text style={styles.carModelText}>{`${reservation?.location?.address}`}</Text>
							<Text style={styles.carModelText}>{`${reservation?.location?.zip} ${reservation?.location?.city}`}</Text>
						</View>
					</View>
				</View>
				<View style={styles.pricingContainer}>
					<Text style={styles.pricingTitle}>{translate("reservationDetails.reservationNumber")}</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{reservation.reservation_number}</Text>
					</View>
					<View style={styles.dottedLines} />
				</View>
				<View>
					<Text style={styles.pricingTitle}>{translate("reservationDetails.details")}</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{translate("reservationDetails.start")}</Text>
						<Text>{dayjs.utc(reservation.startdate).local().format("DD/MM/YYYY HH:mm")}</Text>
					</View>
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>{translate("reservationDetails.end")}</Text>
						<Text>{dayjs.utc(reservation.enddate).local().format("DD/MM/YYYY HH:mm")}</Text>
					</View>
					<View style={styles.dottedLines} />
				</View>
				{/* <View>
					<Text style={styles.pricingTitle}>Extra Information</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>Number of seats</Text>
						<Text>5</Text>
					</View>
					<View style={styles.dottedLines} />
				</View> */}
				<View style={styles.carBlog}>
					{
						(!reservation.rentalId || reservation.rentalId === 0)
						&& (
							<TouchableOpacity
								style={[styles.carBlogInner, styles.carCancelInner]}
								onPress={() => updateCancelModal(true)}
							>
								<Image source={Images.common.cancelIcon} style={styles.cancelIcon} />
								<Text style={styles.carBlogTitle}>{translate("reservationDetails.cancel")}</Text>
							</TouchableOpacity>
						)
					}
					{/* <TouchableOpacity
						style={styles.carBlogInner}
					>
						<Image source={Images.authScreen.editImage} style={styles.editIcon} />
						<Text style={styles.carBlogTitle}>{translate("reservationDetails.modify")}</Text>
					</TouchableOpacity> */}
					{
						(false) && (reservation?.asset?.type === "car" || reservation?.asset?.type === "bike")
						&& (
							<TouchableOpacity
								style={styles.carBlogInner}
							>
								<Image source={Images.authScreen.editImage} style={styles.editIcon} />
								<Text style={styles.carBlogTitle}>{translate("reservationDetails.modify")}</Text>
							</TouchableOpacity>
						)
					}
					<TouchableOpacity
						style={styles.carBlogInner}
						onPress={onLocate}
					>
						<Image source={Images.common.searchIcon} style={styles.searchIcon} />
						<Text style={styles.carBlogTitle}>{translate("reservationDetails.locate")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			{
				(!reservation.rentalId || reservation.rentalId === 0) && (reservation?.asset?.type === "car" || reservation?.asset?.type === "bike")
				&&	(
					<View style={styles.verifyButtonContainer}>
						<Button
							buttonText={translate("reservationDetails.startRent")}
							buttonStyle={styles.confirmButton}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={() => startRent(reservation.asset_id)}
							disabled={canStartRent()}
						/>
						<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
					</View>
				)
			}
			<Modal
				isVisible={cancelModal}
				onBackdropPress={onCloseModal}
				style={styles.modal}
			>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => onCloseModal()}
						style={styles.backButton}
					>
						<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
					</TouchableOpacity>
					<View>
						<Text style={styles.titleText2}>{translate("reservationDetails.modalText1")}</Text>
					</View>
					<View>
						<Text style={styles.titleText2}>{translate("reservationDetails.modalText2")}</Text>
					</View>
					<Button
						buttonText={translate("reservationDetails.confirm")}
						style={styles.buttonContainer}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onCancelReservation}
					/>
				</View>
			</Modal>
			<Modal
				isVisible={isVisible}
				style={styles.modal}
			>
				<View style={styles.container}>
					{
						counter <= 30
						&& (
							<TouchableOpacity style={styles.closeIcon} onPress={onStartRide}>
								<AntDesign
									name="closecircleo"
									size={25}
								/>
							</TouchableOpacity>
						)
					}
					<Text style={styles.titleText}>{translate("startRentalCarState.carUnlocking")}</Text>
					<View>
						<Text style={[styles.titleText2]}>
							{`${translate("startRentalCarState.wait")} ${counter} ${translate("startRentalCarState.seconds")}`}
						</Text>
					</View>
					<Button
						buttonText={translate("startRentalCarState.okay")}
						style={styles.buttonContainer}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onStartRide}
						disabled={counter > 30}
					/>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	reservation: getSelectedReservation(state),
});

const mapDispatchToProps = {
	dispatchStartRental: startRental,
	dispatchLocateReservation: locateReservation,
	dispatchCancelReservation: cancelReservation,
	dispatchRentalSuccess: startRentalSuccess,
	dispatchGetLocation: getLocationsRequested,
	dispatchHandleCarSteps: handleCarSteps,
	dispatchHandleCarUnlock: handleCarUnlock
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsDetailsScreen);
