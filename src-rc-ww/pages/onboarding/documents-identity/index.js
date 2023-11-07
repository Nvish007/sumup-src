import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import Button from "src/components/ButtonComponent";
import Images from "src/assets/images";
import styles from "src/styles/pages/onBoarding";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "src/components/TextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { onBoardingShowed, updateUserOnBoardingStatus } from "src/redux/actions";
import { getOnBoardingSteps } from "src/redux/selectors";
import dayjs from "dayjs";
import * as BlinkIDReactNative from "blinkid-react-native";
import Config from "react-native-config";
import { showAlert } from "src/utils/native";

const DocumentsIdentity = ({
	navigation,
	route,
	steps,
	dispatchOnBoardingShowed,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const [number, setNumber] = useState({ value: "", error: "" });
	const [expiryDate, setExpiryDate] = useState({ value: "", error: "" });
	const [datePickerModal, setDatePickerModal] = useState({ status: false });
	const minimumDate = dayjs().toDate();
	const licenseKey = Platform.select({
		// iOS license key:
		ios: Config.MICROBLINK_IOS_KEY,
		// android license key:
		android: Config.MICROBLINK_ANDROID_KEY
	});

	const onConfirmDate = (date) => {
		const formattedDate = dayjs(date).format("MMMM DD YYYY");
		setExpiryDate({ value: formattedDate, error: "" });
		setDatePickerModal({ ...datePickerModal, status: false });
	};

	const handleScan = () => {
		scanDocument();
	};

	const scanDocument = async() => {
		try {
			const blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
			blinkIdCombinedRecognizer.returnFullDocumentImage = true;

			const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
				new BlinkIDReactNative.BlinkIdOverlaySettings(),
				new BlinkIDReactNative.RecognizerCollection([blinkIdCombinedRecognizer]),
				licenseKey
			);
			console.info("scanning result", scanningResults);
		} catch (error) {
			showAlert("Error", "Something went wrong");
		}
	};

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

	return (
		<SafeAreaView style={styles.safeView}>
			<ScrollView>
				<View style={styles.documentInfoContainer}>
					<View style={styles.documentIdentityLabel1}>
						<Text>{translate("documentsIdentity.idNumber")}</Text>
					</View>
					<View>
						<Image
							source={Images.common.licence}
							style={styles.drivingLicenceIcon}
						/>
						<TextInput
							inputStyle={styles.textInputStyle}
							style={styles.textInputContainer}
							autoCorrect={false}
							value={number.value}
							onChangeText={(value) => setNumber({ value, error: "" })}
							errorText={number.error}
						/>
					</View>
					<View style={styles.documentIdentityLabel2}>
						<Text>{translate("documentsIdentity.idExpiryDate")}</Text>
					</View>
					<TouchableOpacity
						onPress={() => setDatePickerModal({ status: true })}
						style={styles.expiryDateContainer}
					>
						<Image
							source={Images.common.calendar2}
							style={styles.calendarIcon}
						/>
						<Text style={styles.expiryDate}>{expiryDate.value}</Text>
					</TouchableOpacity>
					<View style={styles.documentsPicturesContainer}>
						<Text>{translate("documentsIdentity.pictures")}</Text>
						<TouchableOpacity
							style={styles.cameraBorderedImageContainer}
							onPress={handleScan}
						>
							<Image
								source={Images.takeCarRentalImages.cameraBorderedIcon}
								style={styles.cameraBorderedIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("documentsIdentity.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onNavigate}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
			<DateTimePickerModal
				isVisible={datePickerModal.status}
				minimumDate={minimumDate}
				onConfirm={onConfirmDate}
				onCancel={() => setDatePickerModal({ ...datePickerModal, status: false })}
			/>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	steps: getOnBoardingSteps(state)
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsIdentity);