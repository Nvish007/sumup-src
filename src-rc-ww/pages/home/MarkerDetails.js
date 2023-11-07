import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Alert, Text, View, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { translate } from "src/locales/i18n";
import { ScrollView } from "react-native-gesture-handler";
import { List, ListItem, Left, Body, Right } from "native-base";
import Button from "src/components/ButtonComponent";
import BikeBookingConfirm from "src/pages/home/BikeBookingConfirm";
import ChargingPointConfirm from "src/pages/home/ChargingPointConfirm";
import { Images } from "src/assets/images";
import styles from "src/styles/pages/markerDetails";
import { Car, Bicycle, ChargingPole, AccessControl } from "src/assets/svgs";
import { showLocation } from "react-native-map-link";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Config from "react-native-config";
import { LockersIcon } from "../../assets/svgs";

const MarkerDetails = ({
	navigation,
	isVisible,
	onClose,
	data,
	handleScan,
	endUserId,
	hasActiveRental,
	updateMap,
	hasActiveReservation,
	dispatchCreateReservation,
}) => {
	// console.info("loc data", data);
	const { location, cars, ebike, distance, time, chargingPoles, types, locker } = data;
	const [ShowConfirm, setShowConfirm] = useState(false);
	const [showCharge, setShowCharge] = useState(false);
	const [filter, setFilter] = useState({ type: "" });
	// console.info(types);
	const getFillColor = (type) => (type === filter.type ? "#008000" : "#000000");
	// console.info(chargingPoles?.available);
	const bookCar = () => {
		onClose();
		navigation.navigate("NewReservations", {
			name: location.name,
			locationId: location.externalId.toString(),
			type: "car",
			vehicleId: 4
		});
	};

	const onBikeBookingSuccess = () => {
		setShowConfirm(false);
		onClose();
	};

	const onBikeBookingClose = () => {
		setShowConfirm(false);
	};

	const onChargeBookingClose = () => {
		setShowCharge(false);
	};

	const onChargeBookingSuccess = () => {
		setShowCharge(false);
		onClose();
		updateMap();
	};

	const onChargePointScan = () => {
		onClose();
		handleScan();
	};

	useEffect(() => {
		setFilter({ type: types?.[0] });
	}, [data]);

	const options = {
		latitude: location?.latitude,
		longitude: location?.longitude,
		title: location?.address,
	};
	const onScan = () => {
		onClose();
		handleScan();
	};
	return (
		<View style={styles.modalMain}>
			<Modal
				isVisible={isVisible}
				style={styles.modal}
				onBackdropPress={onClose}
				swipeDirection="down"
				propagateSwipe={filter.type === "car"}
				onSwipeComplete={() => onClose()}
			>
				<View style={[styles.container]}>
					<Text style={styles.locationBorderTop} />
					<View style={styles.locationDistance}>
						<Text style={styles.locationName}>
							{location?.name}
						</Text>
						<View style={styles.locationBlog}>
							<Image
								source={Images.markerDetailsScreen.kMImg}
								style={styles.kMImg}
							/>
							<Text style={styles.KMTexts}>{`${distance} km`}</Text>
						</View>
						<View style={styles.locationBlog}>
							<Image
								source={Images.markerDetailsScreen.ClockImg}
								style={styles.kMImg}
							/>
							<Text style={styles.KMTexts}>{`${time} min`}</Text>
						</View>
					</View>
					{
						(location?.name && location?.zip && location?.city)
						&& (
							<View>
								<TouchableOpacity
									style={styles.locationAddress}
									onPress={() => showLocation(options)}
								>
									<Image
										source={Images.markerDetailsScreen.locationImg}
										style={styles.locationImg}
									/>
									<Text style={styles.subTexts}>
										{`${location?.address}, ${location?.zip} ${location?.city}`}
									</Text>
								</TouchableOpacity>
							</View>
						)
					}

				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
					{
						types?.length !== 1 && <View style={styles.locationTabs}>
							{
									types?.find((item) => item === "ebike")
									&& (
										<TouchableOpacity
											onPress={() => setFilter({ type: "ebike" })}
											style={[styles.selectBlog, filter.type === "ebike" && styles.selectBlogActive]}
										>
											<Bicycle fill={getFillColor("ebike")} />
										</TouchableOpacity>
									)
							}
							{
									types?.find((item) => item === "car")
									&& (
										<TouchableOpacity
											onPress={() => setFilter({ type: "car" })}
											style={[styles.selectBlog, filter.type === "car" && styles.selectBlogActive]}
										>
											<Car fill={getFillColor("car")} />
										</TouchableOpacity>
									)
							}
							{
									types?.find((item) => item === "charging-pole")
									&& (
										<TouchableOpacity
											onPress={() => setFilter({ type: "charging-pole" })}
											style={[styles.selectBlog, filter.type === "charging-pole" && styles.selectBlogActive]}
										>
											<ChargingPole fill={getFillColor("charging-pole")} />
										</TouchableOpacity>
									)
							}
							{
									types?.find((item) => item === "access_control")
									&& (
										<TouchableOpacity
											onPress={() => setFilter({ type: "access_control" })}
											style={[styles.selectBlog, filter.type === "access_control" && styles.selectBlogActive]}
										>
											<AccessControl fill={getFillColor("access_control")} />
										</TouchableOpacity>
									)
							}
							{
									types?.find((item) => item === "locker")
									&& (
										<TouchableOpacity
											onPress={() => setFilter({ type: "locker" })}
											style={[styles.selectBlog, filter.type === "locker" && styles.selectBlogActive]}
										>
											<LockersIcon fill={getFillColor("locker")} />
										</TouchableOpacity>
									)
							}
					</View>
					}
					</ScrollView>
					<ScrollView style={styles.listScrollView} nestedScrollEnabled={true}>
						<View style={styles.locationTabContent}>
							<List>
								{
									filter.type === "car"
									&& (
										<ScrollView contentInsetAdjustmentBehavior="always" nestedScrollEnabled={true}>
											<ListItem style={styles.listItem1}>
												{
												cars?.map((car) => (
													<View key={car.id}>
														<View style={[styles.textAvail]}>
															<Left style={[styles.listLeft, styles.carList]}>
																{
																	(car.photo && car.photo != "") ? <Image source={{ uri: `${Config.ASSET_SERVICE}${car.photo}` }} style={[styles.contentCarImage]} /> : <Image source={Images.common.car} style={styles.contentCarImage} />
																}
															</Left>
															<View style={styles.carText}>
																<Text note style={styles.carName}>{car.name.substring(0, 19)}</Text>
															</View>
															<View>
																{
																	(hasActiveRental?.asset._id === car.id) && (hasActiveRental?.rental.status === "active")
																&& (
																	<View style={styles.reservationIcon}>
																		<FontAwesome
																			name="calendar-alt"
																			size={25}
																			color="#000"
																		/>
																	</View>
																)
																}
															</View>
														</View>
													</View>
												))
												}
												<View style={[styles.listRight, styles.margin]}>
													<Button
														buttonText={translate("markerDetails.book")}
														buttonStyle={styles.BookButton}
														textStyle={styles.buttonTextsStyle}
														buttonClicked={bookCar}
														disabled={hasActiveReservation !== null}
													/>
												</View>
											</ListItem>
										</ScrollView>

									)
								}

								{
									filter.type === "ebike"
									&& (
										<ListItem avatar style={styles.listItem}>
											<Left style={styles.listLeft}>
												<Image
													source={Images.markerDetailsScreen.selectBikeImg}
													style={styles.contentBikeImage}
												/>
											</Left>
											<Body style={styles.listBody}>
												<View style={styles.column}>
													{/* <Text style={styles.carName}>{translate("markerDetails.ebike")}</Text> */}
													<View style={styles.textAvail}>
														<Text note style={styles.lockText}>{translate("markerDetails.ebike")}</Text>
														<Text note style={ebike?.bikes ? styles.Available : styles.noteAvailable}>{ebike?.bikes}</Text>
													</View>
													<View style={styles.textAvail}>
														<Text note style={styles.lockText}>{translate("markerDetails.docking")}</Text>
														<Text note style={ebike?.free ? styles.Available : styles.noteAvailable}>{ebike?.free}</Text>
													</View>
													{
														ebike?.bikes
															? (
																<View style={styles.textAvail}>
																	<Right style={styles.listRight}>
																		<Button
																			buttonText={translate("markerDetails.book")}
																			buttonStyle={styles.BookButton}
																			textStyle={styles.buttonTextsStyle}
																			buttonClicked={() => setShowConfirm(true)}
																			disabled={hasActiveReservation !== null || hasActiveRental !== null}
																		/>
																	</Right>
																	<Right style={styles.listRight}>
																		<Button
																			buttonText={translate("markerDetails.scanQr")}
																			buttonStyle={styles.BookButton}
																			textStyle={styles.buttonTextsStyle}
																			buttonClicked={onScan}
																			// disabled={hasActiveReservation !== null || hasActiveRental !== null}
																		/>
																	</Right>
																</View>
															)
															: null
													}
												</View>
											</Body>
										</ListItem>

									)
								}
								{
									filter.type === "charging-pole"
									&& (
										<ListItem avatar style={styles.listItem}>
											<Left style={styles.listLeft}>
												<Image
													source={Images.markerDetailsScreen.chargingPoint}
													style={styles.contentCharginPointImage}
												/>
											</Left>
											<Body style={styles.listBody}>
												<Text style={[styles.boldText, styles.chargingText]}>{translate("markerDetails.available")}</Text>

												<View style={[styles.textAvail, styles.marginTop]}>
													<Right style={styles.listRight}>
														<Button
															buttonText={translate("markerDetails.book")}
															buttonStyle={styles.BookButton}
															textStyle={styles.buttonTextsStyle}
															buttonClicked={() => setShowCharge(true)}
															disabled={chargingPoles?.available === null || chargingPoles?.available === 0 || hasActiveReservation !== null}
														/>
													</Right>
													<Right style={styles.listRight}>
														<Button
															buttonText={translate("markerDetails.scanQr")}
															buttonStyle={styles.BookButton}
															textStyle={styles.buttonTextsStyle}
															buttonClicked={onChargePointScan}
															// disabled={hasActiveReservation !== null}
														/>
													</Right>
												</View>
											</Body>
										</ListItem>
									)
								}
								{
									(filter.type === "access_control")
									&& (
										<ListItem avatar style={styles.listItem}>
											<Left style={[styles.listLeft, styles.textMargin]}>
												<Image
													source={Images.markerDetailsScreen.lock}
													style={styles.lockImg}
												/>
											</Left>
											<Body style={[styles.listBody, styles.textMargin]}>
												<Text style={styles.accessText}>{translate("markerDetails.parking")}</Text>
												<Text style={styles.accessText}>{translate("markerDetails.capacity")}</Text>

												<View style={styles.textAvail}>
													<Right style={[styles.listRight, styles.scanButton]}>
														<Button
															buttonText={translate("markerDetails.scanQr")}
															buttonStyle={styles.BookButton}
															textStyle={styles.buttonTextsStyle}
															buttonClicked={onScan}
															// disabled={hasActiveReservation !== null}
														/>
													</Right>
												</View>
											</Body>
										</ListItem>
									)
								}
								{
									filter.type === "locker"
									&& (
										<View>
										<ListItem avatar style={styles.listItem}>
											<Left style={styles.listLeft}>
												<Image
													source={Images.markerDetailsScreen.lockers1}
													style={styles.contentCarImage}
												/>
											</Left>
											<Body style={styles.listBody}>
												<Text style={[styles.boldText]}>{translate("markerDetails.lockerTitle")}</Text>
												<Text note style={styles.lockerTitle}>{translate("markerDetails.availableLocker")} {locker?.available}</Text>
											</Body>
											
										</ListItem>
										<View style={styles.lockerSubSection}>
											<Button
												buttonText={translate("markerDetails.lockerBtnText")}
												buttonStyle={styles.lockerScanButton}
												textStyle={styles.lockerScanButtonText}
												buttonClicked={onChargePointScan}
												// disabled={hasActiveReservation !== null}
											/>
											<Text style={styles.lockerScanText} >{translate("markerDetails.lockerSubText")}</Text>
										</View>
									</View>
									)
								}
							</List>
						</View>
					</ScrollView>
				</View>
				<BikeBookingConfirm
					isVisible={ShowConfirm}
					onClose={() => onBikeBookingClose()}
					onSuccess={() => onBikeBookingSuccess()}
					data={{ locationExternalId: location?.externalId, locationname: location?.name, endUserId }}
					dispatchCreateReservation={dispatchCreateReservation}
				/>
				<ChargingPointConfirm
					isVisible={showCharge}
					onClose={() => onChargeBookingClose()}
					onSuccess={() => onChargeBookingSuccess()}
					data={{ locationExternalId: location?.externalId, locationname: location?.name, endUserId }}
					dispatchCreateReservation={dispatchCreateReservation}
				/>
			</Modal>
		</View>

	);
};

MarkerDetails.propTypes = {
	navigation: PropTypes.object.isRequired,
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	endUserId: PropTypes.string.isRequired,
	dispatchCreateReservation: PropTypes.func.isRequired
};

export default MarkerDetails;
