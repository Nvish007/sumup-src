export const DOCKING_UNLOCK_SUCCESS = "DOCKING_UNLOCK_SUCCESS";
export const DOCKING_UNLOCK_FAIL = "DOCKING_UNLOCK_FAIL";
export const RENTAL_END = "RENTAL_END";
export const RESET_MQTT_STATE = "RESET_MQTT_STATE";
export const CAR_RIDE_STATUS = "CAR_RIDE_STATUS";

export const dockingUnlockSuccess = () => ({
	type: DOCKING_UNLOCK_SUCCESS
});

export const dockingUnlockFail = () => ({
	type: DOCKING_UNLOCK_FAIL
});

export const rentalEnd = () => ({
	type: RENTAL_END
});

export const resetMqttState = () => ({
	type: RESET_MQTT_STATE
});

export const carRideStatus = (payload) => ({
	type: CAR_RIDE_STATUS,
	payload
});

export const handleCarRideStatus = (item) => {
	const data = JSON.parse(item);
	return (dispatch) => {
		dispatch(carRideStatus(data));
	};
};

export const handleResetMqttState = () => {
	return (dispatch) => {
		dispatch(resetMqttState());
	};
};