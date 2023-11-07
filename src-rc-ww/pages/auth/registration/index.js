import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollView, View, TouchableOpacity, Text, Image, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Form, Item, Input } from "native-base";
import { translate } from "src/locales/i18n";
import Button from "src/components/ButtonComponent";
import CheckBox from "src/components/CheckBoxComponent";
import styles from "src/styles/pages/registration";
import Images from "src/assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getUserId, getUser, getUserInfo } from "src/redux/selectors";
import { handleRegistration } from "src/redux/actions";
import {
	nameValidator,
	emailValidator,
	passwordValidator,
	passwordLengthValidator,
	passwordStringValidator,
	passwordCaseValidator,
	passwordNumericValidator,
	passwordCharValidator
} from "src/utils/validators";
// import { getUserInfo } from "../../../redux/selectors/user";

const RegistrationScreen = ({
	navigation,
	userId,
	user,
	userInfo,
	dispatchRegistration,
}) => {
	const swiper = useRef(null);
	const [firstName, updateFirstName] = useState({ value: user?.firstname ? user?.firstname : userInfo?.firstname, error: "" }); // user?.givenName ? user.givenName : user?.displayName ? user.displayName : user.firstName
	const [lastName, updateLastName] = useState({ value: user?.lastname ? user?.lastname : userInfo?.lastname, error: "" });
	const [email, updateEmail] = useState({ value: user?.email ? user?.email : userInfo?.email, error: "" });
	const [password, updatePassword] = useState({ value: "", error: "" });
	const [securePassword, updateSecurePassword] = useState(true);
	const [checkNewsletter, setCheckNewsletter] = useState(false);
	const [checkLength, setCheckLength] = useState(false);
	const [validated, setValidated] = useState(false);
	const [checkCaseString, setCheckCaseString] = useState(false);
	const [checkNumeric, setCheckNumeric] = useState(false);
	const [checkChar, setCheckChar] = useState(false);
	const [checkTnC, setCheckTnC] = useState(false);
	const [checkPrivacyPolicy, setCheckPrivacyPolicy] = useState(false);

	const onPrevious = () => {
		swiper.current.scrollBy(-1);
	};

	const onRegistrationResult = (response) => {
		if (response?.endUser?.onboarding === "1") {
			navigation.navigate("Onboarding");
		} else {
			navigation.navigate("CompanyList");
		}
	};

	const submit = () => {
		const data = {
			firstname: firstName.value,
			lastname: lastName.value,
			identifier: userInfo?.identifier ? userInfo?.identifier : email.value,
			email: email.value,
			token: userInfo?.token ? userInfo?.token : password.value,
			method: userInfo?.method ? userInfo?.method : "password",
			userId
		};
		dispatchRegistration(data, onRegistrationResult);
	};

	const onNext = (field) => {
		switch (field) {
			case "firstName" && "lastName" && "email": {
				const firstNameError = nameValidator(firstName.value, "First Name");
				const lastNameError = nameValidator(lastName.value, "Last Name");
				const emailError = emailValidator(email.value);
				updateFirstName({ ...firstName, error: firstNameError });
				updateLastName({ ...lastName, error: lastNameError });
				updateEmail({ ...email, error: emailError });
				if (!firstNameError && !lastNameError && !emailError) {
					if (checkTnC && checkPrivacyPolicy) {
						swiper.current.scrollBy(1);
					} else {
						Alert.alert(translate("alert.error"));
					}
				}
				break;
			}
			case "firstName": {
				const firstNameError = nameValidator(firstName.value, "First Name");
				updateFirstName({ ...firstName, error: firstNameError });
				if (!firstNameError) {
					swiper.current.scrollBy(1);
				}
				break;
			}
			case "lastName": {
				const lastNameError = nameValidator(lastName.value, "Last Name");
				updateLastName({ ...lastName, error: lastNameError });
				if (!lastNameError) {
					swiper.current.scrollBy(1);
				}
				break;
			}
			case "email": {
				const emailError = emailValidator(email.value);
				updateEmail({ ...email, error: emailError });
				if (!emailError) {
					swiper.current.scrollBy(1);
				}
				break;
			}
			case "password": {
				let passwordLengthError;
				const passwordError = passwordValidator(password.value);
				updatePassword({ ...password, error: passwordError });
				if (!passwordError) {
					passwordLengthError = passwordStringValidator(password.value);
					updatePassword({ ...password, error: passwordLengthError });
				}
				if (!passwordError && !passwordLengthError) {
					submit();
				}
				break;
			}
		}
	};
	useEffect(() => {
		if (checkLength && checkCaseString && checkNumeric && checkChar) {
			setValidated(true);
		} else setValidated(false);
	}, [password]);

	const checkRequirment = (value) => {
		updatePassword({ value, error: "" });
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

	const onCheckLogin = () => {
		if (userInfo) {
			submit();
		} else {
			onNext("firstName" && "lastName" && "email");
		}
	};

	const ContinueRegister = () => (
		<View style={styles.formContainer}>
			<Button
				buttonText={translate("registrationScreen.continue")}
				buttonStyle={styles.confirmButton}
				textStyle={styles.buttonTextsStyle}
				buttonClicked={onCheckLogin}
				disabled={!firstName.value || !lastName.value || !email.value || !checkTnC || !checkPrivacyPolicy}
			/>
			<Image source={Images.common.forwardArrow} style={styles.confirmForwardIcon} />
		</View>
	);

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
					<KeyboardAwareScrollView contentContainerStyle={styles.mainScrollView}>
						<View style={styles.screenFixHeader}>
							<TouchableOpacity
								style={styles.backButtonArrow}
								onPress={() => navigation.pop()}
							>
								<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
							</TouchableOpacity>
							<Text style={styles.headerText}>{translate("registrationScreen.registration")}</Text>
						</View>

						<View style={styles.appLogoContainer}>
							<Image
								source={Images.authScreen.mobility}
								style={styles.logo}
							/>
						</View>
						<View style={styles.titleFont}>
							<Text style={styles.socialLinksText}>{translate("registrationScreen.registrationText")}</Text>
						</View>
						<View style={styles.mainContainer}>
							<View>
								<Text style={styles.emailTitle}>{translate("registrationScreen.firstNamePlaceholder")}</Text>
								<Form>
									<Item style={styles.nameItemInput} regular>
										<Image
											source={Images.registrationScreen.userInputIcon}
											style={styles.inputUserIcon}
										/>
										<Input
											style={styles.emailInput}
											value={firstName.value}
											onChangeText={(value) => {
												updateFirstName({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
								{
									firstName.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{firstName.error}</Text>
									</View>
								)
								}
							</View>
							<View style={styles.viewStyle}>
								<Text style={styles.emailTitle}>{translate("registrationScreen.lastNamePlaceholder")}</Text>
								<Form>
									<Item style={styles.nameItemInput} regular>
										<Image
											source={Images.registrationScreen.userInputIcon}
											style={styles.inputUserIcon}
										/>
										<Input
											style={styles.emailInput}
											value={lastName.value}
											onChangeText={(value) => {
												updateLastName({ value, error: "" });
											}}
										/>
									</Item>
								</Form>
								{
									lastName.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{lastName.error}</Text>
									</View>
								)
								}
							</View>
						</View>
						<View style={styles.emailContainer}>
							<Text style={styles.emailTitle}>{translate("registrationScreen.emailPlaceholder")}</Text>
							<Form>
								<Item style={styles.nameItemInput} regular>
									<MaterialIcons
										name="mail-outline"
										style={styles.mailIcon}
										size={22}
									/>
									<Input
										style={styles.emailInput}
										numberOfLines={1}
										value={email.value}
										autoCapitalize="none"
										onChangeText={(value) => {
											updateEmail({ value: value, error: "" });
										}}
									/>
								</Item>
							</Form>
							{
								email.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{email.error}</Text>
									</View>
								)
							}
						</View>
						<View>

							<View style={[styles.termsAndConditionContainer, styles.margin]}>
								<CheckBox
									checked={checkTnC}
									onChange={() => { setCheckTnC(!checkTnC); }}
									containerStyle={styles.checkboxContainerStyle}
								/>
								<Text style={styles.acceptText}>{translate("termsAndCondition.accept")}</Text>
								<TouchableOpacity>
									<Text style={styles.termsAndConditionText}>{translate("termsAndCondition.termsAndCondition")}</Text>
								</TouchableOpacity>
							</View>
							<View style={[styles.termsAndConditionContainer, styles.marginTop]}>
								<CheckBox
									checked={checkPrivacyPolicy}
									onChange={() => { setCheckPrivacyPolicy(!checkPrivacyPolicy); }}
									containerStyle={styles.checkboxContainerStyle}
								/>
								<Text style={styles.acceptText}>{translate("termsAndCondition.accept")}</Text>
								<TouchableOpacity>
									<Text style={styles.termsAndConditionText}>{translate("termsAndCondition.privacyPolicy")}</Text>
								</TouchableOpacity>
							</View>
							<View style={[styles.row, styles.margin]}>
								<CheckBox
									checked={checkNewsletter}
									onChange={() => { setCheckNewsletter(!checkNewsletter); }}
									containerStyle={styles.checkboxContainerStyle}
								/>
								<Text style={[styles.textMargin, styles.checkText]}>{translate("registrationScreen.newsletter")}</Text>
							</View>
						</View>
						{
							Platform.OS === "android" && (
								<ContinueRegister />
							)
						}
					</KeyboardAwareScrollView>
					{
						Platform.OS === "ios" && (
							<ContinueRegister />
						)
					}
				</View>
				<View style={styles.slide}>
					<View style={styles.screenFixHeader}>
						<TouchableOpacity
							style={styles.backButtonArrow}
							onPress={onPrevious}
						>
							<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
						</TouchableOpacity>
						<Text style={styles.headerText}>{translate("registrationScreen.registration")}</Text>
					</View>
					<ScrollView style={styles.mainScrollView}>
						<View style={styles.appLogoContainer}>
							<Image
								source={Images.authScreen.mobility}
								style={styles.logo}
							/>
						</View>
						<View style={styles.titleFont}>
							<Text style={styles.socialLinksText}>{translate("registrationScreen.registrationText")}</Text>
						</View>
						<View style={styles.mainContainer}>
							<Text style={styles.emailTitle}>{translate("registrationScreen.password")}</Text>
							<Form>
								<Item style={styles.nameItemInput} regular>
									<MaterialIcons
										style={styles.mailIcon}
										size={22}
										name="lock-outline"
									/>
									<Input
										onChangeText={(value) => {
											// updatePassword({ value, error: "" });
											checkRequirment(value);
										}}
										secureTextEntry={securePassword}
									/>
									{
										securePassword
											? (
												<TouchableOpacity
													onPress={() => { updateSecurePassword(!securePassword); }}
												>
													<MaterialIcons
														style={styles.passwordIcon}
														name="visibility-off"
														color="#000000"
														size={22}
													/>
												</TouchableOpacity>
											) : (
												<TouchableOpacity
													onPress={() => { updateSecurePassword(!securePassword); }}
												>
													<MaterialIcons
														style={styles.passwordIcon}
														name="visibility"
														color="#000000"
														size={22}
													/>
												</TouchableOpacity>
											)
									}
								</Item>
							</Form>
							{
								password.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{password.error}</Text>
									</View>
								)
							}
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
					</ScrollView>
					<View style={styles.formContainer}>
						<Button
							buttonStyle={styles.confirmButton}
							textStyle={styles.buttonTextsStyle}
							buttonText={translate("registrationScreen.submitButtonText")}
							buttonClicked={() => onNext("password")}
							disabled={validated === false}
						/>
						<Image source={Images.common.forwardArrow} style={styles.confirmForwardIcon} />
					</View>
				</View>
			</Swiper>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	userId: getUserId(state),
	user: getUser(state),
	userInfo: getUserInfo(state),
});

const mapDispatchToProps = {
	dispatchRegistration: handleRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);