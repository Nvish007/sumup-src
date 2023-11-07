import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "src/assets/images";
import styles from "src/styles/pages/forgotPassword";
import TextInput from "src/components/TextInput";
import Button from "src/components/ButtonComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { translate } from "src/locales/i18n";
import { emailValidator } from "src/utils/validators";
import { forgotPassword } from "src/redux/actions";

const ForgotPasswordScreen = ({
	navigation,
	dispatchForgotPassword
}) => {
	const insets = useSafeAreaInsets();
	const [email, setEmail] = useState({ value: "", error: "" });

	const onForgotPasswordResponse = () => {
		navigation.navigate("ForgotPasswordOtpVerification");
	};

	const onSubmit = () => {
		const emailError = emailValidator(email.value);
		if (emailError) {
			setEmail({ ...email, error: emailError });
		} else {
			dispatchForgotPassword({ email: email.value }, onForgotPasswordResponse);
		}
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={60} enableOnAndroid={true}>
				<View style={styles.appLogoContainer}>
					<Image
						source={Images.authScreen.mobility}
						style={styles.logo}
					/>
				</View>
				<View>
					<Text style={styles.emailLabel}>{translate("forgotPassword.email")}</Text>
					<MaterialIcons
						style={styles.mailIcon}
						size={22}
						name="mail-outline"
					/>
					<TextInput
						inputStyle={styles.textInputStyle}
						style={styles.textInputContainer}
						autoCapitalize="none"
						value={email.value}
						onChangeText={(value) => {
							setEmail({ value: value, error: "" });
						}}
						errorText={email.error}
					/>
				</View>
			</KeyboardAwareScrollView>
			<View style={[styles.submitButtonContainer, { bottom: insets.bottom }]}>
				<Button
					textStyle={styles.buttonTextsStyle}
					buttonStyle={styles.submitButton}
					buttonText={translate("forgotPassword.submit")}
					buttonClicked={onSubmit}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapDispatchToProps = {
	dispatchForgotPassword: forgotPassword
};

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen);