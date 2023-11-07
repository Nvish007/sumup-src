import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Questions from "src/pages/onboarding/questions";
import Documents from "src/pages/onboarding/documents";
import Payment from "src/pages/onboarding/payment-method";
import Address from "src/pages/onboarding/address";
import DocumentsIdentity from "src/pages/onboarding/documents-identity";
import DocumentsDriverLicence from "src/pages/onboarding/documents-drivers-licence";
import DocumentsIdentityManual from "src/pages/onboarding/documents-identity-manual";
import PhoneVerification from "src/pages/onboarding/phone-verification-steps";
import OtpVerification from "src/pages/onboarding/otp-verification-steps";
import StepNumber from "src/components/StepNumber";
import CustomBackButton from "src/components/CustomBackButton";
import commonStyles from "src/styles/common";
import AppTheme from "src/styles/theme";
import { store } from "../redux/store";

const Stack = createStackNavigator();
const { getState } = store;

const newCommonOptions = {
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

const OnBoardingNavigator = () => {
	const { onBoarding } = getState();
	const steps = onBoarding.onBoardingInfo?.steps;
	const initialScreen = steps[0];
	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false
			}}
			initialRouteName={initialScreen}
		>
			<Stack.Screen
				name="onBoardingPhoneVerification"
				component={PhoneVerification}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					// headerRight: () => <StepNumber totalStep={3} currentStep={1} />,
					title: "Phone verification"
				}}
			/>
			<Stack.Screen
				name="onBoardingOtpVerification"
				component={OtpVerification}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					// headerRight: () => <StepNumber totalStep={3} currentStep={1} />,
					title: "Otp verification"
				}}
			/>
			<Stack.Screen
				name="Address"
				component={Address}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={1} />,
					title: "Onboarding"
				}}
			/>
			<Stack.Screen
				name="Questions"
				component={Questions}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Documents"
				component={Documents}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: "Documents"
				}}
			/>
			<Stack.Screen
				name="Payment"
				component={Payment}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={3} />,
					title: "Payment info"
				}}
			/>
			<Stack.Screen
				name="DocumentsIdentity"
				component={DocumentsIdentity}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: "Documents"
				}}
			/>
			<Stack.Screen
				name="DocumentsDriversLicence"
				component={DocumentsDriverLicence}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: "Documents"
				}}
			/>
			<Stack.Screen
				name="DocumentsIdentityManual"
				component={DocumentsIdentityManual}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: "Documents"
				}}
			/>
		</Stack.Navigator>
	);
};

export default OnBoardingNavigator;