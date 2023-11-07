import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "src/pages/auth/login";
import RegistrationScreen from "src/pages/auth/registration";
import OtpVerificationScreen from "src/pages/otp-verification";

const Stack = createStackNavigator();

const AuthNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Registration"
				component={RegistrationScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="OtpVerification"
				component={OtpVerificationScreen}
				headerMode="screen"
				options={{
					headerShown: false
				}}
			/>
		</Stack.Navigator>
	);
};

export default AuthNavigator;