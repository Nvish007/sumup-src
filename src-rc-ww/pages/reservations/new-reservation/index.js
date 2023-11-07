import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { View, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { Text, Form } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/newReservation";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { translate } from "src/locales/i18n";
import dayjs from "dayjs";
import {
	handleLocationTypes,
	searchReservation,
	locateReservation
} from "src/redux/actions";
import {
	getEndUserId,
	getLocationAndFleets,
	getClientGroupId
} from "src/redux/selectors";

const NewReservationsScreen = ({
	route,
	navigation,
	endUserId,
	locationAndFleet,
	clientGroupId,
	dispatchHandleLocationTypes,
	dispatchSearchReservation,
	dispatchLocateReservation
}) => {
	const [vehicleType, updateVehicleType] = useState("");
	const [location, updateLocation] = useState("");
	const [startDateTime, updateStartDateTime] = useState(dayjs().add(5, "minute").format("DD MMMM YYYY HH:mm"));
	const [endDateTime, updateEndDateTime] = useState(dayjs().add(65, "minute").format("DD MMMM YYYY HH:mm"));
	const [dateTimePickerModal, updateDateTimePickerModal] = useState({ status: false, timeType: "" }); // timeType is used to keep track for which input date and time is going to be selected (start time or end time)

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.newReservation")
		});
	}, [navigation]);

	const onSearchResponse = (res) => {
		if (res?.success) {
			navigation.navigate("ReservationSelectCar");
		} else {
			Alert.alert(translate("alert.vehicleList"));
		}
	};

	const onSearch = () => {
		const startDateFormate = dayjs(startDateTime).format("MM/DD/YYYY HH:mm:ss");
		const endDateFormate = dayjs(endDateTime).format("MM/DD/YYYY HH:mm:ss");

		const startUTC = dayjs(startDateFormate).toISOString();
		const endUTC = dayjs(endDateFormate).toISOString();
		const startDate = dayjs(startUTC).format("YYYY-MM-DD HH:mm");
		const endDate = dayjs(endUTC).format("YYYY-MM-DD HH:mm");
		if (startDate < endDate) {
			const data = {
				fleetTypeId: 4,		// route.params ? 4 : vehicleType
				startdate: startDate,
				enddate: endDate,
				location: location,
				userId: endUserId,
				clientGroupId
			};
			dispatchSearchReservation(data, onSearchResponse);
		} else {
			Alert.alert(translate("alert.endDate"));
		}
	};

	const onConfirmDateTimePicker = (dateTime) => {
		const formattedDateTime = dayjs(dateTime).format("DD MMMM YYYY HH:mm");
		if (dateTimePickerModal.timeType === "startTime") {
			updateStartDateTime(formattedDateTime);
		} else {
			updateEndDateTime(formattedDateTime);
		}
		updateDateTimePickerModal({ ...dateTimePickerModal, status: false });
	};
	useEffect(() => {
		dispatchHandleLocationTypes(endUserId);
	}, []);

	useEffect(() => {
		if (locationAndFleet?.fleettypes) {
			if (route.params) {
				updateVehicleType(route?.params?.vehicleId);
			} else {
				updateVehicleType(locationAndFleet?.fleettypes?.[0]?.id);
			}
		}
		if (locationAndFleet?.locations) {
			if (route.params) {
				updateLocation(route?.params?.locationId);
			} else {
				updateLocation(locationAndFleet?.locations?.[0]?.["location_id"]);
			}
		}
	}, [locationAndFleet]);

	const onShowMap = (latitude, longitude) => {
		const data = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
		dispatchLocateReservation(data);
		navigation.navigate("Home");
	};
	// let locationName = route?.params?.name;
	// let locationId = route?.params?.id;
	// let carType = route?.params?.type;
	// let carID = route?.params?.carId;
	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.startTimeContainer}>
					<Text style={styles.startTimeTitle}>{translate("reservationsScreen.Starttime")}</Text>
					<TouchableOpacity
						style={styles.startTimeValueContainer}
						onPress={() => updateDateTimePickerModal({ status: true, timeType: "startTime" })}
					>
						<Text style={styles.startTimeValue}>{startDateTime}</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Text style={styles.endTimeTitle}>{translate("reservationsScreen.endtime")}</Text>
					<TouchableOpacity
						style={styles.endTimeValueContainer}
						onPress={() => updateDateTimePickerModal({ status: true, timeType: "endTime" })}
					>
						<Text style={styles.endTimeValue}>{endDateTime}</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text style={styles.vehicleDropDownTitle}>{translate("reservationsScreen.location")}</Text>
					<View style={styles.locationContainer}>
						<Form style={styles.dropDownStyle}>
							{/* <Picker
								iosIcon={<FontAwesome name="caret-down" color="#333" style={styles.caretDownIcon} />}
								selectedValue={location}
								onValueChange={(value) => updateLocation(value)}
								style={styles.dropDownPicker}
								textStyle={styles.pickerText}
							>
								{
									(locationAndFleet?.locations)
									&& (locationAndFleet?.locations.map((item) => {
										return <Picker.Item key={item.location_id} value={item.location_id} label={item.location_name} />;
									}))
								}
								{
									(route.params)
									&& (
										<Picker.Item key={locationId} value={locationId} label={locationName} />
									)
								}
							</Picker> */}
							{/* <SelectPicker
								selectedValue={location}
								onValueChange={(value) => updateLocation(value)}
								style={styles.dropDownPicker}
							>
								{
									(locationAndFleet?.locations)
									&& (locationAndFleet?.locations.map((item) => {
										return <SelectPicker.Item key={item.location_id} value={item.location_id} label={item.location_name} />;
									}))
								}
							</SelectPicker> */}
						</Form>
						<View style={styles.marginLeft}>
							{
								(locationAndFleet?.locations)
										&& (locationAndFleet?.locations.map((item) => {
											if (item.location_id === location) {
												return (
													<TouchableOpacity
														onPress={() => onShowMap(item.latitude, item.longitude)}
														key={item.location_id}
													>
														<Text style={styles.showMapText}>{translate("reservationsScreen.map")}</Text>
													</TouchableOpacity>
												);
											}
										}))
							}
						</View>
					</View>
				</View>
				{/* <View>
					<Text style={styles.allLocationDropDownTitle}>{translate("reservationsScreen.vehicle")}</Text>
					<Form style={[styles.dropDownStyle, styles.dropDownPicker]}>
						<Text style={styles.carText}>car</Text>
						<Picker
							iosIcon={<FontAwesome name="caret-down" color="#333" style={styles.caretDownIcon} />}
							selectedValue={vehicleType}
							onValueChange={(value) => updateVehicleType(value)}
							style={styles.dropDownPicker}
							textStyle={styles.pickerText}
						>
							{
								(locationAndFleet?.fleettypes)
									&& (locationAndFleet?.fleettypes.map((item) => {
										return <Picker.Item key={item.id} value={item.id} label={item.key} />;
									}))
							}
							{
								(route.params)
								&& (
									<Picker.Item key={carID} value={carID} label={carType} />
								)
							}
						</Picker>
					</Form>
				</View> */}
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("reservationsScreen.search")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onSearch}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
			<DateTimePickerModal
				date={dateTimePickerModal.timeType === "startTime" ? new Date(startDateTime) : new Date(endDateTime)}
				is24Hour={true}
				locale="en_GB"
				isVisible={dateTimePickerModal.status}
				mode="datetime"
				onConfirm={onConfirmDateTimePicker}
				onCancel={() => updateDateTimePickerModal({ ...dateTimePickerModal, status: false })}
				onHide={() => updateDateTimePickerModal({ ...dateTimePickerModal, status: false })}
			/>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	locationAndFleet: getLocationAndFleets(state),
	clientGroupId: getClientGroupId(state)
});

const mapDispatchToProps = {
	dispatchHandleLocationTypes: handleLocationTypes,
	dispatchSearchReservation: searchReservation,
	dispatchLocateReservation: locateReservation,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReservationsScreen);
