import "react-native-gesture-handler";
import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { getUserVerified, getUserLinkedWithCompany, getOnBoardingShowed, getTokenRefreshed } from "src/redux/selectors";
import LandingNavigator from "./LandingNavigator";
import MainNavigator from "./MainNavigator";

const RootNavigator = ({
	userVerified,
	userLinkedWithCompany,
	onBoardingShowed,
	tokenRefreshed
}) => {
	const isAuthenticated = () => {
		return userVerified && userLinkedWithCompany && onBoardingShowed;
	};

	return (
		<NavigationContainer>
			{
				// isAuthenticated() ? <MainNavigator /> : (companyInfo ? <AuthNavigator /> : <LandingNavigator />)
				isAuthenticated()
					? tokenRefreshed && <MainNavigator />
					: <LandingNavigator />
			}
		</NavigationContainer>
	);
};

const mapStateToProps = (state) => ({
	userVerified: getUserVerified(state),
	userLinkedWithCompany: getUserLinkedWithCompany(state),
	onBoardingShowed: getOnBoardingShowed(state),
	tokenRefreshed: getTokenRefreshed(state)
});

export default connect(mapStateToProps, null)(RootNavigator);