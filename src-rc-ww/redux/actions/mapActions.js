import MapService from "src/services/mapService";
import { getColorForCircle, getColorForPolygon } from "src/utils/location";
import { loadingStart, loadingEnd, loadingError } from "./loadingActions";
import { carRideStatus } from "./mqttActions";

export const LOCATION_LIST_SUCCESS = "LOCATION_SUCCESS";
export const CREATE_RESERVATION_SUCCESS = "CREATE_RESERVATION_SUCCESS";
export const MQTT_UPDATE_LOCATION = "MQTT_UPDATE_LOCATION";
export const SET_SELECTED_LOCATION = "SET_SELECTED_LOCATION";
export const USER_CURRENT_LOCATION = "USER_CURRENT_LOCATION";
export const FLEET_TYPE_CAR = "FLEET_TYPE_CAR";

/* Get Location List Actions */
const locationListSuccess = (payload) => ({
	type: LOCATION_LIST_SUCCESS,
	payload
});

/* ACTIVE RESERVATION ACTIONS */
export const createReservationSuccess = (payload) => ({
	type: CREATE_RESERVATION_SUCCESS,
	payload
});

export const mqttLocationUpdate = (payload) => ({
	type: MQTT_UPDATE_LOCATION,
	payload
});

export const onClickMarker = (payload) => ({
	type: SET_SELECTED_LOCATION,
	payload
});

export const userCurrentLocation = (payload) => ({
	type: USER_CURRENT_LOCATION,
	payload
});

export const fleetCar = (payload) => ({
	type: FLEET_TYPE_CAR,
	payload
});

export function getLocationsRequested(user, serviceType) {
	// console.info("used", user);
	return async(dispatch, getState) => {
		try {
			const { map: { locationList } } = getState();
			const hasActiveRental = (locationList && locationList.rental);
			dispatch(loadingStart());
			const { data: location } = await MapService.getLocationList(user, serviceType);
			let locationData = location.data?.locationsData;
			let fleetType = location?.data?.fleetTypes;
			let fleet = fleetType?.find((item) => item === "car");
			/* if fleetCar is false then myReservation and book a vehicle menu will not shown in drawer list  */
			if (fleet === "car") {
				dispatch(fleetCar(true));
			} else {
				dispatch(fleetCar(false));
			}
			if (locationData && locationData.length) {
				locationData.forEach((item, i) => {
					// console.info("geofence", item.location);
					if (item.location && item.location.geofence && item.location.geofence.type === "polygon") { // If has geofence for polygon
						const noFree = item.ebike.free < 1 && hasActiveRental;
						const polygonColor = getColorForPolygon(item.location.geofence.location, user, noFree); // Get color based on user inside polygon or not
						locationData[i].location.geofence.color = polygonColor;
					}

					if (item.location && item.location.geofence && item.location.geofence.type === "circle") { // If has geofence for circle
						const noFree = item.ebike.free < 1 && hasActiveRental;
						const radius = Number(item.location.geofence.radius);
						const circleColor = getColorForCircle(item.location.geofence.location, user, radius, noFree); // Get color based on user inside circle or not
						locationData[i].location.geofence.color = circleColor;
						locationData[i].location.geofence.radius = radius;
					}
				});
			}
			const updatedData = {
				...location.data,
				locationsData: [...locationData]
			};
			dispatch(locationListSuccess(updatedData));
			dispatch(carRideStatus(updatedData?.rental?.status));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}

export function updateGeofencing(user) {
	// console.info("used", user);
	return async(dispatch, getState) => {
		try {
			// console.info("updateGeofencing called");
			dispatch(userCurrentLocation(user));
			const { map: { locationList } } = getState();
			const hasActiveRental = (locationList && locationList.rental);
			let locationData = locationList?.locationsData;
			if (locationData && locationData.length) {
				locationData.forEach((item, i) => {
					// console.info("geofence", item.location);
					if (item.location && item.location.geofence && item.location.geofence.type === "polygon") { // If has geofence for polygon
						const noFree = item.ebike.free < 1 && hasActiveRental;
						const polygonColor = getColorForPolygon(item.location.geofence.location, user, noFree); // Get color based on user inside polygon or not
						locationData[i].location.geofence.color = polygonColor;
					}

					if (item.location && item.location.geofence && item.location.geofence.type === "circle") { // If has geofence for circle
						const noFree = item.ebike.free < 1 && hasActiveRental;
						const radius = Number(item.location.geofence.radius);
						const circleColor = getColorForCircle(item.location.geofence.location, user, radius, noFree); // Get color based on user inside circle or not
						locationData[i].location.geofence.color = circleColor;
						locationData[i].location.geofence.radius = radius;
					}
				});
			}
			const updatedData = {
				...locationList,
				locationsData: [...locationData]
			};
			dispatch(locationListSuccess(updatedData));
		} catch (error) {
			// Nothing here to do
		}
	};
}

export function handleLocationInfo(response) {
	const data = JSON.parse(response);
	return async(dispatch, getState) => {
		const { map: { currentLocation } } = getState();
		try {
			dispatch(loadingStart());
			dispatch(mqttLocationUpdate(data));
			dispatch(updateGeofencing(currentLocation));
			dispatch(loadingEnd());
		} catch (error) {
			dispatch(loadingError(error));
		}
	};
}