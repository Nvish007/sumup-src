import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Image } from "react-native";
import { Images } from "src/assets/images";
import { Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "src/components/ImageComponent";
import styles from "src/styles/pages/reservationBookingConfirm";
import Button from "src/components/ButtonComponent";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import { translate } from "src/locales/i18n";
import {
	handleCreateReservation,
} from "src/redux/actions";
import { getEndUserId } from "src/redux/selectors";
import Config from "react-native-config";

const BookingConfirmation = ({
	route,
	navigation,
	endUserId,
	dispatchCreateReservation,
}) => {
	const { name, type, _id, location, startdate, enddate, properties } = route.params.reservation;
	const [bookingConfirmModal, updateBookingConfirmModal] = useState(false);

	const startDate = dayjs.utc(startdate).local().format("DD-MM-YYYY HH:mm");
	const endDate = dayjs.utc(enddate).local().format("DD-MM-YYYY HH:mm");
	const onPressOkay = () => {
		updateBookingConfirmModal(false);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.bookingConfirmation")
		});
	}, [navigation]);

	const navigateToHome = () => {
		navigation.navigate("Reservations", { navigate: "yes" });
	};
	const onResponse = (response) => {
		if (response?.success) {
			updateBookingConfirmModal(true);
		}
	};
	const onBookingConfirm = () => {
		const bookingData = {
			user_id: endUserId,
			location: location?.externalId,
			asset_id: _id,
			fleet_type: "4",
			startdate: startdate,
			enddate: enddate,
		};
		// console.info(bookingData);
		dispatchCreateReservation(bookingData, onResponse);
	};

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.bookingDetailsContainer}>
					{
						(type === "car")
						&& (
							(properties?.photo)
								? (
									<Image source={{ uri: `${Config.ASSET_SERVICE}${properties?.photo[0]}` }} style={styles.bookingDetailsImage} />
								)
								: (
									<FastImage
										style={styles.bookingDetailsImage}
										imageUrl={Images.common.car}
										resizeMode="cover"
										type="local"
									/>
								)
						)
					}
					{
						(type === "bike")
						&& (
							<FastImage
								style={styles.bookingDetailsImage}
								imageUrl={Images.common.bicycle}
								resizeMode="cover"
								type="local"
							/>
						)
					}
					<View style={styles.bookingDetails}>
						<View>
							<Text style={styles.boldText}>{name ? name : "Renault Zoe"}</Text>
							{
								(type === "car")
								&& (
									<Text style={styles.carModelText}>{properties?.["license-plate"]}</Text>
								)
							}
						</View>
						<View style={styles.bookingDetailsAddress}>
							<Text style={styles.carModelText}>{location?.address}</Text>
							<Text style={styles.carModelText}>{`${location?.zip} ${location?.city}`}</Text>
						</View>
					</View>
				</View>
				{/* <View style={styles.pricingContainer}>
					<Text style={styles.pricingTitle}>Pricing</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>Average price</Text>
						<Text>3.99 €</Text>
					</View>
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>Price per km</Text>
						<Text>0.19 €</Text>
					</View>
					<View style={styles.dottedLines} />
				</View> */}
				<View>
					<Text style={styles.pricingTitle}>{translate("bookingConfirmation.details")}</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{translate("bookingConfirmation.start")}</Text>
						<Text>{startDate}</Text>
					</View>
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>{translate("bookingConfirmation.end")}</Text>
						<Text>{endDate}</Text>
					</View>
					<View style={styles.dottedLines} />
				</View>
				{/* <View>
					<Text style={styles.pricingTitle}>Extra Information</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>Number of seats</Text>
						<Text>5</Text>
					</View>
				</View> */}
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("bookingConfirmation.confirm")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onBookingConfirm} // updateBookingConfirmModal(true)
				/>
			</View>
			<Modal
				isVisible={bookingConfirmModal}
				style={styles.modal}
				onModalHide={navigateToHome}
			>
				<View
					style={styles.modalContainer}
				>
					<Text style={styles.modalTitle}>{translate("bookingConfirmation.reservationSucces")}</Text>
					<Image source={Images.common.thumbsUp} style={styles.modalThumbsUpImage} />
					<Button
						buttonText={translate("bookingConfirmation.okay")}
						style={styles.modalOkayButtonContainer}
						buttonStyle={styles.modalOkayButtonStyle}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onPressOkay}
					/>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchCreateReservation: handleCreateReservation,
};
export default connect(mapStateToProps, mapDispatchToProps)(BookingConfirmation);