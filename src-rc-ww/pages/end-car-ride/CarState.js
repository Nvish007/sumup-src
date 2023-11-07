import React, { useState } from "react";
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
import AppTheme from "../../styles/theme";

const CarState = ({
	navigation,
}) => {
	const [remarks, updateRemarks] = useState({ value: "" });
	const [insideRating, updateInsideRating] = useState("0");
	const [outsideRating, updateOutsideRating] = useState("0");

	const onContinue = () => {
		const data = {
			stateInside: insideRating,
			stateOutside: outsideRating,
			stateRemarks: remarks.value
		};
		navigation.navigate("EndCarRideCarFinalCheck", { data: data });
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
						onChangeText={(value) => updateRemarks({ value })}
					/>
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

export default connect(null, null)(CarState);