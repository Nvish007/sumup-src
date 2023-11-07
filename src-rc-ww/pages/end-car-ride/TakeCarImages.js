import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import styles from "src/styles/pages/takeCarRentalImages";
import { translate } from "src/locales/i18n";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Modal from "react-native-modal";
import { getActiveRental } from "src/redux/selectors";
import { handleUploadCarImages } from "src/redux/actions";

const TakeCarImages = ({
	navigation,
	activeRental,
	dispatchUploadCarImages
}) => {
	const [pickerOptionsModal, setPickerOptionsModal] = useState(false);
	const [frontImageLeft, setFrontImageLeft] = useState(null);
	const [frontImageRight, setFrontImageRight] = useState(null);
	const [backImageLeft, setBackImageLeft] = useState(null);
	const [backImageRight, setBackImageRight] = useState(null);
	const [selectedImageValue, setSelectedImageValue] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.carPictures")
		});
	}, [navigation]);

	const onImageResponse = (response) => {
		if (response?.success) {
			navigation.navigate("EndCarRideCarState");
		}
	};
	const uploadImages = () => {
		if (frontImageLeft && frontImageRight && backImageLeft && backImageRight) {
			const data = new FormData();
			data.append("photos[0][title]", "front-left");
			data.append("photos[0][photo]", {
				uri: frontImageLeft?.uri,
				type: frontImageLeft?.type,
				name: frontImageLeft?.fileName
			});
			data.append("photos[1][title]", "front-right");
			data.append("photos[1][photo]", {
				uri: frontImageRight?.uri,
				type: frontImageRight?.type,
				name: frontImageRight?.fileName
			});
			data.append("photos[2][title]", "back-left");
			data.append("photos[2][photo]", {
				uri: backImageLeft?.uri,
				type: backImageLeft?.type,
				name: backImageLeft?.fileName
			});
			data.append("photos[3][title]", "back-right");
			data.append("photos[3][photo]", {
				uri: backImageRight?.uri,
				type: backImageRight?.type,
				name: backImageRight?.fileName
			});
			data.append("rentalId", activeRental?.rental?.id);
			data.append("type", "end");
			dispatchUploadCarImages(data, onImageResponse);
		} else {
			Alert.alert(translate("alert.image"));
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
		} else if (selectedImageValue === "frontLeft") {
			setFrontImageLeft(response);
		} else if (selectedImageValue === "frontRight") {
			setFrontImageRight(response);
		} else if (selectedImageValue === "backLeft") {
			setBackImageLeft(response);
		} else if (selectedImageValue === "backRight") {
			setBackImageRight(response);
		}
	};

	const pickProfilePic = (captureMethod) => {
		setPickerOptionsModal(false);
		setTimeout(() => {
			const options = {
				mediaType: "photo", // type
				maxWidth: 1000,
				maxHeight: 1000,
				quality: 0.5,
				includeBase64: true
			};
			if (captureMethod === "Camera") {
				launchCamera(options, handleCaptureResponse);
			} else {
				launchImageLibrary(options, handleCaptureResponse);
			}
		}, 500);
	};

	const selectImage = (value) => {
		setSelectedImageValue(value);
		setPickerOptionsModal(true);
	};

	return	(
		<SafeAreaView style={styles.safeView}>
			<ScrollView>
				<View style={styles.mainContainer}>
					<View>
						<Text style={styles.title}>{translate("takeCarRentalImages.title1")}</Text>
						<Text style={styles.title}>{translate("takeCarRentalImages.title2")}</Text>
						<View style={styles.imageResult}>
							<Text style={styles.imageTitle}>{translate("takeCarRentalImages.front")}</Text>
							<View style={styles.imageContainer}>
								<TouchableOpacity style={styles.imageSection} onPress={() => selectImage("frontLeft")}>
									<Text style={styles.imageSectionTitle1}>{translate("takeCarRentalImages.imageCount1")}</Text>
									<View style={styles.singleImageContainer}>
										<Image
											source={frontImageLeft ? frontImageLeft : Images.takeCarRentalImages.carFrontLeftIcon}
											style={frontImageLeft ? styles.carImage : styles.carIcon}
										/>
										<Text style={styles.singleImageContainerTitle}>{translate("takeCarRentalImages.frontLeft")}</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.imageSection} onPress={() => selectImage("frontRight")}>
									<Text style={styles.imageSectionTitle1}>{translate("takeCarRentalImages.imageCount2")}</Text>
									<View style={styles.singleImageContainer}>
										<Image
											source={frontImageRight ? frontImageRight : Images.takeCarRentalImages.carFrontRightIcon}
											style={frontImageRight ? styles.carImage : styles.carIcon}
										/>
										<Text style={styles.singleImageContainerTitle}>{translate("takeCarRentalImages.frontRight")}</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.imageResult}>
							<View style={styles.horizontalLine} />
							<Text style={styles.imageTitle}>{translate("takeCarRentalImages.back")}</Text>
							<View style={styles.imageContainer}>
								<TouchableOpacity style={styles.imageSection} onPress={() => selectImage("backLeft")}>
									<Text style={styles.imageSectionTitle1}>{translate("takeCarRentalImages.imageCount3")}</Text>
									<View style={styles.singleImageContainer}>
										<Image
											source={backImageLeft ? backImageLeft : Images.takeCarRentalImages.carBackRightIcon}
											style={backImageLeft ? styles.carImage : styles.carIcon}
										/>
										<Text style={styles.singleImageContainerTitle}>{translate("takeCarRentalImages.backRight")}</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={styles.imageSection} onPress={() => selectImage("backRight")}>
									<Text style={styles.imageSectionTitle1}>{translate("takeCarRentalImages.imageCount4")}</Text>
									<View style={styles.singleImageContainer}>
										<Image
											source={backImageRight ? backImageRight : Images.takeCarRentalImages.carBackLeftIcon}
											style={backImageRight ? styles.carImage : styles.carIcon}
										/>
										<Text style={styles.singleImageContainerTitle}>{translate("takeCarRentalImages.backLeft")}</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
						<View style={[styles.horizontalLine, styles.lastHorizontalLine]} />
					</View>
				</View>
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("takeCarRentalImages.next")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={() => uploadImages()}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
			<Modal
				isVisible={pickerOptionsModal}
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
						onPress={() => setPickerOptionsModal(false)}
					>
						<Text>{translate("takeCarRentalImages.cancel")}</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	activeRental: getActiveRental(state)
});

const mapDispatchToProps = {
	dispatchUploadCarImages: handleUploadCarImages
};

export default connect(mapStateToProps, mapDispatchToProps)(TakeCarImages);
