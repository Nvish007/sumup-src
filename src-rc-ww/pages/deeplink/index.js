import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Alert, Text, View } from "react-native";
import { handleDeepLinkVerification } from "src/redux/actions";
import { translate } from "src/locales/i18n";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "src/styles/pages/deeplink";

const DeepLink = ({
	navigation,
	route,
	dispatchDeepLinkVerification
}) => {
	const [dataSource, setDataSource] = useState([]);
	const [isVisible, setIsVisible] = useState(false);

	const onDeepLinkResponse = (response) => {
		if (response?.data?.code === 60) {
			const { success } = response;
			setDataSource(success);
			navigation.navigate("Registration");
		} else if (response?.data?.code === 100) {
			// Alert.alert("Account already activated. Please login");
			setIsVisible(true);
			// navigation.navigate("LandingScreen");
		} else {
			Alert.alert(translate("alert.error"));
			navigation.navigate("LandingScreen");
		}
	};

	const onNavigate = () => {
		navigation.navigate("LandingScreen");
	};

	useEffect(() => {
		const token = route.params.paramKey;
		dispatchDeepLinkVerification({ token: token }, onDeepLinkResponse);
	}, []);

	if (dataSource === true) {
		navigation.navigate("LandingScreen");
		return (
			<View>
				<Text> Valid Link </Text>
			</View>
		);
	} else {
		return (
			<View>
				{/* <Text> checking Link </Text> */}
				<Modal
					isVisible={isVisible}
					onBackdropPress={() => setIsVisible(false)}
				>
					<View style={styles.container}>
						<Text style={styles.title}>{translate("deeplink.title")}</Text>
						<Text style={styles.detailsListText}>{translate("deeplink.message")}</Text>
						<ButtonComponent
							buttonText={translate("deeplink.button")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onNavigate}
						/>
					</View>
				</Modal>
			</View>
		);
	}
};

const mapDispatchToProps = {
	dispatchDeepLinkVerification: handleDeepLinkVerification
};

export default connect(null, mapDispatchToProps)(DeepLink);