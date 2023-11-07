import React, { useState } from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, Image, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Images from "src/assets/images";
import TextInput from "src/components/TextInput";
import Button from "src/components/ButtonComponent";
import { emailValidator, passwordValidator } from "src/utils/validators";
import { handleCompanyLogin } from "src/redux/actions/authActions";
import styles from "src/styles/pages/companyLogin";
import { translate } from "src/locales/i18n";

const CompanyLoginScreen = ({
	navigation,
	dispatchCompanyLogin
}) => {
	const insets = useSafeAreaInsets();
	const [email, updateEmail] = useState({ value: "", error: "" });
	const [password, updatePassword] = useState({ value: "", error: "" });
	const [securePassword, UpdateSecurePassword] = useState(true);

	const onCompanyLoginResponse = (response) => {
		if (response.endUser?.onboarding === "1") {
			navigation.navigate("Onboarding");
		} else {
			navigation.navigate("CompanyList");
		}
	};

	const onSubmit = () => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);
		if (emailError) {
			updateEmail({ ...email, error: emailError });
		} else if (passwordError) {
			updatePassword({ ...password, error: passwordError });
		} else {
			const data = { identifier: email.value, token: password.value, method: "password" };
			dispatchCompanyLogin(data, onCompanyLoginResponse);
		}
	};

	const LoginButton = () => (
		<View style={[styles.loginButtonContainer, { bottom: insets.bottom }]}>
			<Button
				textStyle={styles.buttonTextsStyle}
				buttonStyle={styles.confirmButton}
				buttonText={translate("companyLogin.login")}
				buttonClicked={onSubmit}
			/>
			<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
		</View>
	);

	const onForgotPassword = () => {
		navigation.navigate("ForgotPassword");
	};

	return (
		<SafeAreaView
			style={styles.safeAreaView}
			edges={["left", "bottom", "right"]}
		>
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
				extraScrollHeight={50}
				enableOnAndroid={true}
			>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
				</View>
				<View>
					<Text style={styles.emailAddressText}>{translate("companyLogin.emailAddress")}</Text>
					<MaterialIcons
						style={styles.mailIcon}
						size={22}
						name="mail-outline"
					/>
					<TextInput
						inputStyle={styles.textInputStyle}
						style={styles.textInputContainer}
						autoCapitalize="none"
						autoCorrect={false}
						returnKeyType="done"
						value={email.value}
						onChangeText={(value) => {
							updateEmail({ value, error: "" });
						}}
						errorText={email.error}
					/>
				</View>
				<View>
					<Text style={styles.passwordText}>{translate("companyLogin.password")}</Text>
					<TouchableOpacity
						onPress={() => UpdateSecurePassword(!securePassword)}
						style={styles.eyeIcon}
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
						inputStyle={styles.textInputStyle}
						style={styles.textInputContainer}
						autoCorrect={false}
						secureTextEntry={securePassword}
						returnKeyType="done"
						value={password.value}
						onChangeText={(value) => {
							updatePassword({ value, error: "" });
						}}
						errorText={password.error}
					/>
				</View>
				<View style={styles.forgotPasswordContainer}>
					<Text style={styles.forgotPasswordtext}>{translate("companyLogin.passwordForgotten")}</Text>
					<TouchableOpacity onPress={onForgotPassword}>
						<Text style={styles.forgotPasswordLink}>{translate("companyLogin.clickHere")}</Text>
					</TouchableOpacity>
				</View>
				{
					Platform.OS === "android" && (
						<LoginButton />
					)
				}
			</KeyboardAwareScrollView>
			{
				Platform.OS === "ios" && (
					<LoginButton />
				)
			}
		</SafeAreaView>
	);
};

const mapDispatchToProps = {
	dispatchCompanyLogin: handleCompanyLogin
};

export default connect(null, mapDispatchToProps)(CompanyLoginScreen);