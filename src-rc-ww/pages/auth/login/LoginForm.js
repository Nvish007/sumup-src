import PropTypes from "prop-types";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import TextInput from "src/components/TextInput";
// import Button from "src/components/ButtonComponent";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/login";
import { passwordValidator } from "src/utils/validators";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const LoginForm = forwardRef(({ submitForm, forgotPassword }, ref) => {
	const [password, setPassword] = useState({ value: "", error: "" });
	const [securePassword, UpdateSecurePassword] = useState(true);

	const onSubmit = () => {
		const passwordError = passwordValidator(password.value);

		if (passwordError) {
			setPassword({ ...password, error: passwordError });
			return;
		}

		submitForm({ password: password.value });
	};

	useImperativeHandle(
		ref,
		() => ({
			onSubmit
		})
	);

	return (
		<View style={styles.formContainer}>
			<Text style={styles.enterPasswordText}>{translate("registrationScreen.password")}</Text>
			<View>
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
					inputStyle={styles.loginInputStyle}
					style={styles.textInputContainer}
					value={password.value}
					autoCorrect={false}
					secureTextEntry={securePassword}
					errorText={password.error}
					returnKeyType="done"
					onChangeText={(value) => {
						setPassword({ value: value, error: "" });
					}}
					onSubmitEditing={onSubmit}
				/>
			</View>
			<View style={styles.forgotPasswordContainer}>
				<Text style={styles.forgotPasswordtext}>{translate("companyLogin.passwordForgotten")}</Text>
				<TouchableOpacity onPress={forgotPassword}>
					<Text style={styles.forgotPasswordLink}>{translate("companyLogin.clickHere")}</Text>
				</TouchableOpacity>
			</View>
			{/* <View style={styles.buttonFixed}>
				<Button
					buttonClicked={onSubmit}
					style={styles.buttonContainer}
					buttonText={translate("loginScreen.logInButtonText")}
				/>
				<MaterialIcons
					name="arrow-forward"
					color="#ffffff"
					size={30}
					style={styles.loginForwardIcon}
				/>
			</View> */}
		</View>
	);
});

LoginForm.propTypes = {
	submitForm: PropTypes.func.isRequired
};

export default LoginForm;