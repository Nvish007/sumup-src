import { Alert, Linking, Platform, ToastAndroid, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { isPointWithinRadius, isPointInPolygon, findNearest } from "geolib";

export const hasPermissionIOS = async() => {
	const openSetting = () => {
		Linking.openSettings().catch(() => {
			Alert.alert("Unable to open settings");
		});
	};
	const status = await Geolocation.requestAuthorization("whenInUse");

	if (status === "granted") {
		return true;
	}

	if (status === "denied") {
		Alert.alert("Location permission denied");
	}

	if (status === "disabled") {
		Alert.alert(
			"Turn on Location Services to allow \"Wow-mobility\" to determine your location.",
			"",
			[
				{ text: "Go to Settings", onPress: openSetting },
				{ text: "Cancel", style: "destructive" },
			],
		);
	}

	return false;
};

export const hasLocationPermission = async() => {
	if (Platform.OS === "ios") {
		const hasPermission = await hasPermissionIOS();
		return hasPermission;
	}

	if (Platform.OS === "android" && Platform.Version < 23) {
		return true;
	}

	const hasPermission = await PermissionsAndroid.check(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	);

	if (hasPermission) {
		return true;
	}

	const status = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	);

	if (status === PermissionsAndroid.RESULTS.GRANTED) {
		return true;
	}

	if (status === PermissionsAndroid.RESULTS.DENIED) {
		ToastAndroid.show(
			"Location permission denied by user.",
			ToastAndroid.LONG,
		);
	} else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
		ToastAndroid.show(
			"Location permission revoked by user.",
			ToastAndroid.LONG,
		);
	}

	return false;
};

export const getIsPointWithinRadius = (location, userLocation, radius) => {
	if (userLocation) {
		return isPointWithinRadius(
			{ latitude: userLocation.latitude, longitude: userLocation.longitude },
			{ latitude: location.latitude, longitude: location.longitude },
			radius
		);
	} else {
		return false;
	}
};

export const getIsPointInPolygon = (cordinates, userLocation) => {
	if (userLocation) {
		return isPointInPolygon(
			{ latitude: userLocation.latitude, longitude: userLocation.longitude },
			cordinates,
		);
	} else {
		return false;
	}
};

export const getNearestLocation = (points, arrayOfPoints) => {
	return findNearest(points, arrayOfPoints);
};

export const getColorForCircle = (location, userLocation, radius, noFree) => {
	const insideLocation = getIsPointWithinRadius(location, userLocation, radius);
	// console.log("userLocation", userLocation.latitude, userLocation.longitude, "location", location.latitude, location.longitude, insideLocation);
	// console.info("insideLocation", insideLocation);
	if (insideLocation) {
		return "rgba(123, 239, 178, 0.5)";
	} else {
		return "rgba(154, 157, 161, 0.5)";
	}
};

export const getColorForPolygon = (cordinates, userLocation, noFree) => {
	const insideLocation = getIsPointInPolygon(cordinates, userLocation);
	// console.info("insideLocation", insideLocation);
	if (insideLocation && noFree) {
		return "rgba(123, 239, 178, 0.5)";
	} else {
		return "rgba(154, 157, 161, 0.5)";
	}
};