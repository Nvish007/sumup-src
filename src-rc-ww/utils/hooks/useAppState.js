import { useState, useEffect } from "react";
import { AppState } from "react-native";

function useAppState() {
	const [currentState, setCurrentState] = useState(AppState.currentState);

	function handleAppStateChange(nextState) {
		setCurrentState(nextState);
	}

	useEffect(() => {
		AppState.addEventListener("change", handleAppStateChange);

		return () => {
			AppState.removeEventListener("change", handleAppStateChange);
		};
	}, []);

	return currentState;
}

export default useAppState;