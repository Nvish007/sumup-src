import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Form, Item, Input, Text, Card } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "src/styles/pages/wallet";
import Button from "src/components/ButtonComponent";
import Icon from "react-native-vector-icons/AntDesign";
import { getTopupList, handleVoucherCode } from "src/redux/actions";
import { getEndUserId, getWalletAmount } from "src/redux/selectors";
import { translate } from "src/locales/i18n";
import { showAlert } from "src/utils/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const WalletScreen = ({
	navigation,
	endUserId,
	wallet,
	dispatchGetTopupList,
	dispatchVoucherCode,
}) => {
	const [voucherCode, setVoucherCode] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.wallet")
		});
	}, [navigation]);

	useEffect(() => {
		dispatchGetTopupList(endUserId);
	}, [wallet]);

	const onVoucherResponse = (res) => {
		if (res?.success) {
			showAlert(res.message);
		}
	};

	const confirmVoucherCode = () => {
		let data = { userId: endUserId, voucherCode: voucherCode };
		dispatchVoucherCode(data, onVoucherResponse);
	};

	return (
		<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
			<KeyboardAvoidingView
				style={styles.scrollView}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={85}
			>
				<View style={styles.cardContainer}>
					<Card style={styles.card}>
						<View style={styles.cardContent}>
							<View>
								<Text style={styles.topupName}>{translate("walletScreen.balance")}</Text>
								<Text style={styles.topupValue}>{`${wallet} ${translate("walletScreen.euro")}`}</Text>
								<Text style={styles.topupName}>{translate("walletScreen.bonus")}</Text>
								<Text style={styles.topupValue}>{`7 ${translate("walletScreen.freeRide")}`}</Text>
							</View>
							<View>
								<Text>""</Text>
							</View>
						</View>
						<Text style={styles.topupAmount}>{translate("walletScreen.voucherGift")}</Text>
						<Text style={styles.topupAmount}>{translate("walletScreen.voucherNumber")}</Text>
						<View style={[styles.voucher, styles.row]}>
							<Form style={styles.width}>
								<Item style={styles.nameItemInput} regular>
									<Input
										value={voucherCode}
										onChangeText={(value) => {
											setVoucherCode(value);
										}}
										placeholder={translate("walletScreen.voucher")}
									/>
								</Item>
							</Form>
							<TouchableOpacity onPress={confirmVoucherCode}>
								<Text style={styles.buttonText}>{translate("walletScreen.apply")}</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<View style={styles.topUpButton}>
						<Button
							buttonText="+"
							buttonStyle={styles.buttonStyle}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={() => navigation.navigate("Topup")}
						/>
					</View>
					<View style={styles.paymentButton}>
						<Text style={styles.paymentText}>{translate("walletScreen.paymentHistory")}</Text>
						<TouchableOpacity onPress={() => navigation.navigate("Payments")}>
							<Icon name="arrowright" size={30} style={styles.arrowIcon} />
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	wallet: getWalletAmount(state),
});

const mapDispatchToProps = {
	dispatchGetTopupList: getTopupList,
	dispatchVoucherCode: handleVoucherCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
