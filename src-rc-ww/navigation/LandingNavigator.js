import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PhoneVerificationScreen from "src/pages/auth/phone-verification";
import LandingScreen from "src/pages/landing";
import OtpVerificationScreen from "src/pages/otp-verification";
import RegistrationScreen from "src/pages/auth/registration";
import LoginScreen from "src/pages/auth/login";
import ScanQR from "src/pages/scan";
import CompanyList from "src/pages/company-list";
import CompanyLogin from "src/pages/company-login";
import OnBoardingNavigator from "src/navigation/OnBoardingNavigator";
import DeepLink from "src/pages/deeplink";
import ForgotPasswordScreen from "src/pages/auth/forgot-password";
import ForgotPasswordOtpVerificationScreen from "src/pages/auth/forgot-password/OtpVerification";
import ResetPasswordScreen from "src/pages/auth/reset-password";
import CustomBackButton from "src/components/CustomBackButton";
import commonStyles from "src/styles/common";
import AppTheme from "src/styles/theme";

const Stack = createStackNavigator();

const commonOptions = {
	headerTitleStyle: {
		...commonStyles.header2,
		lineHeight: 27
	},
	headerTintColor: AppTheme.colors.black,
	headerStyle: {
		borderBottomWidth: 0,
		elevation: 0,
		shadowOpacity: 0,
	},
	headerTitleAlign: "center"
};

const LandingNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false
			}}
			// initialRouteName="Onboarding"
		>
			<Stack.Screen
				name="LandingScreen"
				component={LandingScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="PhoneVerification"
				component={PhoneVerificationScreen}
				options={{
					...commonOptions,
					title: "",
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="ScanQR"
				component={ScanQR}
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
			<Stack.Screen
				name="Registration"
				component={RegistrationScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					...commonOptions,
					title: "Login",
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="CompanyList"
				component={CompanyList}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Onboarding"
				component={OnBoardingNavigator}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="CompanyLogin"
				component={CompanyLogin}
				options={{
					...commonOptions,
					title: "Company account",
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="DeepLink"
				component={DeepLink}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="ForgotPassword"
				component={ForgotPasswordScreen}
				options={{
					...commonOptions,
					title: "Forgot Password",
					headerLeft: () => <CustomBackButton />
				}}
			/>
			<Stack.Screen
				name="ForgotPasswordOtpVerification"
				component={ForgotPasswordOtpVerificationScreen}
				options={{
					...commonOptions,
					title: "OTP Verification",
					headerLeft: () => <CustomBackButton />
				}}
			/>
			<Stack.Screen
				name="ResetPassword"
				component={ResetPasswordScreen}
				options={{
					...commonOptions,
					title: "Reset Password",
					headerLeft: () => <CustomBackButton />
				}}
			/>
		</Stack.Navigator>
	);
};

export default LandingNavigator;