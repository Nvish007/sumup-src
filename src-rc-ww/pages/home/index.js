/* eslint-disable dot-notation */
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Dimensions, TouchableOpacity, View, Image } from "react-native";
import Images from "src/assets/images";
import MapView, { Marker, PROVIDER_GOOGLE, Circle, Polygon } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { translate } from "src/locales/i18n";
import useRemoteMessage from "src/utils/hooks/remoteMessage";
import useAppState from "src/utils/hooks/useAppState";
import { updateToken } from "src/utils/firebase";
import { showAlert } from "src/utils/native";
import { KeyValueStore } from "src/utils/KeyValueStore";
import dayjs from "dayjs";
import { hasLocationPermission, getNearestLocation } from "src/utils/location";
import ButtonComponent from "src/components/ButtonComponent";
import MarkerDetails from "src/pages/home/MarkerDetails";
import KMDocking from "src/pages/home/KMDocking";
import MovinBlueSharing from "src/pages/home/MovinBlueSharing";
import BikePopUp from "src/pages/home/BikePopUp";
import VirtualBikePopUp from "src/pages/home/VirtualBikePopUp";
import BikeSharingPopUp from "src/pages/home/BikeSharingPopUp";
import ActiveRental from "src/pages/home/ActiveRental";
import ActiveCarRental from "src/pages/home/ActiveCarRental";
import ActiveCharging from "src/pages/home/ActiveCharging";
import ActiveReservation from "src/pages/home/ActiveReservation";
import ChargingPolePopUp from "src/pages/home/ChargingPolePopUp";
import AccessControl from "src/pages/home/AccessControl";
import CarSharing from "src/pages/home/CarSharing";
import { MqttService } from "src/utils/mqttServices";
import styles from "src/styles/pages/home";
import Config from "react-native-config";
import { checkTokenExpiration } from "src/utils/jwt";
import ScanService from "src/services/scanService";
import {
	getLocationsRequested,
	scanQRRequested,
	handleDockingUnlock,
	handleCreateReservation,
	handleOpenSentinelLock,
	handleResetMqttState,
	handleOpenBikeLock,
	handleCanCloseRental,
	handleCloseRental,
	updateGeofencing,
	onClickMarker,
	handleStartTransaction,
	handleCarUnlock,
	handleCarLock,
	handleLockerOpen,
	handleLockerEndRent,
	resetLocateReservation,
	checkUserAccess,
	handleCarSteps,
	handleLogout,
	handleCompanyLoginForToken,
	handleEndCharging,
	startRental
} from "src/redux/actions";
import {
	getLocationList,
	getSiteInformation,
	getEndUserId,
	getActiveReservation,
	getActiveRental,
	getDockingUnlockSuccess,
	getDockingUnlockFail,
	getRentalEnd,
	getRentalId,
	getIsRentCancel,
	getUserInfo,
	getLocationDetails,
	getToken,
	getCarRideStatus,
	getActiveCharging,
	getEndChargingInfo
} from "src/redux/selectors";
import ActiveLockerPopUp from "./ActiveLockerPopUp";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({
	navigation,
	locations,
	hasActiveReservation,
	hasActiveRental,
	endUserId,
	siteInformation,
	dockingUnlockSuccess,
	dockingUnlockFail,
	rentalEnd,
	rentalId,
	isRentCancel,
	markerInfo,
	showReservationLocation,
	selectedReservationLocation,
	token,
	carRideStatus,
	hasActiveCharging,
	endChargingInfo,
	// userSocialInfo,
	dispatchScanNow,
	dispatchGetLocation,
	dispatchDockingUnlock,
	dispatchCreateReservation,
	dispatchOpenSentinelLock,
	dispatchResetMqttState,
	dispatchHandleOpenBikeLock,
	dispatchCanCloseRental,
	dispatchCloseRental,
	dispatchUpdateGeofencing,
	dispatchClickMarker,
	dispatchStartTransaction,
	dispatchHandleCarUnlock,
	dispatchHandleCarLock,
	dispatchHandleLockerOpen,
	dispatchHandleLockerEndRent,
	dispatchResetLocateReservation,
	dispatchCheckUserAccess,
	dispatchHandleCarSteps,
	dispatchLogout,
	dispatchCompanyLoginForToken,
	dispatchEndCharging,
}) => {
	const appState = useAppState(); // Listen on app state change e.g background or foreground
	useRemoteMessage(); // Handle firebase foreground push notifications
	const insets = useSafeAreaInsets();
	const [showMarkerDetails, setShowMarkerDetails] = useState(false);
	const [position, setLocation] = useState({
		latitude: 50.925865552619264,
		longitude: 4.823121826486527,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	const [kmDockingModal, updateKmDockingModal] = useState(false);
	const [movinbluesharing, updateMovinBlueSharing] = useState(false);
	const [bikePopUp, updateBikePopUp] = useState(false);
	const [virtualBike, updateVirtualBike] = useState(false);
	const [isTypeBikeSharing, setIsTypeBikeSharing] = useState(false);
	const [mapLoaded, setMapLoaded] = useState(false); // Set map loaded once before
	const [isFitToElements, setFitToElements] = useState(false); // Set map loaded once before
	const [activeReservationExpired, updateActiveReservationExpired] = useState(false);
	const [chargingPole, setChargingPole] = useState(false);
	const [carSharing, setcarSharing] = useState(false);
	const [AccessGranted, setAccessGranted] = useState(false);
	const [AccessDenied, setAccessDenied] = useState(false);
	const [isFromLocker, setIsFromLocker] = useState(false);
	const [scanValue, setScanValue] = useState({});
	const serviceType = "sharingService";
	const mapView = useRef();
	const watchId = useRef(null);
	const circles = useRef([]);
	const environment = "live";
	const [showLockerPopup, setLockerPopup] = useState(true);

	let assetId = hasActiveRental?.asset?._id;

	useEffect(() => {
	
		if (mapView && locations?.length && !isFitToElements) {
			// mapView.current.fitToElements(true);
			getCurrentLocation(true, false);
			setFitToElements(true);
		}
	}, [locations, isFitToElements]);

	useEffect(() => {
		if (appState === "active" && mapLoaded) {
			const tokenExpired = checkTokenExpiration(token);
			if (tokenExpired) {
				dispatchCompanyLoginForToken(refreshHomeScreen);
			} else {
				setShowMarkerDetails(false);
				refreshHomeScreen();
			}
		}
	}, [appState]);

	useEffect(() => {
		MqttService.connect();
		getCurrentLocation(false, true);

		return () => {
			removeLocationUpdates();
		};
	}, []);

	useEffect(() => {
		if (showReservationLocation) {
			centerProvidedLocation(selectedReservationLocation);
		}
	}, [showReservationLocation]);

	useEffect(() => {
		checkUser();
	}, []);

	useEffect(() => {
		if (hasActiveRental?.asset) {
			MqttService.subscribeOnEvent(assetId);
		}
	}, [hasActiveRental]);

	useEffect(() => {
		refreshHomeScreen();
	}, [rentalId, isRentCancel]);

	const refreshHomeScreen = () => {
		setLockerPopup(true);
		const userInfo = { latitude: position.latitude, longitude: position.longitude, userId: endUserId };
		dispatchGetLocation(userInfo, serviceType);
	};

	/**
	 * This function is used for showing provided location on map
	*/
	const centerProvidedLocation = (data) => {
		const { latitude, longitude } = data;
		if (latitude && longitude) {
			// mapView.current.animateToRegion({
			// 	latitude: latitude,
			// 	longitude: longitude,
			// 	latitudeDelta: LATITUDE_DELTA,
			// 	longitudeDelta: LONGITUDE_DELTA
			// }, 1000);

			const camera = {
				center: {
					latitude: latitude,
					longitude: longitude,
				},
				pitch: 50,
				heading: 15,
				zoom: 13,
			};
			mapView.current.animateCamera(camera, { duration: 2500 });
			dispatchResetLocateReservation();
		}
	};

	/*
		@canMove: boolean - If true then map will move to fetched current location
		@handleNotificaiton - If true then tigger push notification permission and token
	*/
	const getCurrentLocation = async(canMove, handleNotificaiton) => {
		const hasPermission = await hasLocationPermission();
		if (handleNotificaiton) {
			updateToken(); // Firebase push notification setup, placed here because permission need to asked after location permission.
		}
		if (!hasPermission) {
			return;
		}

		getLocationUpdates();
		Geolocation.getCurrentPosition((latPosition) => {
			const lat = parseFloat(latPosition.coords.latitude);
			const long = parseFloat(latPosition.coords.longitude);
			const initialRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};
			// console.info("initialRegion", initialRegion);
			const userInfo = {
				latitude: lat,
				longitude: long,
				userId: endUserId,
			};
			if (locations?.length === 0 || canMove) {
				setLocation(initialRegion);
				// mapView.current.animateToRegion(initialRegion, 1000);
				fitUserNearestLocations();
			} else {
				dispatchGetLocation(userInfo, serviceType);
				setMapLoaded(true);
			}
		}, (error) => { console.info("error in getCurrentPosition", error); },
		{ timeout: 20000, maximumAge: 1000 });
	};

	/**
	 * @description This function will fit user current Location and its nearest location (From locationList by finding nearest one).
	*/
	const fitUserNearestLocations = () => {
		const edgePadding = { top: 300, bottom: 300, left: 150, right: 150 };
		const userLocation = { latitude: position.latitude, longitude: position.longitude };
		let allCoordinates = [];
		locations.forEach((locationData) => {
			const { latitude, longitude } = locationData.location;
			allCoordinates.push({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
		});
		const nearestLocation = getNearestLocation(userLocation, allCoordinates);
		mapView.current.fitToCoordinates([{ ...userLocation }, { ...nearestLocation }], { edgePadding });
	};

	const getLocationUpdates = async() => {
		if (watchId.current === null) {
			// console.info("called watchPosition");
			watchId.current = Geolocation.watchPosition((newPosition) => {
				const lat = parseFloat(newPosition.coords.latitude);
				const long = parseFloat(newPosition.coords.longitude);
				const updatedLocation = {
					latitude: lat,
					longitude: long,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				};
				setLocation(updatedLocation);
				// console.info("updated position in watchPosition", updatedLocation);
				setTimeout(() => {
					dispatchUpdateGeofencing(updatedLocation); // Update location list in redux for geofencing
				}, 100);
			}, (error) => {
				console.info("error in watchPosition", error);
			}, {
				accuracy: {
					android: "high",
					ios: "best",
				},
				enableHighAccuracy: true,
				distanceFilter: 0,
				interval: 5000,
				fastestInterval: 2000,
				forceRequestLocation: true,
				showLocationDialog: true,
				useSignificantChanges: false,
			});
		}
	};

	const removeLocationUpdates = () => {
		if (watchId.current !== null) {
			Geolocation.clearWatch(watchId.current);
			watchId.current = null;
		}
	};

	const onResponse = (response) => {
		if (response?.data?.userAccess === false) {
			setTimeout(() => {
				dispatchLogout(endUserId, serviceType);
			}, 4000);
		}
	};

	const checkUser = async() => {
		const date = dayjs().format("YYYY-MM-DD");
		const check = await KeyValueStore.getItem("checkDate");
		if (check !== date) {
			KeyValueStore.setItem("checkDate", date);
			dispatchCheckUserAccess(endUserId, onResponse);
		}
	};

	const onScanResponse = (response) => {
		if (response?.asset?.type) {
			updateVirtualBike(true);
		} else {
			switch (response.type) {
				case "kmdocking": {
					if (response?.available && response?.bike) {
						updateBikePopUp(true);
					} else {
						// updateBikePopUp(true);
						showAlert("Warning", "Not Available");
					}
					// updateKmDockingModal(true);
					break;
				}
				case "movinbluesharing": {
					updateMovinBlueSharing(true);
					break;
				}
				case "bike": {
					// updateBikePopUp(false);
					break;
				}
				case "bike-virtual": {
					updateVirtualBike(true);
					break;
				}
				case "charging-pole": {
					setChargingPole(true);
					break;
				}
				case "carsharing": {
					setcarSharing(true);
					break;
				}
				case "bikesharing": {
					if (response?.available) {
						setIsTypeBikeSharing(true);
					} else {
						showAlert("Warning", "Not Available");
					}
					break;
				}
				case "accesscontrol": {
					if (response?.access === true) {
						setAccessGranted(true);
					} else {
						setAccessDenied(true);
					}
					break;
				}
				case "locker": {
					if (response?.access === true) {
						setAccessGranted(true);
					} else {
						setIsFromLocker(true);
						setAccessDenied(true);
					}
					break;
				}
				default:
					showAlert("Not Available");
			}
		}
	};
	const onScanResult = (e) => {
		navigation.pop();
		let data = {};
		data.userId = endUserId;
		if (e.data.charAt(0) === "{") {
			const parsedData = JSON.parse(e.data);
			if (parsedData?.id) {
				data.qrContent = parsedData.id;
			}
			if (parsedData?.qrContent) {
				data.qrContent = parsedData.qrContent;
			}
			if (parsedData?.type) {
				data.type = parsedData.type;
			}
		} else {
			data.qrContent = e.data;
		}
		// console.log(data);
		setScanValue(data);

		dispatchScanNow(data, onScanResponse);
	};

	const handleScan = () => {
		navigation.navigate("ScanQR", { onScanResult, showSearch: true });
		// if (__DEV__) {
		// 	const qrContent = "608fca3973ace323273d7c16";		// "=1121926001326";// "C123 for movinBlueSharing and =1121926001200 for Kmdocking"
		// 	// const qrContent = "60d2dde85dd0e054b1f083b0";	// 60d2dde85dd0e054b1f083b0
		// 	const data = { userId: endUserId, qrContent, type: "bike" };
		// 	setScanValue(data);
		// 	dispatchScanNow(data, onScanResponse);
		// } else {
		// 	navigation.navigate("ScanQR", { onScanResult, showSearch: true });
		// }
	};

	const userInfo = { latitude: position.latitude, longitude: position.longitude, userId: endUserId };
	const onBikeUnlockSuccess = () => {
		dispatchGetLocation(userInfo, serviceType);
	};

	// console.info("locations", JSON.stringify(locations));

	const onClickOfMarker = (locationData) => {
		console.info("Marker Clicked");
		dispatchClickMarker(locationData);
		setShowMarkerDetails(true);
	};

	const handleLockerReport = () => {
		// handle Close Active modal here
		setLockerPopup(false);
		navigation.navigate("ReportLocker",{
			onGoBack: refreshHomeScreen, 
		  });
	};


	const handleLockerOpenScreen = async(deviceName) => {
		const { data } = await ScanService.lockerOpen({qrContent:hasActiveRental.asset._id,userId: endUserId});
	}
	
	const handleLockerEndRentScreen = async(deviceName) => {
		const { data } = await ScanService.lockerEndRent({qrContent:hasActiveRental.asset._id,userId: endUserId});
		refreshHomeScreen();
	}

	return (
		<View style={styles.container}>
			<View style={[styles.MainContainer]}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.mapStyle}
					showsUserLocation={true}
					zoomEnabled={true}
					zoomControlEnabled={false}
					initialRegion={position}
					ref={mapView}
				>
					{
						locations && locations.map((locationData, x) => (
							<React.Fragment key={locationData.location._id}>
								<Marker
									coordinate={{ latitude: parseFloat(locationData.location.latitude), longitude: parseFloat(locationData.location.longitude) }}
									onPress={() => onClickOfMarker(locationData)}
								/>
								{
									(locationData.location.geofence && locationData.location.geofence.type === "circle") && (
										<Circle
											ref={(el) => circles.current[x] = el}
											onLayout={() => circles.current[x].setNativeProps({
												fillColor: locationData.location.geofence.color
											})}
											center={{ latitude: parseFloat(locationData.location.geofence.location.latitude), longitude: parseFloat(locationData.location.geofence.location.longitude) }}
											radius={locationData.location.geofence.radius}
											strokeColor={locationData.location.geofence.color}
											fillColor={locationData.location.geofence.color}
										/>
									)
								}
								{
									(locationData.location.geofence && locationData.location.geofence.type === "polygon") && (
										<Polygon
											coordinates={locationData.location.geofence.location}
											strokeColor={locationData.location.geofence.color}
											fillColor={locationData.location.geofence.color}
										/>
									)
								}
							</React.Fragment>
						))
					}
				</MapView>
				<View style={[styles.menuButton, { marginTop: insets.top }]}>
					<View>
						<TouchableOpacity
							style={styles.navigationBars}
							onPress={() => navigation.toggleDrawer()}
						>
							<Image source={Images.homeScreen.sidebarMenu} style={styles.sidebarMenuIcon} />
						</TouchableOpacity>
					</View>
				</View>
				{
					Config.ENVIRONMENT === environment
					&& (
						<View style={styles.filterButton}>
							<TouchableOpacity>
								<Image source={Images.common.filter} style={styles.filterIcon} />
							</TouchableOpacity>
						</View>
					)
				}
				<View style={styles.sideMenus}>
					<View style={[styles.locationview, { marginTop: insets.top }]}>
						<TouchableOpacity
							style={styles.locationbutton}
							onPress={() => getCurrentLocation(true, false)}
						>
							<Image source={Images.homeScreen.compass} style={styles.compassIcon} />
						</TouchableOpacity>
					</View>
				</View>
				{
					siteInformation
					&& (
						<>
							<ChargingPolePopUp
								isVisible={chargingPole}
								onClose={() => setChargingPole(false)}
								data={scanValue}
								dispatchStartTransaction={dispatchStartTransaction}
							/>
							<CarSharing
								isVisible={carSharing}
								data={scanValue}
								onClose={() => setcarSharing(false)}
								dispatchHandleCarUnlock={dispatchHandleCarUnlock}
								dispatchHandleCarLock={dispatchHandleCarLock}
							/>
							
							<View style={styles.kmDockingArea}>
								<KMDocking
									isVisible={kmDockingModal}
									onClose={() => updateKmDockingModal(false)}
								/>
							</View>
							<MovinBlueSharing
								isVisible={movinbluesharing}
								onClose={() => { updateMovinBlueSharing(false); }}
							/>
							<BikePopUp
								isVisible={bikePopUp}
								onClose={() => updateBikePopUp(false)}
								userId={endUserId}
								scanQrResponse={siteInformation}
								serviceType={serviceType}
								dispatchDockingUnlock={dispatchDockingUnlock}
								onBikeUnlockSuccess={() => onBikeUnlockSuccess()}
								dockingUnlockSuccess={dockingUnlockSuccess}
								dockingUnlockFail={dockingUnlockFail}
								dispatchResetMqttState={dispatchResetMqttState}
								refreshHomeScreen={refreshHomeScreen}
							/>
							<VirtualBikePopUp
								isVisible={virtualBike}
								onClose={() => updateVirtualBike(false)}
								userId={endUserId}
								siteInformation={siteInformation}
								dispatchCreateReservation={dispatchCreateReservation}
								dispatchOpenSentinelLock={dispatchOpenSentinelLock}
								navigation={navigation}
							/>
							<BikeSharingPopUp
								isVisible={isTypeBikeSharing}
								onClose={() => setIsTypeBikeSharing(false)}
								siteInformation={siteInformation}
								navigation={navigation}
							/>
							<AccessControl
								AccessGranted={AccessGranted}
								AccessDenied={AccessDenied}
								isFromLocker={isFromLocker}
								onCloseAccessGranted={() => {
									setAccessGranted(false);
									refreshHomeScreen();
								}}
								onCloseAccessDenied={() => setAccessDenied(false)}
							/>
						</>
					)
				}
				{
					(hasActiveReservation && hasActiveReservation?.["fleet_type"] != 4)
					&& (
						<ActiveReservation
							onReservationExpired={() => updateActiveReservationExpired(true)}
							onScanNow={() => handleScan()}
							activeReservation={hasActiveReservation}
						/>
					)
				}
				{
					hasActiveRental && hasActiveRental?.asset?.type === "car"
					&&	(
						<ActiveCarRental
							activeRental={hasActiveRental}
							carRideStatus={carRideStatus}
							userId={endUserId}
							navigation={navigation}
							dispatchHandleCarUnlock={dispatchHandleCarUnlock}
							dispatchHandleCarLock={dispatchHandleCarLock}
							dispatchHandleCarSteps={dispatchHandleCarSteps}

						/>
					)
				}
{
					hasActiveRental && hasActiveRental?.asset?.type === "locker"
					&&	(
						
						<ActiveLockerPopUp
								isVisible={showLockerPopup}
								data={hasActiveRental}
								navigation={navigation}
								onClose={() => setcarSharing(false)}
								onPressReport={() => handleLockerReport()}
								onPressOpen={() => handleLockerOpenScreen()}
								onPressEndRent={() => handleLockerEndRentScreen()}
								dispatchHandleLockerOpen ={dispatchHandleLockerOpen}
								dispatchHandleLockerEndRent={dispatchHandleLockerEndRent}
							/>
					)
				}

				{
					hasActiveRental && (hasActiveRental?.asset?.type === "bike" || hasActiveRental?.asset?.type === "step")
					&&	(
						<ActiveRental
							activeRental={hasActiveRental}
							userId={endUserId}
							serviceType={serviceType}
							rentalEnd={rentalEnd}
							updateMap={userInfo}
							navigation={navigation}
							onFindNearestLocation={() => fitUserNearestLocations()}
							dispatchGetLocation={dispatchGetLocation}
							dispatchCanCloseRental={dispatchCanCloseRental}
							dispatchCloseRental={dispatchCloseRental}
							dispatchHandleOpenBikeLock={dispatchHandleOpenBikeLock}
							dispatchResetMqttState={dispatchResetMqttState}
						/>
					)
				}
				{
					(!hasActiveCharging && !hasActiveRental && (!hasActiveReservation || hasActiveReservation?.["fleet_type"] == 4 || activeReservationExpired))
					&& (
						<View style={styles.scanNowButtonPart}>
							<ButtonComponent
								buttonClicked={handleScan}
								buttonStyle={styles.scanButton}
								textStyle={styles.scanButtonText}
								buttonText={translate("homeScreen.buttonText")}
							/>
						</View>
					)
				}
				{
					(hasActiveCharging)
					&& (
						<ActiveCharging
							navigation={navigation}
							activeCharging={hasActiveCharging}
							endChargingInfo={endChargingInfo}
							serviceType={serviceType}
							updateMap={userInfo}
							dispatchGetLocation={dispatchGetLocation}
							dispatchEndCharging={dispatchEndCharging}
						/>
					)
				}
				<View style={styles.markerArea}>
					<MarkerDetails
						navigation={navigation}
						isVisible={showMarkerDetails}
						onClose={() => setShowMarkerDetails(false)}
						data={markerInfo}
						handleScan={handleScan}
						endUserId={endUserId}
						hasActiveRental={hasActiveRental}
						updateMap={onBikeUnlockSuccess}
						hasActiveReservation={hasActiveReservation}
						dispatchCreateReservation={dispatchCreateReservation}
					/>
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	locations: getLocationList(state),
	hasActiveReservation: getActiveReservation(state),
	hasActiveRental: getActiveRental(state),
	siteInformation: getSiteInformation(state),
	dockingUnlockSuccess: getDockingUnlockSuccess(state),
	dockingUnlockFail: getDockingUnlockFail(state),
	rentalEnd: getRentalEnd(state),
	userSocialInfo: getUserInfo(state),
	markerInfo: getLocationDetails(state),
	token: getToken(state),
	carRideStatus: getCarRideStatus(state),
	hasActiveCharging: getActiveCharging(state),
	endChargingInfo: getEndChargingInfo(state),
	rentalId: getRentalId(state),
	isRentCancel: getIsRentCancel(state),
	showReservationLocation: state.reservation.showReservationLocation,
	selectedReservationLocation: state.reservation.selectedReservationLocation
});

const mapDispatchToProps = {
	dispatchGetLocation: getLocationsRequested,
	dispatchScanNow: scanQRRequested,
	dispatchDockingUnlock: handleDockingUnlock,
	dispatchCreateReservation: handleCreateReservation,
	dispatchOpenSentinelLock: handleOpenSentinelLock,
	dispatchResetMqttState: handleResetMqttState,
	dispatchHandleOpenBikeLock: handleOpenBikeLock,
	dispatchCanCloseRental: handleCanCloseRental,
	dispatchCloseRental: handleCloseRental,
	dispatchUpdateGeofencing: updateGeofencing,
	dispatchClickMarker: onClickMarker,
	dispatchStartTransaction: handleStartTransaction,
	dispatchHandleCarUnlock: handleCarUnlock,
	dispatchHandleCarLock: handleCarLock,
	dispatchHandleLockerOpen: handleLockerOpen,
	dispatchHandleLockerEndRent: handleLockerEndRent,
	dispatchResetLocateReservation: resetLocateReservation,
	dispatchCheckUserAccess: checkUserAccess,
	dispatchHandleCarSteps: handleCarSteps,
	dispatchLogout: handleLogout,
	dispatchCompanyLoginForToken: handleCompanyLoginForToken,
	dispatchEndCharging: handleEndCharging,
	dispatchStartRental: startRental,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
