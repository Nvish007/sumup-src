import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, Image, Text, Alert } from "react-native";
import { Form, Item, Input } from "native-base";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import LanguageModal from "src/components/LanguageModalComponent";
import { Images } from "src/assets/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "src/styles/pages/editProfile";
import { translate } from "src/locales/i18n";
import i18n from "i18next";
import Button from "src/components/ButtonComponent";
import { getUser, getUserInfo, getLoginMethod, getEndUserId, getUserProfilePicture, getPaymentMethodInfo, getDocumentInfo } from "src/redux/selectors";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Modal from "react-native-modal";
import { uploadProfilePicture, updatePassword, handleGetPaymentMethod, getDocument, deleteDocument } from "src/redux/actions";
import {
	passwordValidator,
	passwordLengthValidator,
	confirmPasswordValidator,
	passwordCaseValidator,
	passwordNumericValidator,
	passwordCharValidator
} from "src/utils/validators";

const EditProfileScreen = ({
	user,
	method,
	endUserId,
	profilePicture,
	paymentInfo,
	navigation,
	documentInfo,
	dispatchUploadProfilePicture,
	dispatchUpdatePassword,
	dispatchGetPaymentMethod,
	dispatchGetDocument,
	dispatchDeleteDocument
}) => {
	// console.info("documentInfo", documentInfo);
	const [password, setPassword] = useState({ value: "", error: "" });
	const [confirmPassword, updateConfirmPassword] = useState({ value: "", error: "" });
	const [securePassword, updateSecurePassword] = useState(true);
	const [validated, setValidated] = useState(false);
	const [checkLength, setCheckLength] = useState(false);
	const [checkCaseString, setCheckCaseString] = useState(false);
	const [checkNumeric, setCheckNumeric] = useState(false);
	const [checkChar, setCheckChar] = useState(false);
	const [showLanguageModal, setLanguageModal] = useState(false);
	const [pickerOptionsModal, setPickerOptionsModal] = useState(false);
	const [passwordPicker, setPasswordPicker] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.myAccountDetails")
		});
	}, [navigation, i18n.language]);

	const handleCaptureResponse = (response) => {
		if (response.didCancel) {
			console.info("No Photo selected");
		} else if (response.errorCode === "camera_unavailable") {
			console.info("Camera not available on this device");
		} else if (response.errorCode === "permission") {
			console.info("permission not satisfied");
		} else if (response.errorCode === "others") {
			console.info("message", response.errorMessage);
		} else {
			const data = { profilePicture: `data:image/jpg;base64,${response.base64}` };
			dispatchUploadProfilePicture(data, response.uri);
		}
	};

	const pickProfilePic = (captureMethod) => {
		setPickerOptionsModal(false);
		setTimeout(() => {
			const options = {
				mediaType: "photo", // type
				maxWidth: 300,
				maxHeight: 550,
				quality: 1,
				includeBase64: true,
				saveToPhotos: true
			};
			if (captureMethod === "Camera") {
				launchCamera(options, handleCaptureResponse);
			} else {
				launchImageLibrary(options, handleCaptureResponse);
			}
		}, 500);
	};

	const onResponse = (response) => {
		if (response?.success) {
			Alert.alert(translate("alert.password"));
			// navigation.navigate("Home");
		} else {
			Alert.alert(translate("alert.error"));
		}
	};

	useEffect(() => {
		dispatchGetDocument(endUserId);
	}, []);

	const validatePassword = () => {
		let passwordValidation;
		const passwordError = passwordValidator(password.value);
		setPassword({ ...password, error: passwordError });
		const confirmPasswordError = passwordValidator(confirmPassword.value);
		updateConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
		if (!passwordError && !confirmPasswordError) {
			passwordValidation = confirmPasswordValidator(password.value, confirmPassword.value);
			updateConfirmPassword({ ...confirmPassword, error: passwordValidation });

			if (!passwordValidation) {
				const userObj = {
					userId: user._id,
					password: password.value,
					confirmPassword: confirmPassword.value
				};
				dispatchUpdatePassword(userObj, onResponse);
			}
		}
	};
	useEffect(() => {
		if (checkLength && checkCaseString && checkNumeric && checkChar) {
			setValidated(true);
		} else setValidated(false);
	}, [password]);

	useEffect(() => {
		dispatchGetPaymentMethod(endUserId);
	}, []);

	const onCallback = (res) => {
		Alert.alert(res.message);
		navigation.navigate("Home");
	};

	const onDeleteDocument = (id) => {
		let data = { document_id: id };
		Alert.alert(
			"Delete document",
			"Are you sure you want to delete this document?",
			[
				{
					text: "Yes",
					onPress: () => {
						dispatchDeleteDocument(endUserId, data, onCallback);
					}
				},
				{
					text: "Cancel",
					style: "cancel"
				},
			],
			{ cancelable: false }
		);
	};

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
		<SafeAreaView style={styles.mainScreenView}>
			<KeyboardAwareScrollView style={styles.mainScrollView}>
				<View style={styles.profileDetails}>
					{
						profilePicture
							? (
								<Image
									source={{ uri: profilePicture }}
									style={styles.profileImage}
								/>
							)
							: (
								<Image
									source={Images.authScreen.profileImage}
									style={styles.profileImage}
								/>
							)
					}
					<TouchableOpacity
						style={styles.editIcon}
						activeOpacity={0.5}
						// onPress={() => pickProfilePic()}
						onPress={() => setPickerOptionsModal(true)}
					>
						<Image
							source={Images.authScreen.editImage}
							style={styles.editImage}
						/>
					</TouchableOpacity>
					<View style={styles.profileName}>
						<Text style={styles.nameText}>
							{`${user.firstname} ${user.lastname}`}
						</Text>
						<Text style={styles.emailText}>{user?.email}</Text>
					</View>
				</View>
				<View style={styles.profileForm}>
					<View style={styles.mainContainer}>
						<Text style={styles.emailTitle}>{translate("profileScreen.language")}</Text>
						<TouchableOpacity
							onPress={() => setLanguageModal(true)}
							style={styles.languageButton}
						>
							{/* <Image source={Images.common.flagImage} style={styles.flagImage} /> */}
							{
								(i18n.language === "en")
								&& (
									<Text style={styles.languageName}>{translate("global.english")}</Text>
								)
							}
							{
								(i18n.language === "nl")
								&& (
									<Text style={styles.languageName}>{translate("global.dutch")}</Text>
								)
							}
							{
								(i18n.language === "hun")
								&& (
									<Text style={styles.languageName}>{translate("global.magyar")}</Text>
								)
							}
							<Image source={Images.common.downArrowIcon} style={styles.downArrowIcon} />
						</TouchableOpacity>
					</View>
					<View style={styles.paymentMethodStyle}>
						<Text style={styles.nameText}>{translate("profileScreen.document")}</Text>
						{
							documentInfo?.length > 0
								? (
									documentInfo.map((item) => (
										<View style={styles.paymentMethod} key={item.id}>
											<Text style={styles.titleText}>{item.document_title}</Text>
											<TouchableOpacity style={styles.imageIcon}>
												<Image source={{ uri: item.document_file }} style={styles.imageIcon} />
											</TouchableOpacity>
											<TouchableOpacity
												style={[styles.imageStyle]}
												onPress={() => onDeleteDocument(item.id)}
											>
												<Feather name="edit" size={25} />
											</TouchableOpacity>
										</View>
									))
								) : (
									(
										<View style={styles.paymentMethod}>
											<Text style={styles.titleText}>{translate("profileScreen.noPayments")}</Text>
											<TouchableOpacity onPress={() => navigation.navigate("DocumentsIdentityManual", { navigate: "Home" })}>
												<Text style={styles.noPaymentMethodText}>{translate("profileScreen.add")}</Text>
											</TouchableOpacity>
										</View>
									)
								)
						}
					</View>
					<View style={styles.paymentMethodStyle}>
						<Text style={styles.nameText}>{translate("profileScreen.paymentMethod")}</Text>
						{
						paymentInfo?.paymentMethods
							? (
								<View style={styles.paymentMethod}>
									<Text style={styles.methodType}>{paymentInfo?.paymentMethods?.card ? paymentInfo?.paymentMethods?.card?.brand : "Sepa debit"}</Text>
									<Text style={styles.cardDetails}>{`...${paymentInfo?.paymentMethods?.card ? paymentInfo?.paymentMethods?.card?.last4 : paymentInfo?.paymentMethods?.["sepa_debit"]?.last4}`}</Text>
									<TouchableOpacity onPress={() => navigation.navigate("PaymentMethod")}>
										<Feather name="edit" size={25} />
									</TouchableOpacity>
								</View>
							) : (
								<View style={styles.paymentMethod}>
									<Text style={styles.titleText}>{translate("profileScreen.noPayments")}</Text>
									<TouchableOpacity onPress={() => navigation.navigate("PaymentMethod")}>
										<Text style={styles.noPaymentMethodText}>{translate("profileScreen.add")}</Text>
									</TouchableOpacity>
								</View>
							)
						}
					</View>
					<View style={[styles.paymentMethodStyle, styles.passwordStyle]}>
						<Text style={styles.nameText}>{translate("profileScreen.passwordPlaceholder")}</Text>
						<TouchableOpacity style={styles.editIconStyle} onPress={() => setPasswordPicker(true)}>
							<Feather name="edit" size={25} />
						</TouchableOpacity>
					</View>
					<View style={[styles.mainContainer]}>
						<Text>{translate()}</Text>
						{/* <Text style={styles.emailTitle}>{translate("profileScreen.document")}</Text> */}
					</View>
				</View>
			</KeyboardAwareScrollView>
			<LanguageModal
				isVisible={showLanguageModal}
				onClose={() => setLanguageModal(false)}
			/>
			<Modal
				isVisible={passwordPicker}
				onBackdropPress={() => setPasswordPicker(false)}
				style={styles.modal}
			>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => setPasswordPicker(false)}
						style={styles.backButton}
					>
						<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
					</TouchableOpacity>
					{
						(method === "password")
						&& (
							<>
								<View style={styles.mainContainer}>
									<Text style={styles.emailTitle}>{translate("profileScreen.passwordPlaceholder")}</Text>
									<Form>
										<Item style={styles.nameItemInput} regular>
											<Image
												source={Images.authScreen.lockImage}
												style={styles.mailIcon}
											/>
											<Input
												value={password.value}
												onChangeText={(value) => {
													checkRequirment(value);
												}}
												secureTextEntry={securePassword}
												placeholder={translate("profileScreen.enterPassword")}
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
								<View style={styles.mainContainer}>
									<Text style={styles.emailTitle}>{translate("profileScreen.confirmPasswordPlaceholder")}</Text>
									<Form>
										<Item style={styles.nameItemInput} regular>
											<Image
												source={Images.authScreen.lockImage}
												style={styles.mailIcon}
											/>
											<Input
												value={confirmPassword.value}
												onChangeText={(value) => {
													updateConfirmPassword({ value, error: "" });
												}}
												secureTextEntry={securePassword}
												placeholder={translate("profileScreen.enterPassword")}
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
										confirmPassword.error.length > 0
								&& (
									<View>
										<Text style={styles.error}>{confirmPassword.error}</Text>
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
								<Button
									buttonText={translate("profileScreen.save")}
									buttonStyle={styles.confirmButton}
									textStyle={styles.buttonTextsStyle}
									style={styles.buttonContainer}
									buttonClicked={validatePassword}
								/>
							</>
						)
					}
				</View>
			</Modal>
			<Modal
				isVisible={pickerOptionsModal}
				style={styles.uploadOptionsModal}
			>
				<View style={styles.uploadOptionsContainer}>
					<Text>{translate("takeCarRentalImages.uploadPhoto")}</Text>
					<Text>{translate("takeCarRentalImages.chooseOption")}</Text>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => pickProfilePic("Camera")}
					>
						<Text>{translate("takeCarRentalImages.take")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => pickProfilePic("Choose from library")}
					>
						<Text>{translate("takeCarRentalImages.gallary")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.uploadOptionButton}
						onPress={() => setPickerOptionsModal(false)}
					>
						<Text>{translate("takeCarRentalImages.cancel")}</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	user: getUser(state),
	endUserId: getEndUserId(state),
	userInfo: getUserInfo(state),
	method: getLoginMethod(state),
	profilePicture: getUserProfilePicture(state),
	paymentInfo: getPaymentMethodInfo(state),
	documentInfo: getDocumentInfo(state),
});

const mapDispatchToProps = {
	dispatchUploadProfilePicture: uploadProfilePicture,
	dispatchUpdatePassword: updatePassword,
	dispatchGetPaymentMethod: handleGetPaymentMethod,
	dispatchGetDocument: getDocument,
	dispatchDeleteDocument: deleteDocument,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
