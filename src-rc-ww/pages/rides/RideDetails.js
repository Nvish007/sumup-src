import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TextInput, Alert, Image } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import { translate } from "src/locales/i18n";
import styles from "src/styles/pages/rideDetails";
import Button from "src/components/ButtonComponent";
import { Images } from "src/assets/images";
import FastImage from "src/components/ImageComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-ratings";
import dayjs from "dayjs";
import Config from "react-native-config";
import { handleRentalGiveFeedback, handleRentalList, selectRent } from "src/redux/actions";
import { getEndUserId, getSelectedRent } from "src/redux/selectors";
import AppTheme from "../../styles/theme";

const RideDetails = ({
	endUserId,
	navigation,
	rentDetails,
	dispatchRentalList,
	dispatchRentalGiveFeedback,
	dispatchUpdateSelectedRent
}) => {
	const { startDate, startLocation, endDate, endLocation, distance, asset, id, feedback, score } = rentDetails;
	const [input, updateInput] = useState({ value: feedback, error: "" });
	const [rating, updateRating] = useState(score);
	const [startDateTime, setStartDateTime] = useState("");
	const [endDateTime, setEndDateTime] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	// console.info(input.value);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.rideDetails")
		});
	}, [navigation]);

	useEffect(() => {
		const startUTC = dayjs.utc(startDate);
		const endUTC = dayjs.utc(endDate);
		const startTimeZone = dayjs.utc(startUTC).local().format("YYYY-MM-DD HH:mm");
		const endTimeZone = dayjs.utc(endUTC).local().format("YYYY-MM-DD HH:mm");
		const startFormat = dayjs(startTimeZone).format("DD/MM/YYYY HH:mm");
		const endFormat = dayjs(endTimeZone).format("DD/MM/YYYY HH:mm");
		setStartDateTime(startFormat);
		setEndDateTime(endFormat);

		const startTime = dayjs(startTimeZone);
		const endTime = dayjs(endTimeZone);
		const diff = endTime.diff(startTime, "second");

		const diffFormat = new Date(diff * 1000).toISOString().substr(11, 8);
		const diffValue = diffFormat.split(":");
		setHours(diffValue[0]);
		setMinutes(diffValue[1]);
	}, []);

	const onResponse = (resp) => {
		dispatchRentalList(endUserId);
		if (resp.code === 100) {
			dispatchUpdateSelectedRent({
				...rentDetails,
				feedback: input.value,
				score: rating
			});
			Alert.alert(translate("alert.feedback"));
			dispatchRentalList(endUserId);
		} else {
			Alert.alert(translate("alert.error"));
		}
	};

	const submitFeedback = () => {
		if (rating) {
			let data = {
				user_id: endUserId,
				rental_id: id,
				score: rating,
				feedback: input.value
			};
			// console.info(data);
			dispatchRentalGiveFeedback(data, onResponse);
		} else if (!rating) {
			Alert.alert(translate("alert.rating"));
		}
	};

	return (
		<SafeAreaView
			style={styles.safeView}
			edges={["right", "bottom", "left"]}
		>
			<KeyboardAwareScrollView style={styles.mainScrollView} extraScrollHeight={50}>
				<View style={styles.rideDetailsContainer}>
					{
						(asset?.type === "car")
							&& (
								(asset.properties?.photo)
									? (
										<Image
											source={{ uri: `${Config.ASSET_SERVICE}${asset.properties.photo[0]}` }}
											style={styles.rideDetailsImage}
										/>
									)
									: (
										<FastImage
											style={styles.rideDetailsImage}
											imageUrl={Images.common.car}
											resizeMode="cover"
											type="local"
										/>
									)
							)
					}
					{
						(asset?.type === "bike")
							&& (
								<FastImage
									style={styles.rideDetailsImage}
									imageUrl={Images.common.bicycle}
									resizeMode="cover"
									type="local"
								/>
							)
					}
					{/* <Image source={Images.common.car} style={styles.rideDetailsImage} /> */}
					<View style={styles.rideDetails}>
						<View>
							<Text style={styles.boldText}>{asset?.name}</Text>
							{
								(asset.type === "car")
								&& (
									<Text style={styles.carModelText}>{asset?.properties?.["license-plate"]}</Text>
								)
							}
						</View>
						{/* <View style={styles.rideDetailsAddress}>
							<Text style={styles.carModelText}>Address of the</Text>
							<Text style={styles.carModelText}>asset</Text>
						</View> */}
					</View>
				</View>
				<View style={styles.pricingContainer}>
					<Text style={styles.pricingTitle}>{translate("rideDetails.rental")}</Text>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.start")}</Text>
						<Text>{startDate ? startDateTime : translate("rideDetails.notAvailable")}</Text>
					</View>
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.startLocation")}</Text>
						<Text>{startLocation?.name ? startLocation.name : translate("rideDetails.notAvailable")}</Text>
					</View>
				</View>
				<View style={styles.pricingContainer}>
					<View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.end")}</Text>
						<Text>{endDate ? endDateTime : translate("rideDetails.notAvailable")}</Text>
					</View>
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.endLocation")}</Text>
						<Text>{endLocation?.name ? endLocation.name : translate("rideDetails.notAvailable")}</Text>
					</View>
				</View>
				<View style={styles.pricingContainer}>
					{
						(startDate && endDate)
						&& (
							<View style={styles.averagePriceContainer}>
								<Text style={styles.priceText}>{translate("rideDetails.totalDuration")}</Text>
								<Text>{ hours === "00" ? `${minutes} min` : `${hours}h ${minutes} min` }</Text>
							</View>
						)
					}

					{/* <View style={styles.averagePriceContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.totalDuration")}</Text>
						<Text>{(startDate && endDate) ? `${hours}h ${minutes}min` : "not available"}</Text>
					</View> */}
					{
						(distance)
						&& (
							<View style={styles.pricePerKmContainer}>
								<Text style={styles.priceText}>{translate("rideDetails.kmTravel")}</Text>
								<Text>{distance ? distance : translate("rideDetails.notAvailable")}</Text>
							</View>
						)
					}
					<View style={styles.pricePerKmContainer}>
						<Text style={styles.priceText}>{translate("rideDetails.co2")}</Text>
						<Text>-</Text>
					</View>
					<View style={styles.dottedLines} />
				</View>
				<View>
					<View style={styles.rating}>
						{
							(score || !score) && (endDate)
							&& (
								<Text style={styles.pricingTitle}>{translate("rideDetails.rating")}</Text>
							)
						}
						{/* <Text style={styles.pricingTitle}>{translate("rideDetails.rating")}</Text> */}
						{
							(score) && (
								<Rating
									type="custom"
									ratingCount={5}
									imageSize={30}
									defaultRating={5}
									startingValue={rating ? rating : 0}
									onFinishRating={(value) => updateRating(value)}
									// ratingColor="#008c44"
									ratingColor={AppTheme.colors.primary}
									ratingBackgroundColor="#c8c7c8"
									readonly={true}
									tintColor="#fff"
								/>
							)
						}

						{
							(!score && endDate) && (
								<Rating
									type="custom"
									ratingCount={5}
									imageSize={30}
									defaultRating={5}
									startingValue={rating ? rating : 0}
									onFinishRating={(value) => updateRating(value)}
									// ratingColor="#008c44"
									ratingColor={AppTheme.colors.primary}
									ratingBackgroundColor="#c8c7c8"
									// readonly={true}
									tintColor="#fff"
								/>
							)
						}
					</View>
					{
						score && (
							<View style={styles.rideDetailsAddress}>
								<Text style={styles.priceText}>{translate("rideDetails.feedbackText")}</Text>
								<Text numberOfLines={5} style={[styles.textArea]}>
									{feedback ? feedback : ""}
								</Text>
							</View>
						)
					}
					{
						(!score && endDate) && (
							<View style={styles.pricingContainer}>
								<TextInput
									multiline={true}
									numberOfLines={6}
									blurOnSubmit={false}
									placeholder={translate("rideDetails.feedbackText")}
									style={styles.textArea}
									value={input.value}
									onChangeText={(value) => updateInput({ value, error: "" })}
									autoCorrect={false}
								/>
							</View>
						)
					}
					{
						(!feedback && !score) && (
							<View style={styles.verifyButtonContainer}>
								<Button
									buttonText={translate("rideDetails.okay")}
									buttonStyle={styles.confirmButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={submitFeedback}
								/>
							</View>
						)
					}
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	rentDetails: getSelectedRent(state)
});
const mapDispatchToProps = {
	dispatchRentalGiveFeedback: handleRentalGiveFeedback,
	dispatchRentalList: handleRentalList,
	dispatchUpdateSelectedRent: selectRent
};

export default connect(mapStateToProps, mapDispatchToProps)(RideDetails);