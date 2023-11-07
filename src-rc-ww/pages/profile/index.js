import React from "react";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { Form, Item, Label } from "native-base";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import styles from "src/styles/pages/profile";
import Button from "src/components/ButtonComponent";
// import stripe from "src/utils/stripe";
// import { showAlert } from "src/utils/native";

const ProfileScreen = () => {
	// const addCardDetails = async() => {
	// 	try {
	// 		const cardDetails = await stripe.paymentRequestWithCardForm();
	// 		console.info("cardDetails", cardDetails);
	// 	} catch (error) {
	// 		showAlert("Error", error.message);
	// 	}
	// };

	return (
		<ScrollView style={styles.profileScrollView}>
			<FocusAwareStatusBar barStyle="light-content" />
			<View style={styles.profileMainView}>
				<View style={styles.profileImageView}>
					<Image
						source={Images.profileScreen.profileImage}
						style={styles.profileImage}
					/>
					<TouchableOpacity
						style={styles.profileUpdateButton}
					>
						<FontAwesome
							name="pencil"
							color="white"
							size={18}
						/>
					</TouchableOpacity>
				</View>
				<Form style={styles.formArea}>
					<Item style={styles.formInputItem} floatingLabel>
						<Label style={styles.inputLabel}>{translate("profileScreen.firstNamePlaceholder")}</Label>
						<TextInput
							style={styles.textInputContainer}
							value=""
							keyboardType="name"
							autoCorrect={false}
							returnKeyType="next"
							// errorText={email.error}
						/>
					</Item>
					<Item style={styles.formInputItem} floatingLabel>
						<Label style={styles.inputLabel}>{translate("profileScreen.lastNamePlaceholder")}</Label>
						<TextInput
							style={styles.textInputContainer}
							value=""
							keyboardType="name"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Item>
					<Item style={styles.formInputItem} floatingLabel>
						<Label style={styles.inputLabel}>{translate("profileScreen.mobileNumberPlaceholder")}</Label>
						<TextInput
							style={styles.textInputContainer}
							value=""
							keyboardType="number"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Item>
					<Item style={styles.formInputItem} floatingLabel>
						<Label style={styles.inputLabel}>{translate("profileScreen.emailPlaceholder")}</Label>
						<TextInput
							style={styles.textInputContainer}
							value="demo@wowconnect.be"
							keyboardType="email-address"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Item>
					<Item style={styles.formInputItem} floatingLabel>
						<Label style={styles.inputLabel}>{translate("profileScreen.passwordPlaceholder")}</Label>
						<TextInput
							style={styles.textInputContainer}
							value=""
							keyboardType="password"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Item>
					<Button
						style={styles.addCreditCard}
						buttonText="Add Credit Card"
						// buttonClicked={addCardDetails}
					/>
					<Button
						style={styles.submitButton}
						buttonText="Submit"
					/>
				</Form>
			</View>
		</ScrollView>
	);
};

export default ProfileScreen;
