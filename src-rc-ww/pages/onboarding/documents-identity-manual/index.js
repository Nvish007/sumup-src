import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, ScrollView, Text, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import Button from "src/components/ButtonComponent";
import Images from "src/assets/images";
import styles from "src/styles/pages/onBoarding";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "src/components/TextInput";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCamera } from "react-native-image-picker";
import { onBoardingShowed, uploadOnBoardingDocument, updateUserOnBoardingStatus } from "src/redux/actions";
import { getOnBoardingSteps, getEndUserId } from "src/redux/selectors";
import dayjs from "dayjs";
import { nameValidator } from "src/utils/validators";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { showAlert } from "src/utils/native";
import DatePicker from "react-native-date-picker";

const DocumentsIdentityManual = ({
	navigation,
	route,
	steps,
	endUserId,
	dispatchOnBoardingShowed,
	dispatchUploadOnBoardingDocument,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const [number, setNumber] = useState({ value: "", error: "" });
	const [expiryDate, setExpiryDate] = useState({ value: "", error: "" });
	const [datePickerModal, setDatePickerModal] = useState({ status: false });
	const [cardImage, updateCardImage] = useState(null);
	const minimumDate = dayjs().toDate();
	let change = route?.params?.navigate;

	const onConfirmDate = (date) => {
		setDatePickerModal({ ...datePickerModal, status: false });
		const formattedDate = dayjs(date).format("MMMM DD YYYY");
		setExpiryDate({ value: formattedDate, error: "" });
	};

	const onNavigate = () => {
		if (change) {
			navigation.navigate("Home");
		} else {
			const screenName = route.name;
			const stepIndex = steps.findIndex((step) => step === screenName);
			if (steps?.[stepIndex + 1]) {
				navigation.navigate(steps?.[stepIndex + 1]);
			} else {
				dispatchUpdateUserOnBoardingStatus();
				dispatchOnBoardingShowed();
			}
		}
	};

	const handleCaptureResponse = (response) => {
		if (response.didCancel) {
			console.info("No Photo selected");
		} else if (response.errorCode === "camera_unavailable") {
			console.info("Camera not available on this device");
		} else if (response.errorCode === "permission") {
			console.info("permission not satisfied");
		} else if (response.errorCode === "others") {
			console.info("message", response.errorMessage);
		} else {
			updateCardImage(response);
		}
	};

	const checkCameraPermission = async() => {
		try {
			if (Platform.OS == "ios") {
				onClickCamera();
			} else {
				const permission = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA,
					{
						title: "App Camera Permission",
						message: "App needs access to your camera",
						buttonNegative: "Cancel",
						buttonPositive: "OK"
					}
				);
				if (permission === PermissionsAndroid.RESULTS.GRANTED) {
					onClickCamera();
				} else {
					console.info("Camera permission denied");
				}
			}
		} catch (error) {
			showAlert("Error", error.message);
		}
	};

	const onClickCamera = () => {
		setTimeout(() => {
			const options = {
				mediaType: "photo", // type
				maxWidth: 300,
				maxHeight: 500,
				quality: 1,
				includeBase64: true
			};
			launchCamera(options, handleCaptureResponse);
		}, 500);
	};

	const onUploadDocumentResponse = () => {
		onNavigate();
	};

	const onContinue = () => {
		const idNumberError = nameValidator(number.value, "ID number");
		const expiryDateError = nameValidator(expiryDate.value, "Expiry date");
		if (idNumberError) {
			setNumber({ ...number, error: idNumberError });
		} else if (expiryDateError) {
			setExpiryDate({ ...expiryDate, error: expiryDateError });
		} else if (!cardImage) {
			showAlert("Error", "Document Image is required");
		} else {
			const data = {
				metaData: { "expiry date": expiryDate.value, number: number.value },
				documentFrontTitle: "Identity card",
				documentFrontImage: `data:image/jpg;base64,${cardImage.base64}`
			};
			dispatchUploadOnBoardingDocument(endUserId, data, onUploadDocumentResponse);
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
					{ expiryDate.error ? <Text style={styles.errorMessage}>{expiryDate.error}</Text> : null }
					{
						cardImage
							?	(
								<View style={styles.documentImageContainer}>
									<TouchableOpacity style={styles.removeIcon} onPress={() => updateCardImage(null)}>
										<MaterialIcons
											name="highlight-off"
											size={25}
										/>
									</TouchableOpacity>
									<View style={styles.documentImage}>
										<Image
											source={cardImage}
										/>
									</View>
								</View>
							)
							:	(
								<View style={styles.documentsPicturesContainer}>
									<Text>{translate("documentsIdentity.pictures")}</Text>
									<TouchableOpacity
										style={styles.cameraBorderedImageContainer}
										onPress={checkCameraPermission}
									>
										<Image
											source={Images.takeCarRentalImages.cameraBorderedIcon}
											style={styles.cameraBorderedIcon}
										/>
									</TouchableOpacity>
								</View>
							)
					}
				</View>
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("documentsIdentity.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onContinue}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
			{/* <DateTimePickerModal
				isVisible={datePickerModal.status}
				minimumDate={minimumDate}
				onConfirm={onConfirmDate}
				onCancel={() => setDatePickerModal({ ...datePickerModal, status: false })}
			/> */}
			<DatePicker
				modal
				mode="date"
				date={expiryDate.value ? new Date(expiryDate.value) : new Date()}
				open={datePickerModal.status}
				minimumDate={minimumDate}
				onConfirm={onConfirmDate}
				onCancel={() => setDatePickerModal({ ...datePickerModal, status: false })}
			/>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	steps: getOnBoardingSteps(state),
	endUserId: getEndUserId(state)
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchUploadOnBoardingDocument: uploadOnBoardingDocument,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsIdentityManual);