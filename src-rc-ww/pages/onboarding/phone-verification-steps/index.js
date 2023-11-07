import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "src/locales/i18n";
import { onBoardingPhoneVerification, onBoardingShowed, updateUserOnBoardingStatus } from "src/redux/actions";
import { phoneInputValidator } from "src/utils/validators";
import Images from "src/assets/images";
import { getUser, getUserInfo, getOnBoardingSteps } from "src/redux/selectors";
import PhoneInput from "react-native-phone-number-input";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/phoneVerification";

const PhoneVerificationOnboarding = ({
	route,
	navigation,
	user,
	userInfo,
	steps,
	dispatchOnBoardingPhoneVerification,
	dispatchOnBoardingShowed,
	dispatchUpdateUserOnBoardingStatus
}) => {
	const insets = useSafeAreaInsets();
	const phoneInputRef = useRef(null);
	const [phoneInput, updatePhoneInput] = useState({ value: user?.phoneNumber ? user?.phoneNumber : userInfo?.phoneNumber, error: "" });
	const getCountryCode = () => phoneInputRef.current.getCallingCode();

	const onSuccessCallback = (response) => {
		if (response?.data?.code === 100) {
			const screenName = route.name;
			const stepIndex = steps.findIndex((step) => step === screenName);
			if (steps?.[stepIndex + 1]) {
				navigation.navigate(steps?.[stepIndex + 1]);
			} else {
				dispatchUpdateUserOnBoardingStatus();
				dispatchOnBoardingShowed();
			}
		} else {
			navigation.navigate("onBoardingOtpVerification", {
				mobileNumber: phoneInput.value,
				countryCode: getCountryCode()
			});
		}
	};

	const onConfirm = () => {
		const phoneInputError = phoneInputValidator(phoneInput.value);
		const number = phoneInput.value.replace(/^0+/, "");
		const telephone = `${getCountryCode()}${number}`;
		if (phoneInputError) {
			updatePhoneInput({ ...phoneInput, error: phoneInputError });
		} else {
			dispatchOnBoardingPhoneVerification({ telephone, userId: user?._id }, onSuccessCallback);
		}
	};
	return (
		<SafeAreaView style={styles.safeAreaView} edges={["left", "bottom", "right"]}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={85} enableOnAndroid={true}>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
					<Text style={styles.greetMessage1}>{translate("landingScreen.completeRegistration")}</Text>
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.phoneMSGtext}>{translate("landingScreen.greetMessage")}</Text>
					<View style={styles.phoneInput}>
						<PhoneInput
							ref={phoneInputRef}
							defaultCode="BE"
							value={phoneInput.value}
							onChangeText={(value) => {
								updatePhoneInput({ value, error: "" });
							}}
							textContainerStyle={styles.textContainerStyle}
							flagButtonStyle={styles.phoneflagStyle}
							codeTextStyle={styles.codeText}
							textInputStyle={styles.codeTextInput}
							containerStyle={styles.phoneContainer}
							layout="first"
							placeholder=""
						/>
						{
							phoneInput.error
								? (
									<View>
										<Text style={styles.error}>{phoneInput.error}</Text>
									</View>
								)
								: null
						}
					</View>
				</View>
			</KeyboardAwareScrollView>
			<View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
				<Button
					buttonClicked={onConfirm}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonText={translate("landingScreen.confirm")}
				/>
				<Image source={Images.common.forwardArrow} style={styles.confirmForwardButton} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	user: getUser(state),
	userInfo: getUserInfo(state),
	steps: getOnBoardingSteps(state),
});
const mapDispatchToProps = {
	dispatchOnBoardingPhoneVerification: onBoardingPhoneVerification,
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationOnboarding);