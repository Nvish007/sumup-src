import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import { View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Text } from "native-base";		// Form, Picker
import { SafeAreaView } from "react-native-safe-area-context";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "src/styles/pages/extendReservation";
import dayjs from "dayjs";
import { getActiveRental, getEndUserId } from "src/redux/selectors";
import { extendReservation, getLocationsRequested } from "src/redux/actions";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";
import Geolocation from "react-native-geolocation-service";
import { showAlert } from "src/utils/native";

const ExtendReservation = ({
	navigation,
	activeRental,
	endUserId,
	dispatchExtendReservation,
	dispatchGetLocation
}) => {
	const { rental } = activeRental;
	const [dateTimePickerModal, setDateTimePickerModal] = useState(false);
	const [endDateTime, setEndDateTime] = useState(dayjs.utc(rental?.endDate).local().format("DD MMMM YYYY HH:mm"));	// format("DD MMMM YYYY HH:mm")
	const [startDateTime] = useState(dayjs.utc(rental?.startDate).local().format("DD MMMM YYYY HH:mm"));
	const [endDate, setEndDate] = useState(dayjs.utc(rental?.endDate).format("YYYY-MM-DD hh:mm:ss"));
	const [extensionSuccess, setExtensionSuccess] = useState(false);
	const [extensionUnSuccess, setExtensionUnSuccess] = useState(false);
	const minimumDate = dayjs().toDate();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.feedback")
		});
	}, [navigation]);

	const onConfirmDateTimePicker = (dateTime) => {
		const formattedDateTime = dayjs(dateTime).format("DD MMMM YYYY HH:mm");
		const endDateUTC = dayjs.utc(dateTime).format("YYYY-MM-DD hh:mm:ss");
		setDateTimePickerModal(false);
		setEndDateTime(formattedDateTime);
		setEndDate(endDateUTC);
	};

	const onExtendResponse = (response) => {
		if (response.success) {
			setExtensionSuccess(true);
		} else {
			setExtensionUnSuccess(true);
		}
	};

	const extend = () => {
		if (endDateTime > startDateTime) {
			const data = { rentalId: rental?.id, endDate };
			dispatchExtendReservation(data, onExtendResponse);
		} else {
			Alert.alert(translate("alert.endDate"));
		}
	};

	const onModalHide = () => {
		// Calling location/map api to get latest count down for car rental after extending reservation
		Geolocation.getCurrentPosition(
			({ coords }) => {
				const userData = { userId: endUserId, latitude: coords.latitude, longitude: coords.longitude };
				dispatchGetLocation(userData, "sharingService");
				navigation.navigate("Home");
			},
			(error) => showAlert("Error", error.message),
			{ timeout: 20000, maximumAge: 1000 }
		);
	};

	return (
		<>
			<SafeAreaView style={styles.safeView}>
				<ScrollView style={styles.mainScrollView}>
					<View>
						<Text style={styles.startTimeTitle}>{translate("extendReservation.startTime")}</Text>
						<TouchableOpacity
							style={styles.startTimeValueContainer}
							disabled={true}
						>
							<Text style={styles.startTimeValue}>
								{startDateTime}
							</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Text style={styles.endTimeTitle}>{translate("extendReservation.endTime")}</Text>
						<TouchableOpacity
							style={styles.endTimeValueContainer}
							onPress={() => setDateTimePickerModal(true)}
						>
							<Text style={styles.endTimeValue}>{endDateTime}</Text>
						</TouchableOpacity>
					</View>
					{/* <View>
						<Text style={styles.locationDropDownTitle}>{translate("extendReservation.location")}</Text>
						<View style={styles.locationContainer}>
							<Form style={styles.dropDownStyle}>
								<Picker
									iosIcon={<FontAwesome name="caret-down" color="#333" style={styles.caretDownIcon} />}
									style={styles.dropDownPicker}
								>
									<Picker.Item label="Location current rental car" />
								</Picker>
							</Form>
							<TouchableOpacity>
								<Text style={styles.showMapText}>{translate("extendReservation.showMap")}</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View>
						<Text style={styles.typeOfVehicleTitle}>{translate("extendReservation.TypeOfVehicle")}</Text>
						<Form style={styles.dropDownStyle}>
							<Picker
								iosIcon={<FontAwesome name="caret-down" color="#333" style={styles.caretDownIcon} />}
								style={styles.dropDownPicker}
							>
								<Picker.Item label="Current car" />
							</Picker>
						</Form>
					</View> */}
				</ScrollView>
				<View style={styles.extendButtonContainer}>
					<Button
						buttonText={translate("extendReservation.extend")}
						buttonStyle={styles.extendButton}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={extend}
					/>
					<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
				</View>
				<DateTimePickerModal
					date={new Date(endDateTime)}
					is24Hour={true}
					locale="en_GB"
					isVisible={dateTimePickerModal}
					mode="datetime"
					minimumDate={minimumDate}
					onConfirm={onConfirmDateTimePicker}
					onCancel={() => setDateTimePickerModal(false)}
					onHide={() => setDateTimePickerModal(false)}
				/>
			</SafeAreaView>
			<Modal
				isVisible={extensionSuccess}
				style={styles.modal}
				onModalHide={onModalHide}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.extensionSuccess}>{translate("extendReservation.extensionSuccessMessage")}</Text>
					<Image source={Images.common.thumbsUp} style={styles.thumbsupIcon} />
					<Button
						buttonText={translate("extendReservation.okay")}
						buttonStyle={styles.modalOkayButtonStyle}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={() => setExtensionSuccess(false)}
					/>
				</View>
			</Modal>
			<Modal
				isVisible={extensionUnSuccess}
				style={styles.modal}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.extensionUnsuccess}>{translate("extendReservation.extensionUnSuccessMessage")}</Text>
					<Image source={Images.common.thumbsDown} style={styles.thumbsDownIcon} />
					<Button
						buttonText={translate("extendReservation.okay")}
						buttonStyle={styles.modalOkayButtonStyle}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={() => setExtensionUnSuccess(false)}
					/>
				</View>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({
	activeRental: getActiveRental(state),
	endUserId: getEndUserId(state)
});

const mapDispatchToProps = {
	dispatchExtendReservation: extendReservation,
	dispatchGetLocation: getLocationsRequested
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtendReservation);