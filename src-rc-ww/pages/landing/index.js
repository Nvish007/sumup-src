/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Images from "src/assets/images";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { translate } from "src/locales/i18n";
import { View, Image, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin, statusCodes } from "@react-native-community/google-signin";
import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { getLogoutState } from "src/redux/selectors";
import {
	handleGoogleVerification,
	handleFacebookVerification,
	handleAppleVerification,
	handleSocialLoginVerification,
} from "src/redux/actions";
import styles from "src/styles/pages/landing";

const LandingScreen = ({
	navigation,
	dispatchGoogleVerification,
	dispatchFacebookVerification,
	dispatchAppleVerification,
	dispatchSocialLoginVerification,
}) => {
	const facebookSignIn = () => {
		LoginManager.logOut();
		LoginManager.logInWithPermissions(["public_profile", "email"])
			.then((result) => {
				if (result.isCancelled) {
					console.info("Login was cancelled");
				}
				return AccessToken.getCurrentAccessToken();
			})
			.then((data) => {
				const credential = auth.FacebookAuthProvider.credential(
					data.accessToken
				);
				auth()
					.signInWithCredential(credential)
					.then((result) => {
						let userData = {
							firstname: result.additionalUserInfo?.profile.first_name,
							lastname: result.additionalUserInfo?.profile.last_name,
							email: result.user?.email,
							phoneNumber: result.user?.phoneNumber,
							identifier: result.additionalUserInfo?.profile.id,
							token: data.accessToken,
							method: "facebook"
						};
						const onResponse = (resp) => {
							if (resp === 401) {
								dispatchFacebookVerification(userData);
								navigation.navigate("PhoneVerification");
							} else if (resp?.endUser?.onboarding === "1") {
								navigation.navigate("Onboarding");
							} else {
								navigation.navigate("CompanyList");
							}
						};
						const loginData = { identifier: result.additionalUserInfo?.profile.id, token: data.accessToken, method: "facebook" };
						dispatchSocialLoginVerification(loginData, onResponse);
					})
					.catch((error) => {
						console.info("Failed", error);
					});
			})
			.catch((error) => {
				console.info("fail", error);
			});
	};

	const getCurrentUserInfo = async() => {
		try {
			// let info = await GoogleSignin.signInSilently();
			// let data = {
			// 	firstname: info.user?.givenName,
			// 	lastname: info.user?.familyName,
			// 	email: info.user?.email,
			// 	phoneNumber: info.user?.phoneNumber ? info.user.phoneNumber : null,
			// 	identifier: info.user?.id,
			// 	token: info.idToken,
			// 	method: "google"
			// };
			// console.info("here");
			// dispatchGoogleVerification(data);
			// navigation.navigate("PhoneVerification");
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_REQUIRED) {
				console.info("User has not signed in yet");
			} else {
				// Alert.alert("Unable to get user's info");
			}
		}
	};

	const isAlreadySignedIn = async() => {
		const isSignedIn = await GoogleSignin.isSignedIn();
		if (isSignedIn) {
			// Alert.alert("User is already signed in");
			getCurrentUserInfo();
		} else {
			// console.info("Please Login");
		}
		// setGettingLoginStatus(false);
	};

	const googleSignIn = async() => {
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});
			let info = await GoogleSignin.signIn();
			let data = {
				firstname: info.user?.givenName,
				lastname: info.user?.familyName,
				email: info.user?.email,
				phoneNumber: info.user?.phoneNumber ? info.user.phoneNumber : null,
				identifier: info.user?.id,
				token: info.idToken,
				method: "google"
			};

			const onResponse = (resp) => {
				if (resp === 401) {
					dispatchGoogleVerification(data);
					navigation.navigate("PhoneVerification");
				} else if (resp?.endUser?.onboarding === "1") {
					navigation.navigate("Onboarding");
				} else {
					navigation.navigate("CompanyList");
				}
			};
			const loginData = { identifier: info?.user?.id, token: info?.idToken, method: "google" };
			dispatchSocialLoginVerification(loginData, onResponse);
		} catch (error) {
			console.info("Message", JSON.stringify(error));
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				console.info("Login with google has been canceled");
			} else if (error.code === statusCodes.IN_PROGRESS) {
				Alert.alert("Signing in...");
			} else if (
				error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
			) {
				Alert.alert("Play services not available or outdated!");
			} else {
				Alert.alert(error.message);
			}
		}
	};

	// const _signOut = async() => {
	// 	setGettingLoginStatus(true);
	// 	try {
	// 		await GoogleSignin.revokeAccess();
	// 		await GoogleSignin.signOut();
	// 		setUserInfo(null);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// 	setGettingLoginStatus(false);
	// };

	async function appleSignIn() {
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});

		console.info("appleAuthRequestResponse", appleAuthRequestResponse);

		if (!appleAuthRequestResponse.identityToken) {
			Alert.alert("Apple Sign-In failed - no identify token returned");
		}

		const { identityToken, nonce } = appleAuthRequestResponse;
		const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

		return auth().signInWithCredential(appleCredential).then((result) => {
			console.info("Successfully Login", JSON.stringify(result));
			let data = {
				firstname: appleAuthRequestResponse.fullName?.givenName,
				lastname: appleAuthRequestResponse.fullName?.familyName,
				email: result.user?.email,
				phoneNumber: null,
				identifier: result.additionalUserInfo?.profile?.sub,
				token: null,
				method: "apple"
			};

			const onResponse = (resp) => {
				if (resp === 401) {
					dispatchAppleVerification(data);
					navigation.navigate("PhoneVerification");
				} else if (resp?.endUser?.onboarding === "1") {
					navigation.navigate("Onboarding");
				} else {
					navigation.navigate("CompanyList");
				}
			};
			const loginData = { identifier: data.identifier, token: null, method: "apple" };
			dispatchSocialLoginVerification(loginData, onResponse);
		}).catch((error) => {
			console.info("apple signInWithCredential failed", error);
		});
	}

	const checkDevice = () => {
		if (appleAuth.isSupported) {
			appleSignIn();
		} else {
			console.info("This device doesn't support Apple signning");
		}
	};

	function parseURLParams(url) {
		let queryStart = url.indexOf("?") + 1;
		let queryEnd = url.indexOf("#") + 1 || url.length + 1;
		let query = url.slice(queryStart, queryEnd - 1);
		let pairs = query.replace(/\+/g, " ").split("&");
		let parms = {}; let i; let n; let v; let
			nv;
		if (query === url || query === "") return;

		for(i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=", 2);
			n = decodeURIComponent(nv[0]);
			v = decodeURIComponent(nv[1]);

			if (!parms.hasOwnProperty.call(n)) parms[n] = [];
			parms[n].push(nv.length === 2 ? v : null);
		}
		return parms;
	}
	const handleDynamicLink = (link) => {
		if (link !== null) {
			const data = link.url;
			const object = parseURLParams(data);
			const url = object.token;
			navigation.navigate("DeepLink", { paramKey: url });
		}
	};
	const deeplink = () => {
		if (Platform.OS === "android") {
			dynamicLinks()
				.getInitialLink()
				.then((link) => {
					// console.info("got initial link", link);
					if (link !== null) {
						handleDynamicLink(link);
					}
				});
		}
		const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
		return () => unsubscribe();
	};
	const googleConfig = () => {
		GoogleSignin.configure({
			scopes: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email"
			],
			iosClientId: "441117871696-diqgk0m71r9cbshnd8uungeflbpqr55m.apps.googleusercontent.com",
			webClientId: "441117871696-p6qkirib7bsvi26qbrn40t17nlnd7efn.apps.googleusercontent.com",
			offlineAccess: false
		});
		isAlreadySignedIn();
	};
	useEffect(() => {
		googleConfig();
		deeplink();
	}, []);

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<KeyboardAwareScrollView contentContainerStyle={styles.container}>
				<View style={styles.appLogoContainer}>
					<Image source={Images.authScreen.mobility} style={styles.logo} />
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.mainTitle}>{translate("landingScreen.greetTitle")}</Text>
					<Text style={styles.mainDescription}>{translate("landingScreen.greetMessage")}</Text>
					<Text style={styles.phoneNumberTitle}>{translate("landingScreen.mobilePlaceholder")}</Text>
					<View style={styles.phoneInput}>
						<TouchableOpacity
							style={styles.phoneInputButton}
							onPress={() => navigation.navigate("PhoneVerification")}
						>
							<View style={styles.phoneInputIcons}>
								<SimpleLineIcons
									name="phone"
									size={20}
									style={styles.phoneIcon}
								/>
								<Image style={styles.countryFlagIcon} source={Images.common.countryFlagLogo} />
								<AntDesign
									name="caretdown"
									size={12}
								/>
								<Text style={styles.phoneNumberText}>
									{translate("landingScreen.countryCode")}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.underLineText}>
					<Text style={styles.OrText}>{translate("landingScreen.optional")}</Text>
				</View>

				<View style={styles.socialLinksContainer}>
					<TouchableOpacity
						style={[styles.socialLinks, styles.socialLinksFB]}
						onPress={facebookSignIn}
					>
						<Image style={styles.socialLinksIMG} source={Images.common.facebookLogo} />
						<Text style={[styles.socialLinksText, styles.socialFBText]}>{translate("landingScreen.facebookLogin")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.socialLinks, styles.socialLinksGoogle]}
						onPress={googleSignIn}
					>
						<Image style={styles.socialLinksIMG} source={Images.common.googleLogo} />
						<Text style={[styles.socialLinksText, styles.socialGoogleText]}>{translate("landingScreen.googleLogin")}</Text>
					</TouchableOpacity>
					{
						Platform.OS === "ios" && (
							<TouchableOpacity
								style={styles.socialLinks}
								onPress={checkDevice}
							>
								<FontAwesome
									name="apple"
									color="#000000"
									size={18}
									style={styles.socialLinksIcon}
								/>
								<Text style={styles.socialLinksText}>{translate("landingScreen.appleLogin")}</Text>
							</TouchableOpacity>
						)
					}
				</View>
				<View style={styles.companyLogin}>
					<Text style={styles.companyAccountText}>
						{translate("landingScreen.companyAccountText")}
					</Text>
					<TouchableOpacity
						onPress={() => { navigation.navigate("CompanyLogin"); }}
					>
						<Text style={styles.LogInHereText}>
							{translate("landingScreen.loginOption")}
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	logoutState: getLogoutState(state),
});

const mapDispatchToProps = {
	dispatchGoogleVerification: handleGoogleVerification,
	dispatchFacebookVerification: handleFacebookVerification,
	dispatchAppleVerification: handleAppleVerification,
	dispatchSocialLoginVerification: handleSocialLoginVerification,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
