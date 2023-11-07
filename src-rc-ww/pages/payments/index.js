import React, { useEffect, useLayoutEffect } from "react";
import { Text, View, } from "react-native";
import { connect } from "react-redux";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "src/styles/pages/paymentScreen";
import dayjs from "dayjs";
import { getPaymentInfo, getEndUserId } from "src/redux/selectors";
import { handlePaymentList } from "src/redux/actions";

const Payments = ({
	endUserId,
	navigation,
	paymentsList,
	dispatchHandlePayment
}) => {
	const data = { clientId: endUserId };
	useEffect(() => {
		dispatchHandlePayment(data);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.payments")
		});
	}, [navigation]);

	return (
		<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
			<KeyboardAwareScrollView style={styles.reservationsScrollView}>
				{
					paymentsList?.map((payment) => (
						<View style={styles.myReservationList} key={payment.id}>
							<View style={styles.carDetails}>
								<View style={styles.carBlog}>
									<Text style={styles.cardTitle}>{translate("Payments.amount")}</Text>
									<Text style={styles.cardSubtitle}>{payment?.amount}</Text>
								</View>
								<View style={styles.carBlog}>
									<Text style={styles.cardTitle}>{translate("Payments.timeStamp")}</Text>
									<Text style={styles.cardSubtitle}>{dayjs.utc(payment?.timestamp).format("DD/MM/YYYY HH:mm")}</Text>
								</View>
								<View style={styles.carBlog}>
									<Text style={styles.cardTitle}>{translate("Payments.status")}</Text>
									<Text style={styles.cardSubtitle}>{payment?.status}</Text>
								</View>
							</View>
						</View>
					))
				}
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	paymentsList: getPaymentInfo(state),
	endUserId: getEndUserId(state)
});

const mapDispatchToProps = {
	dispatchHandlePayment: handlePaymentList
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);