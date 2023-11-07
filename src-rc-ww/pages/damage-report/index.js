import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform, PermissionsAndroid, Image } from "react-native";
// import ImageViewer from "react-native-image-zoom-viewer";
import { Textarea, Form, Item, Input } from "native-base";
import { connect } from "react-redux";
// import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import Icon from "react-native-vector-icons/Entypo";
// import { Images } from "src/assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "src/locales/i18n";
import Modal from "react-native-modal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/reportProblem";
import { showAlert } from "src/utils/native";
import { handleDamageReport } from "src/redux/actions";
import { getActiveRental, getEndUserId } from "src/redux/selectors";

// const images = [{
// 	url: "",
// 	props: {
// 		source: require("src/assets/images/contact_image.png")
// 	}
// }];

const ReportProblemScreen = ({
	navigation,
	hasActiveRental,
	endUserId,
	dispatchDamageReport
}) => {
	// console.info("hasActiveRental", hasActiveRental);
	// const [showImage, setShowImage] = useState(false);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [pickerOption, setPickerOption] = useState(false);
	const [image0, setImage0] = useState(null);
	const [image1, setImage1] = useState(null);
	const [image2, setImage2] = useState(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.reportProblem")
		});
	}, [navigation]);

	const handleImages = (item) => {
		if (image0 === null) {
			setImage0(item);
		} else if (image0 !== null && image1 === null) {
			setImage1(item);
		} else if (image0 !== null && image1 !== null && image2 === null) {
			setImage2(item);
		} else {
			showAlert("You can only attach 3 images");
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
			// const data = { profilePicture: `data:image/jpg;base64,${response.base64}` };
			handleImages(response);
		}
	};

	const onSubmitImages = (res) => {
		if (res?.success) {
			showAlert(res.message);
			navigation.navigate("Home");
		}
	};

	const onSubmitReport = () => {
		const data = new FormData();
		data.append("clientId", endUserId);
		data.append("assetId", hasActiveRental ? hasActiveRental?.asset?._id : "");
		data.append("subject", subject);
		data.append("message", message);
		data.append("priority", "normal");
		data.append("rentId", hasActiveRental ? hasActiveRental?.rental?.id : "");
		if (image0) {
			data.append("images[0]", {
				uri: image0?.uri,
				type: image0?.type,
				name: image0?.fileName
			});
		}
		if (image1) {
			data.append("images[1]", {
				uri: image1?.uri,
				type: image1?.type,
				name: image1?.fileName
			});
		}
		if (image2) {
			data.append("images[2]", {
				uri: image2?.uri,
				type: image2?.type,
				name: image2?.fileName
			});
		}
		dispatchDamageReport(data, onSubmitImages);
	};

	const onPressCamera = async(options) => {
		try {
			if (Platform.OS == "ios") {
				launchCamera(options, handleCaptureResponse);
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
					launchCamera(options, handleCaptureResponse);
				} else {
					console.info("Camera permission denied");
				}
			}
		} catch (error) {
			showAlert("Error", error.message);
		}
	};
	const pickProfilePic = (captureMethod) => {
		setPickerOption(false);
		setTimeout(() => {
			const options = {
				mediaType: "photo", // type
				maxWidth: 300,
				maxHeight: 550,
				quality: 1,
				includeBase64: true,
				saveToPhotos: true
			};
			if (captureMethod === "Camera") {
				onPressCamera(options);
			} else {
				launchImageLibrary(options, handleCaptureResponse);
			}
		}, 500);
	};

	return (
		<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
			<KeyboardAwareScrollView style={styles.reservationsScrollView}>
				<View style={styles.mainView}>
					<View style={styles.detailsMainView}>
						<Text style={styles.texts}>{translate("reportProblemScreen.problemDetailText")}</Text>
						<Form>
							<Item regular>
								<Input
									value={subject}
									onChangeText={(value) => {
										setSubject(value);
									}}
									placeholder={translate("reportProblemScreen.bikeNamePlaceholder")}
								/>
							</Item>
						</Form>
						<Textarea
							style={styles.textArea}
							value={message}
							onChangeText={(value) => {
								setMessage(value);
							}}
							rowSpan={3.8}
							bordered
							placeholder={translate("reportProblemScreen.textareaPlaceholder")}
							// placeholderTextColor="#8e8d8d"
						/>
						<View>
							<TouchableOpacity style={styles.attachButton} onPress={() => setPickerOption(true)} activeOpacity={0.5}>
								<Text style={styles.buttonTextsStyle}>{translate("damageReport.attachImage")}</Text>
								<Icon name="attachment" size={20} style={styles.icon} />
							</TouchableOpacity>
						</View>
						<View style={styles.imageContainer}>
							{
								image0
									&& (
										<Image
											source={image0}
											style={styles.image}
										/>
									)
							}
							{
								image1
									&& (
										<Image
											source={image1}
											style={styles.image}
										/>
									)
							}
							{
								image2
									&& (
										<Image
											source={image2}
											style={styles.image}
										/>
									)
							}
						</View>
						<View style={styles.bottomFixedPart}>
							<Button
								buttonText={translate("reportProblemScreen.submitButtonText")}
								buttonStyle={styles.buttonStyle}
								textStyle={styles.buttonTextsStyle}
								buttonClicked={onSubmitReport}
								// isLoading={}
								disabled={!message || !subject}
							/>
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<Modal
				isVisible={pickerOption}
				style={styles.uploadOptionsModal}
			>
				<View style={styles.uploadOptionsContainer}>
					<Text>{translate("takeCarRentalImages.uploadPhoto")}</Text>
					<Text>{translate("takeCarRentalImages.chooseOption")}</Text>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => pickProfilePic("Camera")}
					>
						<Text>{translate("takeCarRentalImages.take")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => pickProfilePic("Choose from library")}
					>
						<Text>{translate("takeCarRentalImages.gallary")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => setPickerOption(false)}
					>
						<Text>{translate("takeCarRentalImages.cancel")}</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</SafeAreaView>

	// 	{ showImage && (
	// 		<Modal
	// 			visible={true}
	// 			transparent={false}
	// 			style={styles.modalContainer}
	// 		>
	// 			<TouchableOpacity
	// 				style={styles.closeButton}
	// 				onPress={() => {
	// 					setShowImage(false);
	// 				}}
	// 			>
	// 				<Icon name="close" color="white" size={35} />
	// 			</TouchableOpacity>
	// 			<ImageViewer
	// 				imageUrls={images}
	// 				style={styles.modalBikeImage}
	// 				enableImageZoom={true}
	// 			/>
	// 		</Modal>
	// 	)}
	);
};

const mapStateToProps = (state) => ({
	hasActiveRental: getActiveRental(state),
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchDamageReport: handleDamageReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportProblemScreen);
