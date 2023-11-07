import React, { useState } from "react";
import { connect } from "react-redux";
import { ScrollView, Image, Keyboard } from "react-native";
import { Text, View } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/forgotPasswordOtpVerification";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { forgotPasswordOtpVerification } from "src/redux/actions";
import { getUserId, getUserNumber } from "src/redux/selectors";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";

const OtpVerificationScreen = ({
	navigation,
	userId,
	telephone,
	dispatchForgotPasswordOtpVerification
}) => {
	const [otp, setOtp] = useState();
	const [otpVerified, updateOtpVerified] = useState(false);

	const onOtpverificationResponse = () => {
		updateOtpVerified(true);
		setTimeout(() => {
			updateOtpVerified(false);
			navigation.navigate("ResetPassword");
		}, 1000);
	};

	const verifyOtp = (oneTimePassword) => {
		Keyboard.dismiss();
		const data = {
			otp: oneTimePassword,
			telephone,
			userId
		};
		dispatchForgotPasswordOtpVerification(data, onOtpverificationResponse);
	};

	return (
		<SafeAreaView style={styles.mainScreenView}>
			<KeyboardAwareScrollView extraScrollHeight={85} enableOnAndroid={true}>
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
							<Text style={styles.title2}>{telephone}</Text>
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
								<Text style={styles.popupOTPtexts}>{translate("phoneVerificationScreen.otp")}</Text>
								<Text style={styles.popupOTPtexts}>{translate("phoneVerificationScreen.success")}</Text>
							</View>
						</Modal>
					</View>
				</ScrollView>
			</KeyboardAwareScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("phoneVerificationScreen.verify")}
					buttonStyle={styles.verifyButton}
					textStyle={styles.buttonTextsStyle}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	userId: getUserId(state),
	telephone: getUserNumber(state)
});

const mapDispatchToProps = {
	dispatchForgotPasswordOtpVerification: forgotPasswordOtpVerification
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerificationScreen);