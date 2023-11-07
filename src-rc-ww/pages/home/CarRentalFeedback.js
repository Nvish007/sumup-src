import React, { useLayoutEffect, useState } from "react";
import { View, ScrollView, Image, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { Text } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/carRentalFeedback";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { Rating } from "react-native-ratings";
import { translate } from "src/locales/i18n";
import {
	getLocationsRequested,
} from "src/redux/actions";
import {
	getEndUserId,
} from "src/redux/selectors";

const CarRentalFeedback = ({
	navigation,
	endUserId,
	dispatchGetLocation,
}) => {
	const [input, updateInput] = useState({ value: "", error: "" });
	const [rating, updateRating] = useState("3");
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
			title: translate("pageTitles.carRentalFeedback")
		});
	}, [navigation]);

	const onClose = () => {
		updateIsVisible(false);
		const userInfo = { latitude: position.latitude, longitude: position.longitude, userId: endUserId };
		dispatchGetLocation(userInfo, serviceType);
		navigation.navigate("Home");
	};
	const onConfirm = () => {
		if (input.value) {
			updateIsVisible(true);
		} else {
			Alert.alert(translate("alert.response"));
		}
	};
	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.subContainer}>
					<Text style={styles.mainText}>{translate("carRentalFeedback.rateService")}</Text>
				</View>
				<View>
					<Rating
						// type="custom"
						ratingCount={5}
						imageSize={40}
						defaultRating={5}
						startingValue={rating}
						onFinishRating={(value) => updateRating(value)}
					/>
				</View>
				<View style={styles.ratingInput}>
					<TextInput
						multiline={true}
						numberOfLines={6}
						blurOnSubmit={false}
						placeholder={translate("carRentalFeedback.feedback")}
						style={styles.textArea}
						value={input.value}
						onChangeText={(value) => updateInput({ value, error: "" })}
					/>
				</View>
			</ScrollView>
			<Modal
				isVisible={isVisible}
				onBackdropPress={onClose}
			>
				<View style={styles.container}>
					<Text style={styles.message}>{translate("carRentalFeedback.popUpText1")}</Text>
					<Text style={styles.message}>{translate("carRentalFeedback.popUpText2")}</Text>
					<Image source={Images.common.thumbsUp} style={styles.thumbsUpImage} />
				</View>
			</Modal>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("carRentalFeedback.confirm")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onConfirm}
				/>
				{/* <Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} /> */}
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchGetLocation: getLocationsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarRentalFeedback);