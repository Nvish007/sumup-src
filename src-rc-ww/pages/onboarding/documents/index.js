import React, { useState } from "react";
import { connect } from "react-redux";
import {
	Platform,
	Text,
	View,
	Image,
	ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "src/assets/images";
import styles from "src/styles/pages/onBoarding";
import { onBoardingShowed, uploadOnBoardingDocument, updateStepsCount } from "src/redux/actions";
import { getOnBoardingSteps, getEndUserId, getOnBoardingStepsCount } from "src/redux/selectors";
import Button from "src/components/ButtonComponent";
import * as BlinkIDReactNative from "blinkid-react-native";
import { translate } from "src/locales/i18n";
import Config from "react-native-config";
import { showAlert } from "src/utils/native";

const renderIf = function(condition, content) {
	if (condition) {
		return content;
	}
	return null;
};

function buildResult(result, key) {
	if (result && result !== -1) {
		return `${key}: ${result}\n`;
	}
	return "";
}

function buildDateResult(result, key) {
	if (result) {
		return `${key}: ${
			result.day}.${result.month}.${result.year}.`
            + "\n";
	}
	return "";
}
const Documents = ({
	navigation: { navigate },
	steps,
	stepsCount,
	endUserId,
	dispatchOnBoardingShowed,
	dispatchUploadOnBoardingDocument,
	dispatchUpdateStepsCount
}) => {
	const [showFrontImageDocument, setShowFrontImageDocument] = useState(false);
	const [resultFrontImageDocument, setResultFrontImageDocument] = useState("");
	const [showBackImageDocument, setShowBackImageDocument] = useState(false);
	const [resultBackImageDocument, setResultBackImageDocument] = useState("");
	// const [showImageFace, setShowImageFace] = useState(false);
	// const [resultImageFace, setResultImageFace] = useState("");
	const [showSuccessFrame, setShowSuccessFrame] = useState(false);
	const [successFrame, setSuccessFrame] = useState("");
	// const [results, setResults] = useState("");
	// const [licenseKeyErrorMessage, setLicenseKeyErrorMessage] = useState("");

	const licenseKey = Platform.select({
		// iOS license key:
		ios: Config.MICROBLINK_IOS_KEY,
		// android license key:
		android: Config.MICROBLINK_ANDROID_KEY
	});

	function handleResult(result) {
		let localState = {
			showFrontImageDocument: false,
			resultFrontImageDocument: "",
			showBackImageDocument: false,
			resultBackImageDocument: "",
			// resultImageFace: "",
			// results: "",
			showSuccessFrame: false,
			successFrame: ""
		};

		if (result instanceof BlinkIDReactNative.BlinkIdCombinedRecognizerResult) {
			let blinkIdResult = result;

			let resultString = buildResult(blinkIdResult.firstName, "First name")
                + buildResult(blinkIdResult.lastName, "Last name")
                + buildResult(blinkIdResult.fullName, "Full name")
                + buildResult(blinkIdResult.localizedName, "Localized name")
                + buildResult(blinkIdResult.additionalNameInformation, "Additional name info")
                + buildResult(blinkIdResult.address, "Address")
                + buildResult(blinkIdResult.additionalAddressInformation, "Additional address info")
                + buildResult(blinkIdResult.documentNumber, "Document number")
                + buildResult(blinkIdResult.documentAdditionalNumber, "Additional document number")
                + buildResult(blinkIdResult.sex, "Sex")
                + buildResult(blinkIdResult.issuingAuthority, "Issuing authority")
                + buildResult(blinkIdResult.nationality, "Nationality")
                + buildDateResult(blinkIdResult.dateOfBirth, "Date of birth")
                + buildResult(blinkIdResult.age, "Age")
                + buildDateResult(blinkIdResult.dateOfIssue, "Date of issue")
                + buildDateResult(blinkIdResult.dateOfExpiry, "Date of expiry")
                + buildResult(blinkIdResult.dateOfExpiryPermanent, "Date of expiry permanent")
                + buildResult(blinkIdResult.expired, "Expired")
                + buildResult(blinkIdResult.maritalStatus, "Martial status")
                + buildResult(blinkIdResult.personalIdNumber, "Personal id number")
                + buildResult(blinkIdResult.profession, "Profession")
                + buildResult(blinkIdResult.race, "Race")
                + buildResult(blinkIdResult.religion, "Religion")
                + buildResult(blinkIdResult.residentialStatus, "Residential status")
                + buildResult(blinkIdResult.processingStatus, "Processing status")
                + buildResult(blinkIdResult.recognitionMode, "Recognition mode");
			let licenceInfo = blinkIdResult.driverLicenseDetailedInfo;
			if (licenceInfo) {
				resultString
                    += buildResult(licenceInfo.restrictions, "Restrictions")
                    + buildResult(licenceInfo.endorsements, "Endorsements")
                    + buildResult(licenceInfo.vehicleClass, "Vehicle class")
                    + buildResult(licenceInfo.conditions, "Conditions");
			}

			localState.results += resultString;

			if (blinkIdResult.fullDocumentFrontImage) {
				localState.showFrontImageDocument = true;
				localState.resultFrontImageDocument = `data:image/jpg;base64,${blinkIdResult.fullDocumentFrontImage}`;
			}
			if (blinkIdResult.fullDocumentBackImage) {
				localState.showBackImageDocument = true;
				localState.resultBackImageDocument = `data:image/jpg;base64,${blinkIdResult.fullDocumentBackImage}`;
			}

			if (blinkIdResult.faceImage) {
				localState.showImageFace = true;
				localState.resultImageFace = `data:image/jpg;base64,${blinkIdResult.faceImage}`;
			}
		}
		return localState;
	}

	function handleScan() {
		if (__DEV__) {
			onNavigate();
		} else {
			Scan();
		}
	}

	async function Scan() {
		try {
			let blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
			blinkIdCombinedRecognizer.returnFullDocumentImage = true;
			// blinkIdCombinedRecognizer.returnFaceImage = true;

			const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
				new BlinkIDReactNative.BlinkIdOverlaySettings(),
				new BlinkIDReactNative.RecognizerCollection([blinkIdCombinedRecognizer/* , mrtdSuccessFrameGrabber */]),
				licenseKey
			);

			if (scanningResults) {
				let newState = {
					showFrontImageDocument: false,
					resultFrontImageDocument: "",
					showBackImageDocument: false,
					resultBackImageDocument: "",
					showImageFace: false,
					// resultImageFace: "",
					// results: "",
					showSuccessFrame: false,
					successFrame: ""
				};

				for(let i = 0; i < scanningResults.length; ++i) {
					let localState = handleResult(scanningResults[i]);
					newState.showFrontImageDocument = newState.showFrontImageDocument || localState.showFrontImageDocument;
					if (localState.showFrontImageDocument) {
						newState.resultFrontImageDocument = localState.resultFrontImageDocument;
					}
					newState.showBackImageDocument = newState.showBackImageDocument || localState.showBackImageDocument;
					if (localState.showBackImageDocument) {
						newState.resultBackImageDocument = localState.resultBackImageDocument;
					}
					newState.showImageFace = newState.showImageFace || localState.showImageFace;
					if (localState.resultImageFace) {
						newState.resultImageFace = localState.resultImageFace;
					}
					newState.results += localState.results;
					newState.showSuccessFrame = newState.showSuccessFrame || localState.showSuccessFrame;
					if (localState.successFrame) {
						newState.successFrame = localState.successFrame;
					}
					if (!newState.resultFrontImageDocument) {
						showAlert("Unable to scan document", "Please try again");
					}
				}
				newState.results += "\n";
				setShowFrontImageDocument(newState.showFrontImageDocument);
				setResultFrontImageDocument(newState.resultFrontImageDocument);
				setShowBackImageDocument(newState.showBackImageDocument);
				setResultBackImageDocument(newState.resultBackImageDocument);
				// setShowImageFace(newState.showImageFace);
				// setResultImageFace(newState.resultImageFace);
				// setResults(newState.results);
				setShowSuccessFrame(newState.showSuccessFrame);
				setSuccessFrame(newState.successFrame);
			}
		} catch (error) {
			console.info(error);
			setShowFrontImageDocument(false);
			setResultFrontImageDocument("");
			setShowBackImageDocument(false);
			setResultBackImageDocument("");
			// setShowImageFace(false);
			// setResultImageFace("");
			// setResults("Scanning has been cancelled");
			setShowSuccessFrame(false);
			setSuccessFrame("");
		}
	}

	const onUploadDocumentResponse = (response) => {
		if (response.success) {
			onNavigate();
		} else {
			showAlert("Error", "Something went wrong");
		}
	};

	const onContinue = () => {
		const data = { documentFrontTitle: "DOCUMENT_FRONT", documentFrontImage: resultFrontImageDocument };
		if (resultBackImageDocument) {
			data.documentBackTitle = "DOCUMENT_BACK";
			data.documentBackImage = resultBackImageDocument;
		}
		dispatchUploadOnBoardingDocument(endUserId, data, onUploadDocumentResponse);
	};

	const onNavigate = () => {
		// if (steps.includes("Payment")) {
		// 	navigate("Payment");
		// } else {
		// 	dispatchOnBoardingShowed();
		// }
		if (steps?.[stepsCount]) {
			navigate(steps?.[stepsCount]);
			dispatchUpdateStepsCount();
		} else {
			dispatchOnBoardingShowed();
		}
	};

	return (
		<SafeAreaView style={styles.safeView}>
			<ScrollView>
				<View style={styles.safeView}>
					<View style={styles.buttonContainer}>
						<View style={styles.container}>
							<Text style={styles.label}>{translate("onboarding.name")}</Text>
							<View style={styles.buttonContainer}>
								<Button
									buttonText={translate("onboarding.scan")}
									buttonStyle={styles.confirmButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={handleScan}
								/>
							</View>
							<ScrollView
								automaticallyAdjustContentInsets={false}
								scrollEventThrottle={200}
							>
								{/* <Text style={styles.results}>{results}</Text> */}
								{renderIf(showFrontImageDocument && resultFrontImageDocument,
									<View style={styles.imageContainer}>
										<Image
											resizeMode="contain"
											source={{ uri: resultFrontImageDocument, scale: 3 }}
											style={styles.imageResult}
										/>
									</View>)}
								{renderIf(showBackImageDocument && resultBackImageDocument,
									<View style={styles.imageContainer}>
										<Image
											resizeMode="contain"
											source={{ uri: resultBackImageDocument, scale: 3 }}
											style={styles.imageResult}
										/>
									</View>)}
								{/* {renderIf(showImageFace && resultImageFace,
									<View style={styles.imageContainer}>
										<Image
											resizeMode="contain"
											source={{ uri: resultImageFace, scale: 3 }}
											style={styles.imageResult}
										/>
									</View>)} */}
								{renderIf(showSuccessFrame && successFrame,
									<View style={styles.imageContainer}>
										<Image
											resizeMode="contain"
											source={{ uri: successFrame, scale: 3 }}
											style={styles.imageResult}
										/>
									</View>)}
							</ScrollView>
						</View>
					</View>
					{/* <View style={[styles.rootDoc, styles.titleFont]}>
						<Text> Drivers License </Text>
						<Text> License Issue Date </Text>
						<Text> License Issue Place </Text>
					</View> */}
				</View>
			</ScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("onboarding.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onContinue}
					disabled={!resultFrontImageDocument}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	steps: getOnBoardingSteps(state),
	stepsCount: getOnBoardingStepsCount(state),
	endUserId: getEndUserId(state)
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchUploadOnBoardingDocument: uploadOnBoardingDocument,
	dispatchUpdateStepsCount: updateStepsCount
};

export default connect(mapStateToProps, mapDispatchToProps)(Documents);