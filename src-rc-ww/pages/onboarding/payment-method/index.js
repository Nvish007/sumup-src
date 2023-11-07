/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Image, Text } from "react-native";
import { CardField, useStripe, StripeContainer } from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "src/components/ButtonComponent";
import Images from "src/assets/images";
import styles from "src/styles/pages/onBoarding";
import { onBoardingShowed, createCustomer, createSetupIntent, updateUserOnBoardingStatus, handleUserDetails } from "src/redux/actions";
import { getUser, getOnBoardingSteps, getEndUserId, getEnduserObject, getUserDetails } from "src/redux/selectors";
import { translate } from "src/locales/i18n";
import { showAlert } from "src/utils/native";
import { Form, Picker } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Payment = ({
	navigation: { navigate },
	route,
	user,
	steps,
	endUserId,
	userObject,
	dispatchOnBoardingShowed,
	dispatchCreateCustomer,
	dispatchCreateSetupIntent,
	dispatchUpdateUserOnBoardingStatus,
	dispathHandleUserDetails
}) => {
	const [card, setCard] = useState(null);
	const { confirmPayment, createPaymentMethod, confirmSetupIntent } = useStripe();
	const [isLoading, setIsLoading] = useState(false);
	const [paymentMethodType, setPaymentMethodType] = useState("Card");
	const billingDetails = {
		name: `${user.firstname} ${user.lastname}`,
		email: user.email,
		phone: `+${user.telephone}`,
		addressCity: userObject?.City?.value ? userObject.City.value : "Houston",
		// addressCountry: "US",
		addressLine1: (userObject?.Nr && userObject?.Street) ? `${userObject.Nr.value}  ${userObject.Street.value}` : "1459  Circle Drive",
		// addressLine2: "Texas",
		addressPostalCode: userObject?.Zip?.value ? userObject.Zip.value : "77063",
	};

	useEffect(() => {
		dispathHandleUserDetails(endUserId);
	}, []);
	const onNavigate = () => {
		const screenName = route.name;
		const stepIndex = steps.findIndex((step) => step === screenName);
		if (steps?.[stepIndex + 1]) {
			navigate(steps?.[stepIndex + 1]);
		} else {
			dispatchUpdateUserOnBoardingStatus();
			dispatchOnBoardingShowed();
		}
	};

	const onSetupIntentResponse = async(response) => {
		console.info("setup intent", response);
		try {
			if (response.success) {
				const { data: { clientSecret } } = response;
				const { setupIntent, error: setupIntentError } = await confirmSetupIntent(clientSecret, {
					type: paymentMethodType,
					billingDetails
				});
				console.info("setupIntent", setupIntent);
				if (setupIntentError) {
					setIsLoading(false);
					showAlert("Error", setupIntentError.message);
				} else {
					setIsLoading(false);
					onNavigate();
				}
			} else {
				setIsLoading(false);
				showAlert("Error", "Something went wrong");
			}
		} catch (error) {
			setIsLoading(false);
			showAlert("Error", error?.message);
		}
	};

	const onCreateCustomerResponse = (response) => {
		console.info("create customer", response);
		if (response.success) {
			const { data } = response;
			const setupIntentData = { customerId: data.id, paymentMethodType };
			console.info("setupIntentData", setupIntentData);
			dispatchCreateSetupIntent(setupIntentData, onSetupIntentResponse);
		} else {
			setIsLoading(false);
			showAlert("Error", "Something went wrong");
		}
	};

	const handlePayPress = async() => {
		setIsLoading(true);
		const createCustomerDetails = {
			userId: endUserId,
			firstName: user.firstname,
			lastName: user.lastname,
			email: user.email
		};
		if (paymentMethodType === "Card") {
			const { paymentMethod, error } = await createPaymentMethod({
				type: "Card",
				billingDetails,
			});
			if (error) {
				setIsLoading(false);
				showAlert(error.message);
			} else {
				createCustomerDetails.paymentId = paymentMethod.id;
				console.info("details", createCustomerDetails);
				dispatchCreateCustomer(createCustomerDetails, onCreateCustomerResponse);
			}
		} else {
			console.info("details", createCustomerDetails);
			dispatchCreateCustomer(createCustomerDetails, onCreateCustomerResponse);
		}
	};

	return (
		<StripeContainer keyboardShouldPersistTaps={false}>
			<SafeAreaView style={styles.safeView}>
				<ScrollView>
					<View style={styles.safeView}>
						<View style={styles.paymentInfoTitleContainer}>
							<Text style={styles.paymentInfoTitle}>{translate("payment.title")}</Text>
						</View>
						<View style={styles.cardImagesContainer}>
							<Image source={Images.common.visa} style={{ width: 80, height: 80, resizeMode: "contain" }} />
							<Image source={Images.common.masterCard} style={{ width: 80, height: 80, resizeMode: "contain", marginLeft: 10 }} />
						</View>
						<View>
							<Text style={styles.paymentMethodText}>{translate("payment.selectPaymentMethod")}</Text>
							<Form style={styles.dropDownStyle}>
								<Picker
									iosIcon={<FontAwesome name="caret-down" color="#333" style={styles.caretDownIcon} />}
									style={styles.dropDownPicker}
									textStyle={styles.pickerText}
									selectedValue={paymentMethodType}
									onValueChange={(value) => setPaymentMethodType(value)}
								>
									<Picker.Item value="Card" label="Card" />
									<Picker.Item value="Bancontact" label="Bancontact" />
									<Picker.Item value="Ideal" label="Ideal" />
								</Picker>
							</Form>
						</View>
						{
							paymentMethodType === "Card"
							&&	(
								<View style={styles.cardFieldContainer}>
									<CardField
										postalCodeEnabled={false}
										placeholder={{
											number: "4242 4242 4242 4242",
										}}
										cardStyle={{
											backgroundColor: "#FFFFFF",
											textColor: "#000000",
											borderWidth: 1,
											borderColor: "#000000",
											borderRadius: 10
										}}
										style={{
											width: "100%",
											height: 50,
											marginVertical: 30
										}}
										onCardChange={(cardDetails) => {
											setCard(cardDetails);
										}}
										onFocus={(focusedField) => {
											// console.info("focusField", focusedField);
										}}
									/>
								</View>
							)
						}
						<View style={styles.cardUsageDisclaimerContainer}>
							<Text style={styles.cardUsageDisclaimer}>{translate("payment.cardUsageDisclaimer")}</Text>
						</View>
					</View>
				</ScrollView>
				<View style={styles.verifyButtonContainer}>
					<Button
						buttonText={translate("onboarding.continue")}
						buttonStyle={styles.confirmButton}
						textStyle={styles.buttonTextsStyle}
						// buttonClicked={() => onNavigate()}
						buttonClicked={handlePayPress}
						isLoading={isLoading}
						disabled={isLoading}
					/>
					<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
				</View>
			</SafeAreaView>
		</StripeContainer>
	);
};

const mapStateToProps = (state) => ({
	user: getUser(state),
	steps: getOnBoardingSteps(state),
	endUserId: getEndUserId(state),
	userObject: getUserDetails(state),
});

const mapDispatchToProps = {
	dispatchOnBoardingShowed: onBoardingShowed,
	dispatchCreateCustomer: createCustomer,
	dispatchCreateSetupIntent: createSetupIntent,
	dispatchUpdateUserOnBoardingStatus: updateUserOnBoardingStatus,
	dispathHandleUserDetails: handleUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);