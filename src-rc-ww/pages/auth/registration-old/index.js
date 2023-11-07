import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { translate } from "src/locales/i18n";
import PhoneInput from "react-native-phone-number-input";
import Swiper from "react-native-swiper";
import Button from "src/components/ButtonComponent";
import TextInput from "src/components/TextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "src/styles/pages/registration";
import {
	emailValidator,
	nameValidator,
	streetValidator,
	phoneInputValidator,
	passwordValidator,
	confirmPasswordValidator
} from "src/utils/validators";
import { handleRegistration } from "src/redux/actions";

const RegistrationScreen = ({
	navigation,
	dispatchHandleRegistration
}) => {
	const swiper = useRef(null);
	const phoneInputRef = useRef(null);

	const [securePasswordText, setSecurePasswordText] = useState(true);
	const [secureConfirmPasswordText, setSecureConfirmPasswordText] = useState(true);

	const [firstName, setFirstName] = useState({ value: "", error: "" });
	const [lastName, setLastName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });
	const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
	const [street, setStreet] = useState({ value: "", error: "" });
	const [phoneInput, setPhoneInput] = useState({ value: "", error: "" });

	const getCountryCode = () => phoneInputRef.current.getCallingCode();

	const onRegistrationSuccess = () => {
		navigation.navigate("PhoneVerification", { mobileNumber: phoneInput.value, countryCode: getCountryCode() });
	};

	const onNext = () => {
		const firstNameError = nameValidator(firstName.value);
		const lastNameError = nameValidator(lastName.value);
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);
		const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

		if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) {
			setFirstName({ ...firstName, error: firstNameError });
			setLastName({ ...lastName, error: lastNameError });
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
		} else { swiper.current.scrollBy(1); }
	};

	const onSubmit = () => {
		const streetError = streetValidator(street.value);
		const phoneInputError = phoneInputValidator(phoneInput.value);
		if (streetError || phoneInputError) {
			setStreet({ ...street, error: streetError });
			setPhoneInput({ ...phoneInput, error: phoneInputError });
		} else {
			const registrationData = {
				template: "test",
				name: `${firstName.value} ${lastName.value}`,
				properties: {
					"First Name": firstName.value,
					"Last Name": lastName.value,
					"Email": email.value.toLowerCase(),
					"Password": password.value,
					"Street": street.value,
					"PhoneNumber": phoneInput.value,
					"CountryCode": getCountryCode()
				}
			};
			dispatchHandleRegistration(registrationData, onRegistrationSuccess);
		}
	};

	// const onNext = () => {
	//	swiper.current.scrollBy(1);
	// };

	const onPrevious = () => {
		swiper.current.scrollBy(-1);
	};

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<Swiper
				ref={swiper}
				style={styles.wrapper}
				showsButtons={false}
				showsPagination={false}
				autoplay={false}
				loop={false}
				scrollEnabled={false}
				index={0}
			>
				<View style={styles.slide}>
					<TouchableOpacity
						onPress={() => navigation.pop()}
						style={styles.backButtonArrow}
					>
						<FontAwesome
							name="angle-left"
							color="#12681c"
							size={30}
						/>
					</TouchableOpacity>
					<View style={styles.formContainer}>
						<Text style={styles.mainTitle}>Step 1</Text>
						<TextInput
							style={styles.textInputContainer}
							value={firstName.value}
							errorText={firstName.error}
							onChangeText={(value) => {
								setFirstName({ value: value, error: "" });
							}}
							autoCorrect={false}
							placeholder={translate("registrationScreen.firstNamePlaceholder")}
							returnKeyType="next"
						/>
						<TextInput
							style={styles.textInputContainer}
							value={lastName.value}
							errorText={lastName.error}
							onChangeText={(value) => {
								setLastName({ value: value, error: "" });
							}}
							autoCorrect={false}
							returnKeyType="next"
							placeholder={translate("registrationScreen.lastNamePlaceholder")}
						/>
						<TextInput
							style={styles.textInputContainer}
							value={email.value}
							errorText={email.error}
							onChangeText={(value) => {
								setEmail({ value: value, error: "" });
							}}
							autoCorrect={false}
							returnKeyType="next"
							keyboardType="email-address"
							placeholder={translate("registrationScreen.emailPlaceholder")}
						/>
						<View>
							<TouchableOpacity
								onPress={() => setSecurePasswordText(!securePasswordText)}
								style={styles.eyeIcon}
							>
								<FontAwesome
									name="eye"
									color="black"
									size={20}
								/>
							</TouchableOpacity>
							<TextInput
								style={styles.textInputContainer}
								value={password.value}
								secureTextEntry={securePasswordText}
								errorText={password.error}
								onChangeText={(value) => {
									setPassword({ value, error: "" });
								}}
								autoCorrect={false}
								returnKeyType="next"
								placeholder={translate("registrationScreen.password")}
							/>
						</View>
						<View>
							<TouchableOpacity
								onPress={() => setSecureConfirmPasswordText(!secureConfirmPasswordText)}
								style={styles.eyeIcon}
							>
								<FontAwesome
									name="eye"
									color="black"
									size={20}
								/>
							</TouchableOpacity>
							<TextInput
								style={styles.textInputContainer}
								value={confirmPassword.value}
								secureTextEntry={secureConfirmPasswordText}
								errorText={confirmPassword.error}
								onChangeText={(value) => {
									setConfirmPassword({ value, error: "" });
								}}
								autoCorrect={false}
								returnKeyType="next"
								placeholder={translate("registrationScreen.confirmPassword")}
							/>
						</View>
					</View>
					<View style={styles.fixedBottomArea}>
						<Button
							style={styles.nextStepButton}
							buttonClicked={() => {
								onNext();
							}}
							buttonText={translate("registrationScreen.nextButtonText")}
							buttonStyle={styles.topUpButtonStyle}
						/>
					</View>
				</View>
				<View style={styles.slide}>
					<TouchableOpacity
						style={styles.backButtonArrow}
						onPress={onPrevious}
					>
						<FontAwesome
							name="angle-left"
							color="#12681c"
							size={30}
						/>
					</TouchableOpacity>
					<View style={styles.formContainer}>
						<Text style={styles.mainTitle}>Step 2</Text>
						<TextInput
							style={[styles.textInputContainer, styles.inputStyles]}
							value={street.value}
							errorText={street.error}
							onChangeText={(value) => {
								setStreet({ value: value, error: "" });
							}}
							autoCorrect={false}
							placeholder={translate("registrationScreen.streetPlaceholder")}
							returnKeyType="next"
						/>
						<View style={styles.phoneInputView}>
							<PhoneInput
								ref={phoneInputRef}
								defaultCode="DM"
								value={phoneInput.value}
								errotText={phoneInput.error}
								onChangeText={(value) => {
									setPhoneInput({ value: value, error: "" });
								}}
								codeTextStyle={styles.codeText}
								textInputStyle={styles.codeTextInput}
								containerStyle={styles.phoneContainer}
								layout="second"
								withDarkTheme
							/>
							{
								phoneInput.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{phoneInput.error}</Text>
									</View>
								)
							}
						</View>
					</View>
					<View style={styles.fixedBottomArea}>
						<Button
							style={styles.nextStepButton}
							buttonClicked={() => {
								onSubmit();
							}}
							buttonText={translate("registrationScreen.submitButtonText")}
							buttonStyle={styles.topUpButtonStyle}
						/>
					</View>
				</View>
			</Swiper>
		</SafeAreaView>
	);
};

const mapDispatchToProps = {
	dispatchHandleRegistration: handleRegistration
};

export default connect(null, mapDispatchToProps)(RegistrationScreen);
