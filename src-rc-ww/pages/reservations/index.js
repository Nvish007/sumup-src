import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Images } from "src/assets/images";
import { Text } from "native-base";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/reservations";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "src/components/ButtonComponent";
// import { MqttService } from "src/utils/mqttServices";
import Config from "react-native-config";
import {
	getMyReservations,
	startRental,
	locateReservation,
	selectReservation,
	startRentalSuccess,
	handleCarSteps,
	getLocationsRequested,
	handleCarUnlock
} from "src/redux/actions";
import { getMyReservationList, getEndUserId } from "src/redux/selectors";
import dayjs from "dayjs";

const ReservationsScreen = ({
	route,
	navigation,
	endUserId,
	myReservations,
	dispatchGetMyReservations,
	dispatchStartRental,
	dispatchLocateReservation,
	dispatchSelectedReservation,
	dispatchRentalSuccess,
	dispatchHandleCarSteps,
	dispatchGetLocation,
	dispatchHandleCarUnlock
}) => {
	const [isVisible, updateIsVisible] = useState(false);
	const [loader, setLoader] = useState(false);
	const serviceType = "sharingService";
	let change = route?.params?.navigate;
	const [counter, setCounter] = useState(0);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.myReservations")
		});
	}, [navigation]);

	useEffect(() => {
		const timer = counter > 0 && setInterval(() => {
			setCounter(counter - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [counter]);

	useEffect(() => {
		dispatchGetMyReservations();
	}, [change]);

	const onResponse = (res, item) => {
		const { location: { latitude, longitude } } = item;
		const userInfo = { latitude: parseFloat(latitude), longitude: parseFloat(longitude), userId: endUserId };
		dispatchGetLocation(userInfo, serviceType);
		setCounter(60);
		updateIsVisible(true);
	};

	const onRentPopUp = (item) => {
		const data = {
			userId: endUserId,
			qrContent: item?.asset?._id,
			type: item?.asset?.type,
		};
		setLoader(false);
		dispatchHandleCarUnlock(data, onResponse);
	};

	const onNavigate = (res, item) => {
		if (res?.carPhotos) {
			setLoader(false);
			navigation.navigate("TakeCarRentalImages");
		} else if (res?.carState) {
			setLoader(false);
			navigation.navigate("StartRentalCarState");
		} else {
			onRentPopUp(item);
		}
	};

	const onStartRentResponse = () => {
		dispatchHandleCarSteps(onNavigate);
	};

	const startRent = (assetId, item) => {
		setLoader(true);
		dispatchSelectedReservation(item);
		if (item?.rentalId === 0 || item.rentalId === null) {
			const data = { userId: endUserId, assetId, status: "active", startDate: new Date(), reservationId: item.id, endDate: item.enddate };
			dispatchStartRental(data, onStartRentResponse);
		} else {
			dispatchRentalSuccess(item.rentalId);
			onStartRentResponse();
		}
	};

	const onLocate = (reservation) => {
		const { location: { latitude, longitude } } = reservation;
		const data = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
		dispatchLocateReservation(data);
		navigation.navigate("Home");
	};

	const onStartRide = () => {
		navigation.navigate("Home");
	};

	const canStartRent = (reservation) => {
		if (!__DEV__) {
			return false;
		} else {
			const { startdate } = reservation;
			const startdateInLocal = dayjs.utc(startdate).local().format("YYYY-MM-DDTHH:mm:ss.sss");
			const currentdate = dayjs().format("YYYY-MM-DDTHH:mm:ss.sss");
			const startDateObject = new Date(startdateInLocal);
			const currentDateObject = new Date(currentdate);
			const minuteDifference = dayjs(startDateObject).diff(currentDateObject, "minute");
			if (minuteDifference <= 5) {
				return false;
			} else {
				return true;
			}
		}
	};

	const goToDetails = (item) => {
		dispatchSelectedReservation(item);
		navigation.navigate("ReservationDetails");
	};

	return (
		<SafeAreaView
			style={styles.safeView}
			edges={["right", "bottom", "left"]}
		>
			<ScrollView style={styles.reservationsScrollView}>
				{
					myReservations.length > 0
						?	myReservations.map((reservation) => (
							<View style={styles.myReservationList} key={reservation.id}>
								<View style={styles.carDetails}>
									{
										(reservation?.asset?.type === "car")
										&&	(
											(reservation?.asset?.properties?.photo) ? <Image source={{ uri: `${Config.ASSET_SERVICE}${reservation.asset.properties.photo[0]}` }} style={styles.carImage} /> : <Image source={Images.common.car} style={styles.carImage} />
										)
									}
									{
										(reservation?.asset?.type === "bike" || reservation?.["fleet_type"] === "1")
										&&	(
											<Image source={Images.common.bicycle} style={styles.bikeImage} />
										)
									}
									{
										(reservation?.fleettypes?.assetType == "charging_pole")
										&& (
											<Image source={Images.markerDetailsScreen.chargingPoint} style={styles.chargingImage} />
										)
									}
									<View style={styles.bookingDetails}>
										<Text style={styles.carTitle}>{reservation?.asset?.name}</Text>
										{
											(reservation?.fleettypes?.assetType == "charging_pole")
											&& (
												<Text style={styles.carTitle}>{translate("newReservation.chargePole")}</Text>
											)
										}
										{
											(reservation?.asset?.type === "car")
											&& (
												<Text style={styles.locationText}>{reservation?.asset?.properties?.["license-plate"]}</Text>
											)
										}
										<Text style={styles.locationText}>{reservation?.location?.name}</Text>

										<Text style={styles.locationDate}>{`Start: ${dayjs.utc(reservation.startdate).local().format("DD/MM HH:mm")}`}</Text>
										<Text style={styles.locationDate}>{`End:   ${dayjs.utc(reservation.enddate).local().format("DD/MM HH:mm")}`}</Text>
									</View>
								</View>
								<View style={styles.carBlog}>
									<TouchableOpacity
										style={styles.carBlogInner}
										onPress={() => onLocate(reservation)}
									>
										<Image source={Images.common.searchIcon} style={styles.searchIcon} />
										<Text style={styles.carBlogTitle}>{translate("newReservation.locate")}</Text>
									</TouchableOpacity>
									{
										(false) && (reservation?.asset?.type === "car" || reservation?.asset?.type === "bike")
										&& (
											<View style={styles.carBlogInner}>
												<Image source={Images.authScreen.editImage} style={styles.editIcon} />
												<Text style={styles.carBlogTitle}>{translate("newReservation.modify")}</Text>
											</View>
										)
									}
									<TouchableOpacity
										style={styles.carBlogInner}
										onPress={() => goToDetails(reservation)}	// navigation.navigate("ReservationDetails", { reservation })}
									>
										<Image source={Images.common.detailsIcon} style={styles.detailsIcon} />
										<Text style={styles.carBlogTitle}>{translate("newReservation.details")}</Text>
									</TouchableOpacity>
								</View>
								{
									(!reservation.rentalId || reservation.rentalId === 0) && (reservation?.asset?.type === "car" || reservation?.asset?.type === "bike")
									&&	(
										<Button
											buttonText={translate("newReservation.startRent")}
											buttonStyle={styles.confirmButton}
											textStyle={styles.buttonTextsStyle}
											buttonClicked={() => startRent(reservation.asset_id, reservation)}
											isLoading={loader}
											disabled={canStartRent(reservation) || loader}
										/>
									)
								}
							</View>
						))
						:	(
							<View style={styles.noReservationFound}>
								<Text style={styles.carTitle}>{translate("newReservation.noReservation")}</Text>
								<TouchableOpacity
									style={styles.noReservationFound}
									onPress={() => navigation.navigate("NewReservations")}
								>
									<Text style={styles.clickText}>{translate("newReservation.click")}</Text>
								</TouchableOpacity>
							</View>
						)
				}
			</ScrollView>
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
	myReservations: getMyReservationList(state),
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchGetMyReservations: getMyReservations,
	dispatchStartRental: startRental,
	dispatchLocateReservation: locateReservation,
	dispatchSelectedReservation: selectReservation,
	dispatchRentalSuccess: startRentalSuccess,
	dispatchHandleCarSteps: handleCarSteps,
	dispatchGetLocation: getLocationsRequested,
	dispatchHandleCarUnlock: handleCarUnlock
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsScreen);