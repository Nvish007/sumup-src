import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Image, TextInput } from "react-native";
import { Text } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/carRentalState";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-ratings";
import { translate } from "src/locales/i18n";
import { updateStateOfCar } from "src/redux/actions/index";
import { nameValidator } from "src/utils/validators";
import { showAlert } from "../../utils/native";
import AppTheme from "../../styles/theme";

// import DatePicker from 'react-native-date-picker';

const CarRentalState = ({
	navigation,
	dispatchUpdateStateOfCar
}) => {
	const [remarks, updateRemarks] = useState({ value: "", error: "" });
	const [insideRating, updateInsideRating] = useState("0");
	const [outsideRating, updateOutsideRating] = useState("0");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.stateOfTheCar")
		});
	}, [navigation]);

	const onResponse = (response) => {
		if (response.success) {
			navigation.navigate("CarRentalFinalCheck");
		} else {
			showAlert("Error", response?.message ? response.message : "Something went wrong");
		}
	};

	const onContinue = () => {
		// navigation.navigate("CarRentalFinalCheck");
		const remarksError = nameValidator(remarks.value, "Remarks");
		if (remarksError) {
			updateRemarks({ ...remarks, error: remarksError });
		} else {
			updateRemarks({ ...remarks, error: "" });
			const data = {
				rentalId: "688",
				stateInside: insideRating,
				stateOutside: outsideRating,
				stateRemarks: remarks.value
			};
			dispatchUpdateStateOfCar(data, onResponse);
		}
	};

	return (
		<SafeAreaView
			style={styles.safeView}
			edges={["left", "bottom", "right"]}
		>
			<KeyboardAwareScrollView style={styles.mainScrollView} extraHeight={50}>
				<View style={styles.alertContainer}>
					<View
						style={[styles.rowCar]}
					>
						<Image source={Images.carRental.alertIcon} style={styles.alertIcon} />
						<Text style={styles.alertText}>{translate("carRentalState.endFormAlert")}</Text>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View style={styles.noteContainer}>
						<Image source={Images.carRental.noteIcon} style={styles.noteIcon} />
						<Text style={styles.desText}>{translate("carRentalState.describe")}</Text>
					</View>
				</View>
				<View style={styles.carContainer}>
					<View style={styles.column}>
						<View style={styles.rowCar}>
							<Image source={Images.carRental.carInsideIcon} style={styles.margin} />
							<Text style={styles.ratingInput}>{translate("carRentalState.inside")}</Text>
						</View>
						<Rating
							style={styles.ratingInput}
							type="custom"
							ratingCount={5}
							imageSize={30}
							defaultRating={5}
							startingValue={insideRating}
							onFinishRating={(value) => updateInsideRating(value)}
							// ratingColor="#008c44"
							ratingColor={AppTheme.colors.primary}
							ratingBackgroundColor="#c8c7c8"
							// readonly={true}
							tintColor="#fff"
						/>
					</View>
					<View style={styles.carPadding}>
						<View style={styles.rowCar}>
							<Image source={Images.carRental.carOutsideIcon} style={styles.margin} />
							<Text style={styles.ratingInput}>{translate("carRentalState.outside")}</Text>
						</View>
						<Rating
							style={styles.ratingInput}
							type="custom"
							ratingCount={5}
							imageSize={30}
							defaultRating={5}
							startingValue={outsideRating}
							onFinishRating={(value) => updateOutsideRating(value)}
							// ratingColor="#008c44"
							ratingColor={AppTheme.colors.primary}
							ratingBackgroundColor="#c8c7c8"
							// readonly={true}
							tintColor="#fff"
						/>
					</View>
				</View>
				<View style={[styles.ratingInput, styles.remarkInput]}>
					<TextInput
						multiline={true}
						numberOfLines={6}
						blurOnSubmit={false}
						placeholder={translate("carRentalState.remarks")}
						style={styles.textArea}
						value={remarks.value}
						onChangeText={(value) => updateRemarks({ value, error: "" })}
					/>
					{
						remarks.error
							?	(
								<View style={styles.remarksError}>
									<Text style={styles.errorMessage}>{remarks.error}</Text>
								</View>
							)
							:	null
					}
				</View>
			</KeyboardAwareScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("carRentalState.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonText}
					buttonClicked={onContinue}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapDispatchToProps = {
	dispatchUpdateStateOfCar: updateStateOfCar
};

export default connect(null, mapDispatchToProps)(CarRentalState);
