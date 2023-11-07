import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "src/assets/images";
import styles from "src/styles/pages/resetPassword";
import TextInput from "src/components/TextInput";
import Button from "src/components/ButtonComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { translate } from "src/locales/i18n";
import { resetPassword, handleLogIn, handleCompanyLogin } from "src/redux/actions";
import { getUserStatusCode, getResetPasswordToken, getUser } from "src/redux/selectors";
import {
	passwordValidator,
	passwordLengthValidator,
	confirmPasswordValidator,
	passwordCaseValidator,
	passwordNumericValidator,
	passwordCharValidator
} from "src/utils/validators";
import { showAlert } from "src/utils/native";

const ResetPassword = ({
	navigation,
	resetPasswordToken,
	userStatusCode,
	user,
	dispatchResetPassword,
	dispatchHandleLogin,
	dispatchCompanyLogin
}) => {
	const insets = useSafeAreaInsets();
	const [password, setPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
	const [securePassword, UpdateSecurePassword] = useState(true);
	const [validated, setValidated] = useState(false);
	const [checkLength, setCheckLength] = useState(false);
	const [checkCaseString, setCheckCaseString] = useState(false);
	const [checkNumeric, setCheckNumeric] = useState(false);
	const [checkChar, setCheckChar] = useState(false);

	const onLoginResponse = (response) => {
		if (response?.endUser?.onboarding === "1") {
			navigation.navigate("Onboarding");
		} else {
			navigation.navigate("CompanyList");
		}
	};

	const onCompanyLoginResponse = (response) => {
		if (response.endUser?.onboarding === "1") {
			navigation.navigate("Onboarding");
		}
	};

	const autoLogin = () => {
		if (userStatusCode) {
			const loginData = { userId: user._id, identifier: user.email, token: password.value, method: "password" };
			dispatchHandleLogin(loginData, onLoginResponse);
		} else {
			const loginData = { identifier: user.email, token: password.value, method: "password" };
			dispatchCompanyLogin(loginData, onCompanyLoginResponse);
		}
	};

	const onResetPasswordResponse = (response) => {
		showAlert("Success", response?.message, "", autoLogin);
	};

	const reset = () => {
		const passwordError = passwordValidator(password.value);
		const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);
		if (passwordError) {
			setPassword({ ...password, error: passwordError });
		} else if (confirmPasswordError) {
			setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
		} else {
			const data = {
				token: resetPasswordToken,
				password: password.value,
				confirmPassword: confirmPassword.value
			};
			dispatchResetPassword(data, onResetPasswordResponse);
		}
	};
	useEffect(() => {
		if (checkLength && checkCaseString && checkNumeric && checkChar) {
			setValidated(true);
		} else setValidated(false);
	}, [password]);

	const checkRequirment = (value) => {
		setPassword({ value, error: "" });
		const passwordError = passwordLengthValidator(value);
		const passwordCaseError = passwordCaseValidator(value);
		const passwordNumError = passwordNumericValidator(value);
		const passwordCharError = passwordCharValidator(value);
		if (!passwordError) {
			setCheckLength(true);
		} else setCheckLength(false);
		if (!passwordCaseError) {
			setCheckCaseString(true);
		} else setCheckCaseString(false);
		if (!passwordNumError) {
			setCheckNumeric(true);
		} else setCheckNumeric(false);
		if (!passwordCharError) {
			setCheckChar(true);
		} else setCheckChar(false);
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={85} enableOnAndroid={true}>
				<View style={styles.appLogoContainer}>
					<Image
						source={Images.authScreen.mobility}
						style={styles.appLogo}
					/>
				</View>
				<View>
					<Text style={styles.passwordLabel}>{translate("resetPassword.password")}</Text>
					<TouchableOpacity
						style={styles.passwordEyeIcon}
						onPress={() => UpdateSecurePassword(!securePassword)}
					>
						{
							securePassword
								? (
									<MaterialIcons
										name="visibility-off"
										color="#000000"
										size={22}
									/>
								)
								: (
									<MaterialIcons
										name="visibility"
										color="#000000"
										size={22}
									/>
								)
						}
					</TouchableOpacity>
					<MaterialIcons
						style={styles.lockIcon}
						size={22}
						name="lock-outline"
					/>
					<TextInput
						inputStyle={styles.inputStyle}
						style={styles.textInputContainer}
						value={password.value}
						autoCorrect={false}
						secureTextEntry={securePassword}
						errorText={password.error}
						onChangeText={(value) => {
							checkRequirment(value);
						}}
					/>
				</View>
				<View>
					<Text style={styles.passwordLabel}>{translate("resetPassword.confirmPassword")}</Text>
					<TouchableOpacity
						style={styles.passwordEyeIcon}
						onPress={() => UpdateSecurePassword(!securePassword)}
					>
						{
							securePassword
								? (
									<MaterialIcons
										name="visibility-off"
										color="#000000"
										size={22}
									/>
								)
								: (
									<MaterialIcons
										name="visibility"
										color="#000000"
										size={22}
									/>
								)
						}
					</TouchableOpacity>
					<MaterialIcons
						style={styles.lockIcon}
						size={22}
						name="lock-outline"
					/>
					<TextInput
						inputStyle={styles.inputStyle}
						style={styles.textInputContainer}
						value={confirmPassword.value}
						autoCorrect={false}
						secureTextEntry={securePassword}
						errorText={confirmPassword.error}
						onChangeText={(value) => {
							setConfirmPassword({ value, error: "" });
						}}
					/>
				</View>
				<View style={styles.viewStyle}>
					<Text style={validated ? styles.passwordRequirmentsText : styles.passwordRequirmentsText2}>
						{translate("passwordRequirments.requirments")}
					</Text>
					<Text style={checkLength ? styles.passwordTextFontSuccess : styles.passwordTextFontDenied}>
						{"\u2022"}
						{"\t"}
						{translate("passwordRequirments.req1")}
					</Text>
					<Text style={checkCaseString ? styles.passwordTextFontSuccess : styles.passwordTextFontDenied}>
						{"\u2022"}
						{"\t"}
						{translate("passwordRequirments.req2")}
						{"\n"}
						{"\t"}
						{translate("passwordRequirments.req3")}
						(A-Z)
					</Text>
					<Text style={checkNumeric ? styles.passwordTextFontSuccess : styles.passwordTextFontDenied}>
						{"\u2022"}
						{"\t"}
						{translate("passwordRequirments.req4")}
						(0-9)
					</Text>
					<Text style={checkChar ? styles.passwordTextFontSuccess : styles.passwordTextFontDenied}>
						{"\u2022"}
						{"\t"}
						{translate("passwordRequirments.req5")}
						{"\n"}
						{"\t"}
						{translate("passwordRequirments.req5Example")}
					</Text>
				</View>
			</KeyboardAwareScrollView>
			<View style={[styles.resetButtonContainer, { bottom: insets.bottom }]}>
				<Button
					textStyle={styles.buttonTextsStyle}
					buttonStyle={styles.resetButton}
					buttonText={translate("confirmPassword.reset")}
					buttonClicked={reset}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	resetPasswordToken: getResetPasswordToken(state),
	userStatusCode: getUserStatusCode(state),
	user: getUser(state)
});

const mapDispatchToProps = {
	dispatchResetPassword: resetPassword,
	dispatchHandleLogin: handleLogIn,
	dispatchCompanyLogin: handleCompanyLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);