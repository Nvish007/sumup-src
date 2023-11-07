import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "src/pages/home";
import EditProfileScreen from "src/pages/profile/edit-profile";
import SearchScreen from "src/pages/search";
import WalkthroughScreen from "src/pages/auth/walkthrough";
import ProfileScreen from "src/pages/profile";
import SubscriptionScreen from "src/pages/subscription";
import SubscribeScreen from "src/pages/subscribe";
import ConfirmSubscriptionScreen from "src/pages/subscribe/confirmSubscription";
import ReservationsScreen from "src/pages/reservations";
import ReservationsDetailsScreen from "src/pages/reservations-details";
import NewReservationsScreen from "src/pages/reservations/new-reservation";
import ReservationSelectCarScreen from "src/pages/reservations/new-reservation/SelectCar";
import ReservationBookingConfirmScreen from "src/pages/reservations/new-reservation/BookingConfirm";
import WalletScreen from "src/pages/wallet";
import SupportScreen from "src/pages/support";
import ReportProblemScreen from "src/pages/damage-report";
import ScanQR from "src/pages/scan";
import RidesScreen from "src/pages/rides";
import RideDetails from "src/pages/rides/RideDetails";
import StepNumber from "src/components/StepNumber";
import CustomBackButton from "src/components/CustomBackButton";
import CustomAddButton from "src/components/CustomAddButton";
import commonStyles from "src/styles/common";
import AppTheme from "src/styles/theme";
import CarRentalState from "src/pages/home/CarRentalState";
import CarRentalFeedback from "src/pages/home/CarRentalFeedback";
import CarRentalFinalCheck from "src/pages/home/CarRentalFinalCheck";
import TakeCarRentalImages from "src/pages/home/TakeCarRentalImages";
import StartRentalCarState from "src/pages/reservations-details/StartRentalCarState";
import EndCarRideTakeCarImages from "src/pages/end-car-ride/TakeCarImages";
import EndCarRideCarState from "src/pages/end-car-ride/CarState";
import EndCarRideCarFinalCheck from "src/pages/end-car-ride/CarFinalCheck";
import EndCarRideServiceFeedback from "src/pages/end-car-ride/ServiceFeedback";
import ExtendReservation from "src/pages/reservations/extend-reservation";
import ReferralCodeScreen from "src/pages/referral-code";
import Topup from "src/pages/top-up";
import BLE from "src/pages/ble";
import Payments from "src/pages/payments";
import PaymentMethod from "src/pages/payment-method";
import DocumentsIdentityManual from "src/pages/onboarding/documents-identity-manual";
import SelectPaymentMethod from "src/pages/payment-method/SelectPaymentMethod";
import ReportLocker from "src/pages/report-locker";
import { translate } from "src/locales/i18n";
import DrawerContent from "./DrawerContent";
import { store } from "../redux/store";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const { getState } = store;

const commonOptions = {
	headerStyle: {
		backgroundColor: AppTheme.colors.primary
	},
	headerTintColor: AppTheme.colors.headerTintColor,
};

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

const newCommonOptions1 = {
	headerTitleStyle: {
		...commonStyles.header2,
		lineHeight: 27
	},
	headerTintColor: AppTheme.colors.black,
	headerStyle: {
		borderBottomWidth: 0,
		elevation: 0,
		shadowOpacity: 0,
		backgroundColor: AppTheme.colors.lightGray
	},
	headerTitleAlign: "center"
};

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <DrawerContent {...props} />}
			// eslint-disable-next-line react-native/no-inline-styles
			drawerStyle={{ backgroundColor: "transparent", width: "100%" }}
			// drawerType="front"
			swipeEnabled={false}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	);
}

