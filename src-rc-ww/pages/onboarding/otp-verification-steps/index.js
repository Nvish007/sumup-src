import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, Image, TouchableOpacity, Keyboard } from "react-native";
import { Text, View } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import { translate } from "src/locales/i18n";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "src/styles/pages/otpVerification";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleVerifyOtp, handleRequestOtp, onBoardingShowed, updateUserOnBoardingStatus } from "src/redux/actions";
import { getOnBoardingSteps } from "src/redux/selectors";
import { showAlert } from "src/utils/native";
import Modal from "react-native-modal";

const PhoneVerificationOnboarding = ({
	route,
	steps,
	navigation,
	dispatchVerifyOtp,
	requestOtp,
	dispatchOnBoardingShowed,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const { params: { mobileNumber, countryCode } } = route;
	const [otp, setOtp] = useState();
	const [otpVerified, updateOtpVerified] = useState(false);
	const [countDown, updateCountDown] = useState(10);
	const [resendOtpStatus, updateResendOtpStatus] = useState(false);

	const onNavigate = () => {
		const previousScreenName = "onBoardingPhoneVerification";
		const stepIndex = steps.findIndex((step) => step === previousScreenName);
		if (steps?.[stepIndex + 1]) {
			navigation.navigate(steps?.[stepIndex + 1]);
		} else {
			dispatchUpdateUserOnBoardingStatus();
			dispatchOnBoardingShowed();
		}
	};

	const resendOtp = () => {
		updateResendOtpStatus(true);
		updateCountDown(10);
		requestOtp({ mobileNumber, countryCode });
		let time = 10;
		const interval = setInterval(() => {
			if (time < 0) {
				clearInterval(interval);
				updateResendOtpStatus(false);
			}
			updateCountDown(time);
			time -= 1;
		}, 1000);
	};

	const onOtpResult = (response) => {
		if (response?.data?.user?.validated) {
			updateOtpVerified(true);
			setTimeout(() => {
				// updateOtpVerified(false);
				onNavigate();
			}, 1000);
		} else {
			showAlert("Error", "Invalid OTP");
		}
	};

	const verifyOtp = (oneTimePassword) => {
		Keyboard.dismiss();
		const data = {
			token: oneTimePassword,
			telephone: `${countryCode}${mobileNumber}`
		};
		dispatchVerifyOtp(data, onOtpResult);
	};

	return (
		<SafeAreaView style={styles.mainScreenView}>
			<KeyboardAwareScrollView>
				<ScrollView style={styles.mainScrollView} bounces={false}>
					<FocusAwareStatusBar barStyle="dark-content" />
					<View style={styles.innerView}>
						<View style={styles.centerView}>
							<Image
								style={styles.otpScreenMainImg}
								source={Images.otpVerificationScreen.otpVerificationLogo}
							/>
						</View>
						<View style={styles.infoText}>
							<Text style={styles.title1}>{translate("phoneVerificationScreen.smsText")}</Text>
							<Text style={styles.title2}>{`${countryCode} ${mobileNumber}`}</Text>
							<Text style={styles.title3}>{translate("phoneVerificationScreen.smsVerifyText")}</Text>
						</View>
						<View style={styles.otpCodeView}>
							<SmoothPinCodeInput
								cellSize={46}
								codeLength={6}
								textStyle={styles.pinTextsStyle}
								cellStyle={styles.pinCodeCellStyle}
								cellStyleFocused={styles.pinCodeCellStyleFocused}
								value={otp}
								containerStyle={styles.pinContainer}
								onTextChange={(password) => setOtp(password)}
								onFulfill={(data) => verifyOtp(data)}
							/>
						</View>
						<View style={styles.otpResendSection}>
							<Text style={styles.resendWaitMessageText}>{translate("phoneVerificationScreen.smsNotReceived")}</Text>
							<Text style={styles.resendWaitMessage}>{`${translate("phoneVerificationScreen.waitText1")} ${countDown} ${translate("phoneVerificationScreen.waitText2")}`}</Text>
							<TouchableOpacity
								onPress={resendOtp}
								disabled={resendOtpStatus}
							>
								<Text style={styles.resendText}>{translate("phoneVerificationScreen.resendText")}</Text>
							</TouchableOpacity>
						</View>
						{/* <View style={styles.centerView}>
						{
							resendOtpStatus
							&& (<Text>{`Please wait for ${countDown} seconds`}</Text>)
						}
					</View> */}
						{/* <View style={styles.centerView}>
						<TouchableOpacity
							style={styles.newCodeLink}
							onPress={resendOtp}
							disabled={resendOtpStatus}
						>
							<Text style={styles.resendTexts}>{translate("phoneVerificationScreen.resendText")}</Text>
						</TouchableOpacity>
					</View> */}
					</View>
					<View>
						<Modal isVisible={otpVerified}>
							<View style={styles.otpSuccessModal}>
								<MaterialIcons
									name="check-circle"
									color="green"
									size={100}
									style={styles.checkedCircleIcon}
								/>
								<Text style={styles.popupOTPtexts}>{translate("phoneVerificationScreen.accVerify")}</Text>
								<Text style={styles.popupOTPtexts}>{translate("phoneVerificationScreen.success")}</Text>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("phoneVerificationScreen.verify")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					// buttonClicked={verifyOtp}
					// disabled={otp && otp.length === 6 ? false : true}
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
	dispatchVerifyOtp: handleVerifyOtp,
	requestOtp: handleRequestOtp,
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationOnboarding);
