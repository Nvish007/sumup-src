import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Share } from "react-native";
import { Text, Card } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "src/styles/pages/topup";
import Button from "src/components/ButtonComponent";
// import { Images } from "src/assets/images";
import Modal from "react-native-modal";
import LoadingIndicator from "src/components/LoadingIndicator";
import { getTopupList, createPaymentIntent, addTopupToUserWallet, selectedTopup, handleConfirmPayment, setTopupLoader } from "src/redux/actions";
import { getAllTopup, getEndUserId, getUser, getPaymentMethodInfo } from "src/redux/selectors";
import { translate } from "src/locales/i18n";
import { useStripe } from "@stripe/stripe-react-native";
import { showAlert } from "src/utils/native";

const Topup = ({
	navigation,
	topup,
	endUserId,
	user,
	paymentInfo,
	dispatchGetTopupList,
	dispatchCreatePaymentIntent,
	dispatchAddTopupToUserWallet,
	dispatchSelectedTopup,
	dispatchConfirmPayment,
	dispatchLoader
}) => {
	const [loader, setLoader] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const { confirmPayment } = useStripe();
	const billingDetails = {
		name: `${user.firstname} ${user.lastname}`,
		email: user.email,
		phone: `+${user.telephone}`
	};
	useEffect(() => {
		dispatchGetTopupList(endUserId);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.topUp")
		});
	}, [navigation]);

	const onShareCode = () => {
		Share.share({
			message: "Invite code"
		});
	};

	const onTopupAddToUserWalletResponse = (response) => {
		if (response.success) {
			showAlert("Success", translate("topUpScreen.paymentDone"));
			dispatchGetTopupList(endUserId);
		} else {
			showAlert("Error", response.message);
		}
	};

	const onConfirmPaymentResponse = (res) => {
		if (res.success) {
			dispatchAddTopupToUserWallet(onTopupAddToUserWalletResponse);
		} else {
			showAlert("Error", res.message);
		}
	};

	const onCreatePaymentIntentResponse = async(response) => {
		const { data } = response;
		setLoader(true);
		dispatchLoader(true);
		if (data.paymentMethodType === "Card") {
			const { error, paymentIntent } = await confirmPayment(data?.clientSecret, {
				type: "Card",	// Bancontact
				paymentMethodId: data?.paymentMethod,
				billingDetails
			});
			console.info("paymentIntent", paymentIntent);
			if (error) {
				setLoader(false);
				dispatchLoader(false);
				showAlert("Error", error.message);
			} else {
				setLoader(false);
				dispatchLoader(false);
				dispatchAddTopupToUserWallet(onTopupAddToUserWalletResponse);
			}
		} else {
			const item = { paymentIntentId: data.paymentMethod, text: translate("topUpScreen.loaderText3") };
			setTimeout(() => {
				setLoader(false);
				dispatchLoader(false);
				dispatchConfirmPayment(item, onConfirmPaymentResponse);
			}, 5000);
		}
	};

	const onTopup = async(topupInfo) => {
		dispatchSelectedTopup(topupInfo);
		const { price: topupAmount } = topupInfo;
		const data = { userId: endUserId, amount: topupAmount, text: translate("topUpScreen.loaderText1") };
		dispatchCreatePaymentIntent(data, onCreatePaymentIntentResponse);
	};

	const onModal = () => {
		navigation.navigate("PaymentMethod");
		setIsVisible(false);
	};

	const onNavigate = (item) => {
		if (paymentInfo?.paymentMethods) {
			onTopup(item);
		} else {
			setIsVisible(true);
		}
	};

	return (
		<>
			<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
				{
					topup.length > 0
					&& (
						topup.map((item) => (
							<View style={styles.cardContainer} key={item.id}>
								<Card style={styles.card}>
									<View style={styles.cardContent}>
										<Text style={styles.topupName}>{translate("topUpScreen.packageName")}</Text>
										<View style={styles.padding}>
											<Text style={styles.topupPrice}>{translate("topUpScreen.rideLength")}</Text>
											<Text style={styles.topupAmount}>{translate("topUpScreen.ridePrice")}</Text>
										</View>
										<View style={styles.row}>
											<Text style={styles.topupName}>{`${item.topup_amount.slice(0, 2)} euro`}</Text>
											<View style={styles.outerButton}>
												<Button
													buttonText={translate("topUpScreen.use")}
													buttonStyle={styles.buttonStyle}
													textStyle={styles.buttonTextsStyle}
													buttonClicked={() => onNavigate(item)}
													// isLoading={loader}
													disabled={loader}
												/>
											</View>
										</View>
									</View>
								</Card>
							</View>
						))
					)
				}
				<View style={styles.cardContainer}>
					<Card style={styles.card}>
						<View style={styles.cardContent1}>
							<Text style={styles.topupName}>{translate("topUpScreen.newInvite")}</Text>
							<View style={styles.padding}>
								<Text style={styles.topupPrice}>{translate("topUpScreen.inviteInfo")}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.topupName}>{translate("topUpScreen.free")}</Text>
								<View style={[styles.outerButton, styles.buttonPosition]}>
									<Button
										buttonText={translate("topUpScreen.invite")}
										buttonStyle={styles.buttonStyle}
										textStyle={styles.buttonTextsStyle}
										buttonClicked={onShareCode}
										// isLoading={loader}
										disabled={loader}
									/>
								</View>
							</View>
						</View>
					</Card>
				</View>
				<Modal
					isVisible={isVisible}
					onBackdropPress={() => setIsVisible(false)}
					style={styles.modal}
				>
					<View style={styles.container}>
						<Text style={styles.titleText1}>{translate("topUpModal.noMethodFound")}</Text>
						<View>
							<Text style={styles.titleText2}>
								{translate("topUpModal.addMethodText")}
							</Text>
						</View>
						<Button
							buttonText={translate("topUpModal.addMethodButton")}
							style={styles.buttonContainer}
							buttonStyle={styles.button}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={onModal}
						/>
					</View>
				</Modal>
			</SafeAreaView>
			{
				(loader)
					&& (
						<LoadingIndicator isLoading={loader} loadingText={translate("topUpScreen.loaderText2")} />
					)
			}
		</>
	);
};

const mapStateToProps = (state) => ({
	topup: getAllTopup(state),
	endUserId: getEndUserId(state),
	user: getUser(state),
	paymentInfo: getPaymentMethodInfo(state)
});

const mapDispatchToProps = {
	dispatchGetTopupList: getTopupList,
	dispatchCreatePaymentIntent: createPaymentIntent,
	dispatchAddTopupToUserWallet: addTopupToUserWallet,
	dispatchSelectedTopup: selectedTopup,
	dispatchConfirmPayment: handleConfirmPayment,
	dispatchLoader: setTopupLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(Topup);