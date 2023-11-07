import React, { useRef } from "react";
import { connect } from "react-redux";
import { View, Image, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Images from "src/assets/images";
import styles from "src/styles/pages/login";
import { handleLogIn } from "src/redux/actions";
import { getUserId, getUserEmail } from "src/redux/selectors";
import Button from "src/components/ButtonComponent";
import { translate } from "src/locales/i18n";
import LoginForm from "./LoginForm";

const LoginScreen = ({
	navigation,
	userEmail,
	userId,
	dispatchHandleLogin
}) => {
	const insets = useSafeAreaInsets();
	const loginFormRef = useRef();
	const onLoginResponse = (response) => {
		if (response?.endUser?.onboarding === "1") {
			navigation.navigate("Onboarding");
		} else {
			navigation.navigate("CompanyList");
		}
	};

	const onSubmit = ({ password }) => {
		const loginData = { identifier: userEmail, token: password, method: "password", userId };
		dispatchHandleLogin(loginData, onLoginResponse);
	};

	const onForgotPassword = () => {
		navigation.navigate("ForgotPassword");
	};

	return (
		<SafeAreaView style={styles.safeAreaView} edges={["left", "bottom", "right"]}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={85} enableOnAndroid={true}>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
				</View>
				<Text style={styles.greetMessage}>{translate("loginScreen.loginMessage")}</Text>
				<LoginForm
					ref={loginFormRef}
					submitForm={onSubmit}
					forgotPassword={onForgotPassword}
				/>
			</KeyboardAwareScrollView>
			<View style={[styles.loginButtonContainer, { bottom: insets.bottom }]}>
				<Button
					textStyle={styles.buttonTextsStyle}
					buttonStyle={styles.confirmButton}
					buttonText={translate("loginScreen.logInButtonText")}
					buttonClicked={() => { loginFormRef.current.onSubmit(); }}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	userId: getUserId(state),
	userEmail: getUserEmail(state)
});

const mapDispatchToProps = {
	dispatchHandleLogin: handleLogIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);