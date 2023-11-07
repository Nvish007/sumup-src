import React, { useEffect, useLayoutEffect } from "react";
import { Alert, Text, View, } from "react-native";
import { connect } from "react-redux";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "src/styles/pages/paymentMethod";
import Button from "src/components/ButtonComponent";
import { getEndUserId, getPaymentMethodInfo } from "src/redux/selectors";
import { handleGetPaymentMethod, handleDetachPaymentMethod } from "src/redux/actions";
import { showAlert } from "src/utils/native";

const PaymentMethod = ({
	navigation,
	endUserId,
	paymentInfo,
	dispatchGetPaymentMethod,
	dispatchDetachPaymentMethod
}) => {
	// console.info(paymentInfo);
	const onNavigate = () => {
		navigation.navigate("SelectPaymentMethod");
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.paymentMethod")
		});
	}, [navigation]);

	const onResponse = (res) => {
		if (res) {
			showAlert(res?.message);
		}
	};

	const onDetachPaymentMethod = () => {
		let data = { userId: endUserId };
		dispatchDetachPaymentMethod(data, onResponse);
	};

	useEffect(() => {
		dispatchGetPaymentMethod(endUserId);
	}, []);
	return (
		<SafeAreaView style={styles.safeView}>
			<KeyboardAwareScrollView style={styles.reservationsScrollView}>
				<View style={styles.padding}>
					{
						paymentInfo?.paymentMethods
							? (
								<View style={styles.myReservationList}>
									<View style={styles.carDetails}>
										<View style={styles.carBlog}>
											<Text style={styles.carTitle}>{translate("paymentMethod.type")}</Text>
											<Text style={styles.carTitle}>{paymentInfo?.paymentMethods?.type}</Text>
										</View>
										{
											paymentInfo?.paymentMethods?.card
											&& (
												<View style={styles.carBlog}>
													<Text style={styles.carTitle}>{translate("paymentMethod.brand")}</Text>
													<Text style={styles.carTitle}>{paymentInfo?.paymentMethods?.card?.brand}</Text>
												</View>
											)
										}
										{
											paymentInfo?.paymentMethods?.card
											&& (
												<View style={styles.carBlog}>
													<Text style={styles.carTitle}>{translate("paymentMethod.expiry")}</Text>
													<Text style={styles.carTitle}>{`${paymentInfo?.paymentMethods?.card?.["exp_month"]}/${paymentInfo?.paymentMethods?.card?.["exp_year"]}`}</Text>
												</View>
											)
										}
										<View style={styles.carBlog}>
											<Text style={styles.carTitle}>{translate("paymentMethod.digits")}</Text>
											<Text style={styles.carTitle}>{paymentInfo?.paymentMethods?.card ? paymentInfo?.paymentMethods?.card?.last4 : paymentInfo?.paymentMethods?.["sepa_debit"]?.last4}</Text>
										</View>
									</View>
									<Button
										buttonText={translate("paymentMethod.remove")}
										buttonStyle={styles.confirmButton}
										textStyle={styles.buttonTextsStyle}
										buttonClicked={() => Alert.alert(
											translate("paymentMethod.confirmation"),
											translate("paymentMethod.note"),
											[
												{
													text: "Yes",
													onPress: () => {
														onDetachPaymentMethod();
													}
												},
												{
													text: "Cancel",
													style: "cancel"
												},
											],
											{ cancelable: false }
										)}
									/>
								</View>
							)
							:	(
								<View style={styles.center}>
									<Text style={[styles.carTitle, styles.margin]}>{translate("paymentMethod.noPayments")}</Text>
									<Button
										buttonText={translate("paymentMethod.add")}
										buttonStyle={styles.button}
										textStyle={styles.buttonTextsStyle}
										buttonClicked={onNavigate}
									/>
								</View>
							)
					}
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	paymentInfo: getPaymentMethodInfo(state)
});

const mapDispatchToProps = {
	dispatchGetPaymentMethod: handleGetPaymentMethod,
	dispatchDetachPaymentMethod: handleDetachPaymentMethod
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);