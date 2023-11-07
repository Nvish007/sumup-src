import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import { Text } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/startRentalCarState";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-ratings";
import { translate } from "src/locales/i18n";
import { updateStateOfCar, getLocationsRequested } from "src/redux/actions";
// import { nameValidator } from "src/utils/validators";
import { getRentalId, getEndUserId, getLocationDetails } from "src/redux/selectors";
import { showAlert } from "src/utils/native";
import AppTheme from "../../styles/theme";

const StartRentalCarState = ({
	navigation,
	rentalId,
	endUserId,
	dispatchUpdateStateOfCar,
	dispatchGetLocation,
}) => {
	const [remarks, updateRemarks] = useState({ value: "", error: "" });
	const [insideRating, updateInsideRating] = useState("0");
	const [outsideRating, updateOutsideRating] = useState("0");
	const [isVisible, updateIsVisible] = useState(false);
	const [position] = useState({
		latitude: 50.925865552619264,
		longitude: 4.823121826486527,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	const serviceType = "sharingService";

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.stateOfTheCar")
		});
	}, [navigation]);

	const onResponse = (response) => {
		if (response.success) {
			updateIsVisible(true);
		} else {
			showAlert("Error", response?.message ? response.message : "Something went wrong");
		}
	};

	const onClose = () => {
		updateIsVisible(false);
	};

	const onStartRide = () => {
		navigation.navigate("Home");
		const userInfo = { latitude: parseFloat(position.latitude), longitude: parseFloat(position.longitude), userId: endUserId };
		dispatchGetLocation(userInfo, serviceType);
	};

	const onContinue = () => {
		const data = {
			rentalId,
			stateInside: insideRating,
			stateOutside: outsideRating,
			stateRemarks: remarks.value
		};
		// console.info(data);
		dispatchUpdateStateOfCar(data, onResponse);

		// const remarksError = nameValidator(remarks.value, "Remarks");
		// if (remarksError) {
		// 	updateRemarks({ ...remarks, error: remarksError });
		// } else {
		// 	updateRemarks({ ...remarks, error: "" });
		// 	const data = {
		// 		rentalId,
		// 		stateInside: insideRating,
		// 		stateOutside: outsideRating,
		// 		stateRemarks: remarks.value
		// 	};
		// 	console.info(data);
		// 	dispatchUpdateStateOfCar(data, onResponse);
		// }
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
						<Text style={styles.alertText}>{translate("startRentalCarState.startFormAlert")}</Text>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View style={styles.noteContainer}>
						<Image source={Images.carRental.noteIcon} style={styles.noteIcon} />
						<Text style={styles.desText}>{translate("startRentalCarState.describe")}</Text>
					</View>
				</View>
				<View style={styles.carContainer}>
					<View style={styles.column}>
						<View style={styles.rowCar}>
							<Image source={Images.carRental.carInsideIcon} style={styles.margin} />
							<Text style={styles.ratingInput}>{translate("startRentalCarState.inside")}</Text>
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
							<Text style={styles.ratingInput}>{translate("startRentalCarState.outside")}</Text>
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
						placeholder={translate("startRentalCarState.remarks")}
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
					buttonText={translate("startRentalCarState.startRide")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonText}
					buttonClicked={onContinue}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
			<Modal
				isVisible={isVisible}
				onBackdropPress={onClose}
				style={styles.modal}
			>
				<View style={styles.container}>
					<Text style={styles.titleText}>{translate("startRentalCarState.youCanStart")}</Text>
					<View>
						<Text style={styles.titleText2}>{translate("startRentalCarState.pressStart")}</Text>
					</View>
					{/* <View style={styles.detailsList}>
						<Text style={styles.detailsListText}>{translate("startRentalCarState.startAndStop")}</Text>
					</View> */}
					<View>
						<Text style={[styles.titleText2]}>
							{translate("startRentalCarState.greeting")}
						</Text>
					</View>
					<Button
						buttonText={translate("startRentalCarState.okay")}
						style={styles.buttonContainer}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onStartRide}
					/>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	rentalId: getRentalId(state),
	endUserId: getEndUserId(state),
	locationDetails: getLocationDetails(state)
});

const mapDispatchToProps = {
	dispatchUpdateStateOfCar: updateStateOfCar,
	dispatchGetLocation: getLocationsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRentalCarState);
