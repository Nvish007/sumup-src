import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoadingIndicator from "./components/LoadingIndicator";
import RootNavigator from "./navigation/RootNavigator";
import { handleCompanyLoginForToken, checkUserAccess, handleLogout } from "./redux/actions";
import { checkTokenExpiration } from "./utils/jwt";
import {
	getToken,
	getUserLinkedWithCompany,
	getEndUserId,
	getStripePublishableKey
} from "./redux/selectors";

isEmpty = function(value) {
	return value === null || value === "" || value === undefined;
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.checkTokenExpiry();
	}

	// componentDidMount() {
	// }

	onCompanyLoginForTokenResponse = () => {};

	checkTokenExpiry = () => {
		const { token, company, dispatchCompanyLoginForToken } = this.props;
		if (token && company) {
			const tokenExpired = checkTokenExpiration(token);
			if (tokenExpired) {
				dispatchCompanyLoginForToken(this.onCompanyLoginForTokenResponse);
			}
		}
	};

	render() {
		const { loading: { isLoading, loadingText }, stripePublishableKey } = this.props;
		return (
			<StripeProvider publishableKey={stripePublishableKey} urlScheme="wowmobility" setUrlSchemeOnAndroid={true}>
				<SafeAreaProvider>
					{/* <ListenApp /> */}
					<View style={styles.container}>
						<RootNavigator />
						{ (isLoading) && <LoadingIndicator isLoading={isLoading} loadingText={loadingText} /> }
					</View>
				</SafeAreaProvider>
			</StripeProvider>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.loading,
	token: getToken(state),
	company: getUserLinkedWithCompany(state),
	endUserId: getEndUserId(state),
	stripePublishableKey: getStripePublishableKey(state)
});

const mapDispatchToProps = {
	dispatchCompanyLoginForToken: handleCompanyLoginForToken,
	dispatchCheckUserAccess: checkUserAccess,
	dispatchLogout: handleLogout,
};

App.propTypes = {
	loading: PropTypes.oneOfType([PropTypes.object]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(App));
