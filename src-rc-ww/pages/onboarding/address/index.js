import React, { useState } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import Images from "src/assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { Form, Item, Input } from "native-base";
import styles from "src/styles/pages/onBoarding";
import Button from "src/components/ButtonComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { translate } from "src/locales/i18n";
import { onBoardingShowed, saveOnBoardingInfo, updateUserOnBoardingStatus, saveAddressInfo } from "src/redux/actions";
import { getOnBoardingSteps, getEndUserId } from "src/redux/selectors";
import dayjs from "dayjs";

const Address = ({
	route,
	navigation,
	steps,
	endUserId,
	dispatchOnBoardingShowed,
	dispatchUpdateUserOnBoardingStatus,
	dispatchSaveAddressInfo,
	// dispatchSaveOnBoardingInfo
}) => {
	const [street, updateStreet] = useState({ value: "", error: "" });
	const [near, updateNear] = useState({ value: "", error: "" });
	const [city, updateCity] = useState({ value: "", error: "" });
	const [postalCode, updatePostalCode] = useState({ value: "", error: "" });
	const [dateValue, updateDateValue] = useState({ value: dayjs().format("DD/MM/YYYY"), error: "" });
	const [pickerValue, updatePickerValue] = useState(false);

	const onNavigate = () => {
		const screenName = route.name;
		const stepIndex = steps.findIndex((step) => step === screenName);
		if (steps?.[stepIndex + 1]) {
			navigation.navigate(steps?.[stepIndex + 1]);
		} else {
			dispatchUpdateUserOnBoardingStatus();
			dispatchOnBoardingShowed();
		}
	};

	const onConfirmDateTimePicker = (date) => {
		const formattedDateTime = dayjs(date).format("DD/MM/YYYY");
		updateDateValue({ value: formattedDateTime });
		updatePickerValue(false);
	};

	const onResponse = (res) => {
		if (res.success) {
			onNavigate();
		}
	};

	const onConfirm = () => {
		const data = {
			userId: endUserId,
			street: street.value,
			nr: near.value,
			postalCode: postalCode.value,
			city: city.value,
			dateOfBirth: dateValue.value
		};
		// console.info(data);
		dispatchSaveAddressInfo(data, onResponse);
	};

	return (
		<SafeAreaView style={styles.safeView}>
			<ScrollView>
				<View style={styles.safeView}>
					<View style={styles.appLogoContainer}>
						<Image
							source={Images.authScreen.mobility}
							style={styles.logo}
						/>
					</View>
					<View>
						<Text style={styles.mainContainer}>{translate("address.title")}</Text>
						<View style={[styles.labelView]}>
							<View style={[styles.marginL, styles.marginT]}>
								<Text style={styles.emailTitle}>{translate("address.street")}</Text>
								<Form>
									<Item style={styles.nameItem} regular>
										<Image
											source={Images.common.homeIcon}
											style={styles.inputUserIcon}
										/>
										<Input
											style={styles.emailInput}
											value={street.value}
											onChangeText={(value) => {
												updateStreet({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
							</View>
							<View style={styles.marginT}>
								<Text style={styles.emailTitle}>{translate("address.near")}</Text>
								<Form>
									<Item style={styles.nameItem2} regular>
										<Input
											style={styles.emailInput}
											value={near.value}
											onChangeText={(value) => {
												updateNear({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
							</View>
						</View>
						<View style={[styles.labelView]}>
							<View style={[styles.marginL, styles.marginT]}>
								<Text style={styles.emailTitle}>{translate("address.city")}</Text>
								<Form>
									<Item style={styles.nameItem} regular>
										<Image
											source={Images.common.cityIcon}
											style={styles.inputUserIcon2}
										/>
										<Input
											style={styles.emailInput2}
											value={city.value}
											onChangeText={(value) => {
												updateCity({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
							</View>
							<View style={styles.marginT}>
								<Text style={[styles.emailTitle]}>{translate("address.pinCode")}</Text>
								<Form>
									<Item style={styles.nameItem2} regular>

										<Input
											style={styles.emailInput}
											value={postalCode.value}
											onChangeText={(value) => {
												updatePostalCode({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
							</View>
						</View>
						<View style={[styles.marginL, styles.marginT]}>
							<Text style={styles.emailTitle}>{translate("address.dob")}</Text>
							<Form>
								<Item style={styles.nameItem} regular>
									<TouchableOpacity style={[styles.subView, styles.pickerView]} onPress={() => updatePickerValue(true)}>
										<Image
											source={Images.common.calendarIcon}
											style={styles.inputUserIcon}
										/>
										<Text style={[styles.emailInput, styles.marginL, styles.dateText]}>{dateValue.value}</Text>
									</TouchableOpacity>
								</Item>
							</Form>
						</View>
						<DateTimePickerModal
							is24Hour={true}
							locale="en_GB"
							isVisible={pickerValue === true}
							mode="date"
							onConfirm={onConfirmDateTimePicker}
							onCancel={() => updatePickerValue(false)}
							// onHide={() => updateDateTimePickerModal({ ...dateTimePickerModal, status: false })}
						/>
					</View>
				</View>
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("onboarding.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={() => onConfirm()}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	steps: getOnBoardingSteps(state),
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchSaveOnBoardingInfo: saveOnBoardingInfo,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus,
	dispatchSaveAddressInfo: saveAddressInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);