const MainNavigator = () => {
	const { auth, topup } = getState();
	const { showWalkthrough } = auth;
	const { loader } = topup;
	const [change, setChange] = useState(false);

	useEffect(() => {
		setChange(loader);
	}, [loader]);

	return (
		<Stack.Navigator
			screenOptions={{
				headerBackTitleVisible: false
			}}
			initialRouteName={showWalkthrough ? "Walkthrough" : "Home"}
		>
			<Stack.Screen
				name="Home"
				component={DrawerNavigator}
				headerMode="screen"
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name="Walkthrough"
				component={WalkthroughScreen}
				options={{
					headerShown: false
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
				name="Profile"
				component={ProfileScreen}
				headerMode="screen"
				options={{
					...commonOptions
				}}
			/>
			<Stack.Screen
				name="Subscription"
				component={SubscriptionScreen}
				headerMode="screen"
				options={{
					title: translate("pageTitles.subscriptions"),
					...commonOptions
				}}
			/>
			<Stack.Screen
				name="Subscribe"
				component={SubscribeScreen}
				headerMode="screen"
				options={{
					title: translate("pageTitles.subscription"),
					...commonOptions
				}}
			/>
			<Stack.Screen
				name="ConfirmSubscription"
				component={ConfirmSubscriptionScreen}
				headerMode="screen"
				options={{
					title: translate("pageTitles.monthlySubscription"),
					...commonOptions
				}}
			/>
			<Stack.Screen
				name="Wallet"
				component={WalletScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.wallet")
				}}
			/>
			<Stack.Screen
				name="Reservations"
				component={ReservationsScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton file="file" />,
					headerRight: () => <CustomAddButton />,
					title: translate("pageTitles.myReservations")
				}}
			/>
			<Stack.Screen
				name="ReservationDetails"
				component={ReservationsDetailsScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.reservationDetails")
				}}
			/>
			<Stack.Screen
				name="StartRentalCarState"
				component={StartRentalCarState}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.stateOfTheCar")
				}}
			/>
			<Stack.Screen
				name="NewReservations"
				component={NewReservationsScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={1} />,
					title: translate("pageTitles.newReservation")
				}}
			/>
			<Stack.Screen
				name="ReservationSelectCar"
				component={ReservationSelectCarScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: translate("pageTitles.selectYourCar")
				}}
			/>
			<Stack.Screen
				name="ReservationBookingConfirm"
				component={ReservationBookingConfirmScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={3} currentStep={3} />,
					title: translate("pageTitles.bookingConfirmation")
				}}
			/>
			<Stack.Screen
				name="Support"
				component={SupportScreen}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="CarRentalState"
				component={CarRentalState}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={2} />,
					title: translate("pageTitles.stateOfTheCar")
				}}
			/>
			<Stack.Screen
				name="CarRentalFinalCheck"
				component={CarRentalFinalCheck}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={3} />,
					title: translate("pageTitles.finalChecks")
				}}
			/>
			<Stack.Screen
				name="CarRentalFeedback"
				component={CarRentalFeedback}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={4} />,
					title: translate("pageTitles.carRentalFeedback")
				}}
			/>
			<Stack.Screen
				name="Rides"
				component={RidesScreen}
				options={{
					title: translate("pageTitles.myRides"),
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="RideDetails"
				component={RideDetails}
				options={{
					title: translate("pageTitles.rideDetails"),
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="ReportProblem"
				component={ReportProblemScreen}
				headerMode="screen"
				options={{
					title: translate("pageTitles.reportProblem"),
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="EditProfile"
				component={EditProfileScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					title: translate("pageTitles.myAccountDetails"),
					headerLeft: () => <CustomBackButton />,
				}}
			/>
			<Stack.Screen
				name="TakeCarRentalImages"
				component={TakeCarRentalImages}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={1} />,
					title: translate("pageTitles.carPictures")
				}}
			/>
			<Stack.Screen
				name="EndCarRideTakeCarImages"
				component={EndCarRideTakeCarImages}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={1} />,
					title: translate("pageTitles.carPictures")
				}}
			/>
			<Stack.Screen
				name="EndCarRideCarState"
				component={EndCarRideCarState}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={2} />,
					title: translate("pageTitles.stateOfTheCar")
				}}
			/>
			<Stack.Screen
				name="EndCarRideCarFinalCheck"
				component={EndCarRideCarFinalCheck}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={3} />,
					title: translate("pageTitles.finalChecks")
				}}
			/>
			<Stack.Screen
				name="EndCarRideServiceFeedback"
				component={EndCarRideServiceFeedback}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={4} currentStep={4} />,
					title: translate("pageTitles.feedback")
				}}
			/>
			<Stack.Screen
				name="ExtendReservation"
				component={ExtendReservation}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.extendReservation")
				}}
			/>
			{Platform.OS === "ios" && change === true
				? (
					<Stack.Screen
						name="Topup"
						component={Topup}
						headerMode="screen"
						options={{
							...newCommonOptions1,
							headerLeft: () => <CustomBackButton />,
							title: translate("pageTitles.topUp")
						}}
					/>
				)
				:				(
					<Stack.Screen
						name="Topup"
						component={Topup}
						headerMode="screen"
						options={{
							...newCommonOptions,
							headerLeft: () => <CustomBackButton />,
							title: translate("pageTitles.topUp")
						}}
					/>
				)}
			<Stack.Screen
				name="BLE"
				component={BLE}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.bleDevelopment")
				}}
			/>
			<Stack.Screen
				name="Payments"
				component={Payments}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.payments")
				}}
			/>
			<Stack.Screen
				name="PaymentMethod"
				component={PaymentMethod}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.paymentMethod")
				}}
			/>
			<Stack.Screen
				name="SelectPaymentMethod"
				component={SelectPaymentMethod}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.paymentMethod")
				}}
			/>
			<Stack.Screen
				name="ReferralCode"
				component={ReferralCodeScreen}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					title: translate("pageTitles.referral")
				}}
			/>
			<Stack.Screen
				name="DocumentsIdentityManual"
				component={DocumentsIdentityManual}
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					// headerRight: () => <StepNumber totalStep={3} currentStep={2} />,
					title: "Documents"
				}}
			/>
			<Stack.Screen
				name="ReportLocker"
				component={ReportLocker}
				headerMode="screen"
				options={{
					...newCommonOptions,
					headerLeft: () => <CustomBackButton />,
					headerRight: () => <StepNumber totalStep={2} currentStep={2} />,
					title: translate("pageTitles.reportLocker")
				}}
			/>
		</Stack.Navigator>
	);
};

const mapStateToProps = (state) => ({
	topup: state.topup,
});

export default connect(mapStateToProps, null)(MainNavigator);