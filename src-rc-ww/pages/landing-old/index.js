import React from "react";
import { connect } from "react-redux";
import { View, Image, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Config from "react-native-config";
import Button from "src/components/ButtonComponent";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import { translate } from "src/locales/i18n";
import { Images } from "src/assets/images";
import { scanQRAndGetCompanyInfo, setCompanyApiUrl } from "src/redux/actions/";
import { showAlert, scanConfirmAlert } from "src/utils/native";
import { getApiEndpoint } from "src/utils/environment";
import { KeyValueStore } from "src/utils/KeyValueStore";
import { getCompanyInfo } from "src/redux/selectors";
import styles from "src/styles/pages/welcome";

class WelcomeScreen extends React.Component {
	componentDidMount() {
		if (Config.AUTOCONNECT === "true") {
			this.autoConnect();
		}
	}

	async autoConnect() {
		try {
			const autoConnectConfig = JSON.parse(Config.AUTOCONNECTCONFIG);
			const identifier = autoConnectConfig?.identifier;
			const apiUrl = getApiEndpoint(autoConnectConfig?.environment);
			if (identifier && apiUrl) {
				const { dispatchScanQR } = this.props;
				await KeyValueStore.setItem("apiUrl", apiUrl);
				dispatchScanQR({ name: identifier });
			}
		} catch (error) {
			showAlert("Error", error.message);
		}
	}

	companyDetect = async(result) => {
		const { dispatchScanQR, dispatchCompanyApiUrl } = this.props;
		const identifier = result?.identifier;
		const environment = result?.environment;
		const apiUrl = getApiEndpoint(environment);
		// await KeyValueStore.setItem("apiUrl", apiUrl);
		dispatchCompanyApiUrl(apiUrl);
		dispatchScanQR({ identifier }, this.scanQrCallback);
	}

	onScanResult = (e) => {
		try {
			const { navigation } = this.props;
			navigation.pop();
			const result = e.data.substring(0);
			const parsedResult = JSON.parse(result);
			this.companyDetect(parsedResult);
		} catch (error) {
			showAlert("Error", error.message);
		}
	}

	directConnect = async() => {
		const { dispatchScanQR, dispatchCompanyApiUrl } = this.props;
		const company = { "environment": "staging", "identifier": "wowlab.9550" };
		const identifier = company?.identifier;
		const environment = company?.environment;
		const apiUrl = getApiEndpoint(environment);
		dispatchCompanyApiUrl(apiUrl);
		dispatchScanQR({ identifier }, this.scanQrCallback);
	}

	onRequestScan = () => {
		scanConfirmAlert(() => {
			// const { navigation } = this.props;
			// navigation.navigate("ScanQR", { onScanResult: this.onScanResult, showSearch: false });
			this.directConnect();
		});
	}

	render() {
		return (
			<View style={styles.flexContainer}>
				<ImageBackground
					source={Images.authScreen.background}
					style={styles.imageBackground}
				>
					<SafeAreaView style={styles.flexContainer}>
						<FocusAwareStatusBar
							barStyle="dark-content"
							backgroundColor="transparent"
							translucent={true}
						/>
						<View style={styles.welcomeScreenlogoView}>
							<Image
								style={styles.ScreenLogo}
								source={Images.authScreen.mobility}
							/>
						</View>
						<View style={styles.dotStyleContainer}>
							<Button
								buttonClicked={() => {
									this.onRequestScan();
								}}
								style={styles.buttonContainer}
								buttonText={translate("welcomeScreen.getStartedButton")}
							/>
						</View>
					</SafeAreaView>
				</ImageBackground>
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	company: getCompanyInfo(state)
});

const mapDispatchToProps = {
	dispatchScanQR: scanQRAndGetCompanyInfo,
	dispatchCompanyApiUrl: setCompanyApiUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);