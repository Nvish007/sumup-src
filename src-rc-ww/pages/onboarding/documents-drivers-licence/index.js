import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, ScrollView, Text, TouchableOpacity, Platform } from "react-native";
import Button from "src/components/ButtonComponent";
import Images from "src/assets/images";
import TextInput from "src/components/TextInput";
import styles from "src/styles/pages/onBoarding";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import Tooltip from "react-native-walkthrough-tooltip";
import { onBoardingShowed, updateUserOnBoardingStatus } from "src/redux/actions";
import { getOnBoardingSteps } from "src/redux/selectors";
import * as BlinkIDReactNative from "blinkid-react-native";
import Config from "react-native-config";
import { showAlert } from "src/utils/native";

const DocumentsDriversLicence = ({
	navigation,
	route,
	steps,
	dispatchOnBoardingShowed,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const [tooltip, updateTooltip] = useState(false);
	const licenseKey = Platform.select({
		// iOS license key:
		ios: Config.MICROBLINK_IOS_KEY,
		// android license key:
		android: Config.MICROBLINK_ANDROID_KEY
	});

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
	return (
		<SafeAreaView style={styles.safeView}>
			<ScrollView>
				<View style={styles.documentInfoContainer}>
					<View style={styles.drivingLicenceInfoCard}>
						<Text style={styles.drivingLicenceTitle}>{translate("documentsDriversLicence.drivingLicenseNumber")}</Text>
						<Tooltip
							isVisible={tooltip}
							content={<Text>{translate("documentsDriversLicence.document")}</Text>}
							placement="top"
							onClose={() => updateTooltip(false)}
						>
							<TouchableOpacity onPress={() => updateTooltip(!tooltip)}>
								<Image
									source={Images.common.detailsIcon2}
									style={styles.detailsIcon}
								/>
							</TouchableOpacity>
						</Tooltip>

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
						/>
					</View>
					<View style={styles.documentsPicturesContainer}>
						<Text>{translate("documentsDriversLicence.pictures")}</Text>
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
					buttonText={translate("documentsDriversLicence.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onNavigate}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsDriversLicence);