import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Image } from "react-native";
import { Text, Card } from "native-base";
import { Images } from "src/assets/images";
import FastImage from "src/components/ImageComponent";
import styles from "src/styles/pages/reservationSelectCar";
import Button from "src/components/ButtonComponent";
import Config from "react-native-config";
import { translate } from "src/locales/i18n";
import { getAvailableReservations } from "src/redux/selectors";

const SelectCarScreen = ({
	navigation,
	availableReservations
}) => {
	// console.info(availableReservations);
	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.selectYourCar")
		});
	}, [navigation]);

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.ScrollProblem}>
					{
						availableReservations.map((reservation) => (
							<View style={styles.mainCard} key={reservation._id}>
								<Card style={styles.cardStyle}>
									<View style={styles.card}>
										{
											(reservation?.type === "car")
											&& (
												(reservation.properties?.photo)
													? (
														<Image
															source={{ uri: `${Config.ASSET_SERVICE}${reservation.properties.photo[0]}` }}
															style={styles.cardImage}
														/>
													)
													: (
														<FastImage
															style={styles.cardImage}
															imageUrl={Images.common.car}
															resizeMode="cover"
															type="local"
														/>
													)
											)
										}
										{
											(reservation?.type === "bike")
											&& (
												<FastImage
													style={styles.cardImage}
													imageUrl={Images.common.bicycle}
													resizeMode="cover"
													type="local"
												/>
											)
										}
										{/* <Image style={styles.cardImage} source={Images.common.car} /> */}
										<View>
											<Text numberOfLines={1} style={styles.titleFont}>{reservation.name}</Text>
											{
												(reservation?.type === "car")
												&& (
													<Text style={styles.locationText}>{reservation?.properties?.["license-plate"]}</Text>
												)
											}
											<Text style={styles.locationText}>{reservation?.location?.name}</Text>
										</View>
										<Button
											buttonText="Select"
											// style={styles.cardButtonContainer}
											buttonStyle={styles.cardButton}
											textStyle={styles.buttonTextsStyle}
											buttonClicked={() => navigation.navigate("ReservationBookingConfirm", { reservation })}
										/>
									</View>
								</Card>
							</View>
						))
					}
					{/* <View style={styles.mainCard}>
						<Card style={styles.cardStyle}>
							<View style={styles.card}>
								<Image style={styles.cardImage} source={Images.common.car} />
								<View>
									<Text style={styles.titleFont}>Citroen C0</Text>
									<Text style={styles.locationText}>1-ABC-123</Text>
									<Text style={styles.locationText}>Location</Text>
								</View>
								<Button
									buttonText="Select"
									// style={styles.cardButtonContainer}
									buttonStyle={styles.cardButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={() => navigation.navigate("ReservationBookingConfirm")}
								/>
							</View>
						</Card>
					</View> */}
					{/* <View style={styles.mainCard}>
						<Card style={styles.cardStyle}>
							<View style={styles.card}>
								<Image style={styles.cardImage} source={Images.common.car} />
								<View>
									<Text style={styles.titleFont}>Citroen C0</Text>
									<Text style={styles.locationText}>Location</Text>
								</View>
								<Button
									buttonText="Select"
									// style={styles.cardButtonContainer}
									buttonStyle={styles.cardButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={() => navigation.navigate("ReservationBookingConfirm")}
								/>
							</View>
						</Card>
					</View> */}
					{/* <View style={styles.mainCard}>
						<Card style={styles.cardStyle}>
							<View style={styles.card}>
								<Image style={styles.cardImage} source={Images.common.car} />
								<View>
									<Text style={styles.titleFont}>Citroen C0</Text>
									<Text style={styles.locationText}>Location</Text>
								</View>
								<Button
									buttonText="Select"
									// style={styles.cardButtonContainer}
									buttonStyle={styles.cardButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={() => navigation.navigate("ReservationBookingConfirm")}
								/>
							</View>
						</Card>
					</View> */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	availableReservations: getAvailableReservations(state)
});

export default connect(mapStateToProps, null)(SelectCarScreen);