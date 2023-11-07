import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "src/locales/i18n";
import { handleVerifyMobileNumber } from "src/redux/actions";
import { phoneInputValidator } from "src/utils/validators";
import Images from "src/assets/images";
import { getUser, getUserInfo } from "src/redux/selectors";
import PhoneInput from "react-native-phone-number-input";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/phoneVerification";
import CheckBox from "src/components/CheckBoxComponent";
// import { getUserInfo } from "../../../redux/selectors/user";

const PhoneVerificationScreen = ({
	navigation,
	user,
	userInfo,
	dispatchVerifyMobileNumber
}) => {
	const insets = useSafeAreaInsets();
	const phoneInputRef = useRef(null);
	const [phoneInput, updatePhoneInput] = useState({ value: user?.phoneNumber ? user?.phoneNumber : userInfo?.phoneNumber, error: "" });
	const [termsAndCondition, updateTermsAndCondition] = useState({ value: false, error: "" });
	const getCountryCode = () => phoneInputRef.current.getCallingCode();

	const onSuccessCallback = (response) => {
		if (response?.data?.code === 50) {
			/* user is not validated redirect to otp screen */
			navigation.navigate("OtpVerification", {
				mobileNumber: phoneInput.value,
				countryCode: getCountryCode()
			});
		} else if (response?.data?.code === 60) {
			/* User is validated, but has no login method (redirect to registration) */
			navigation.navigate("Registration");
		} else if (response?.data?.code === 100) {
			/* User is validated and has a login method (redirect to login) */
			navigation.navigate("LoginScreen");
		}
	};

	const onConfirm = () => {
		const phoneInputError = phoneInputValidator(phoneInput.value);
		if (phoneInputError) {
			updatePhoneInput({ ...phoneInput, error: phoneInputError });
		} else {
			const number = phoneInput.value.replace(/^0+/, "");
			dispatchVerifyMobileNumber(
				{ telephone: `${getCountryCode()}${number}` },
				onSuccessCallback
			);
		}
	};
	return (
		<SafeAreaView style={styles.safeAreaView} edges={["left", "bottom", "right"]}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={85} enableOnAndroid={true}>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
					<Text style={styles.greetMessage1}>{translate("registrationScreen.registrationText")}</Text>
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
					<View style={styles.termsAndConditionContainer}>
						<CheckBox
							checked={termsAndCondition.value}
							onChange={() => { updateTermsAndCondition({ value: !termsAndCondition.value, error: "" }); }}
							containerStyle={styles.checkboxContainerStyle}
						/>
						<Text style={styles.acceptText}>{translate("termsAndCondition.accept")}</Text>
						<TouchableOpacity>
							<Text style={styles.termsAndConditionText}>{translate("termsAndCondition.termsAndCondition")}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAwareScrollView>
			<View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
				<Button
					buttonClicked={onConfirm}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonText={translate("landingScreen.confirm")}
					disabled={!termsAndCondition.value}
				/>
				<Image source={Images.common.forwardArrow} style={styles.confirmForwardButton} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	user: getUser(state),
	userInfo: getUserInfo(state),
});
const mapDispatchToProps = {
	dispatchVerifyMobileNumber: handleVerifyMobileNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationScreen);