/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { Image, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ActionSheet, Button } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TextInput from "src/components/TextInput";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "src/styles/pages/profileOld";

const BUTTONS = ["en", "fr", "Cancel"];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

const ProfileScreenOld = ({
	navigation
}) => {
	// eslint-disable-next-line no-unused-vars
	const [clicked, setClicked] = useState();
	return (
		<ScrollView style={styles.profileScrollView}>
			<View style={styles.profileMainView}>
				<View style={styles.profileImageView}>
					<Image
						source={Images.authScreen.profileImage}
						style={styles.profileImage}
					/>
					<TouchableOpacity
						style={styles.changePasswordButton}
						onPress={() => navigation.navigate("Home")}
					>
						<Text style={styles.changePasswordText}>Change Password</Text>
					</TouchableOpacity>
				</View>
				<TextInput
					style={styles.textInputContainer}
					value="demo@wowconnect.be"
					placeholder={translate("profileScreen.emailPlaceholder")}
					keyboardType="email-address"
					autoCorrect={false}
					// errorText={email.error}
					returnKeyType="next"
				/>
				<TextInput
					style={styles.textInputContainer}
					value="Wouter"
					placeholder={translate("profileScreen.firstNamePlaceholder")}
					keyboardType="name"
					autoCorrect={false}
					returnKeyType="next"
				/>
				<TextInput
					style={styles.textInputContainer}
					value=""
					placeholder={translate("profileScreen.lastNamePlaceholder")}
					keyboardType="name"
					autoCorrect={false}
					returnKeyType="next"
				/>
				<Grid>
					<Col size={0.8} style={styles.colLeft}>
						<TextInput
							style={styles.textInputContainer}
							value="+32"
							placeholder={translate("profileScreen.pinCodePlaceholder")}
							keyboardType="number"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Col>
					<Col size={2.2} style={styles.colRight}>
						<TextInput
							style={styles.textInputContainer}
							value="499420135"
							placeholder={translate("profileScreen.mobileNumberPlaceholder")}
							keyboardType="number"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Col>
				</Grid>
				<Grid>
					<Col size={2.2} style={styles.colLeft}>
						<TextInput
							style={styles.textInputContainer}
							value="Rue Emile Deltenre"
							placeholder={translate("profileScreen.streetPlaceholder")}
							keyboardType="name"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Col>
					<Col size={0.8} style={styles.colRight}>
						<TextInput
							style={styles.textInputContainer}
							value="24M"
							placeholder={translate("profileScreen.nRPlaceholder")}
							keyboardType="name"
							autoCorrect={false}
							returnKeyType="next"
						/>
					</Col>
				</Grid>
				<TextInput
					style={styles.textInputContainer}
					value="7912"
					placeholder={translate("profileScreen.zipPlaceholder")}
					keyboardType="name"
					autoCorrect={false}
					returnKeyType="next"
				/>
				<TextInput
					style={styles.textInputContainer}
					value="Saint-Sauveur"
					placeholder={translate("profileScreen.cityPlaceholder")}
					keyboardType="name"
					autoCorrect={false}
					returnKeyType="next"
				/>
				<View padder>
					<Button
						style={styles.languageSelect}
						onPress={() => {
							ActionSheet.show({
								options: BUTTONS,
								cancelButtonIndex: CANCEL_INDEX,
								destructiveButtonIndex: DESTRUCTIVE_INDEX,
								title: "Language"
							}, (buttonIndex) => {
								setClicked(BUTTONS[buttonIndex]);
							});
						}}
					>
						<Text style={styles.languageSelectText}>Language</Text>
						<FontAwesome
							style={styles.languageSelectText}
							name="sort-down"
						/>
					</Button>
				</View>
				<ButtonComponent
					style={styles.updateButton}
					buttonText={translate("profileScreen.updateButtonText")}
					buttonStyle={{ borderRadius: 4 }}
				/>
			</View>
		</ScrollView>
	);
};

export default ProfileScreenOld;
