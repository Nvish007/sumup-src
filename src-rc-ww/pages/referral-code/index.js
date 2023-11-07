import React, { useEffect, useLayoutEffect } from "react";
import { Text, View, Share, TouchableOpacity, /* Clipboard, */ Alert } from "react-native";
import { connect } from "react-redux";
import { translate } from "src/locales/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import Clipboard from "@react-native-clipboard/clipboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Entypo";
import styles from "src/styles/pages/referralCode";
import { getEndUserId, getReferralCode } from "src/redux/selectors";
import { handleReferralCode } from "src/redux/actions";

const ReferralCodeScreen = ({
	endUserId,
	navigation,
	referralCode,
	dispatchHandleReferralCode
}) => {
	useEffect(() => {
		const userId = { userId: endUserId };
		dispatchHandleReferralCode(userId);
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.referral")
		});
	}, [navigation]);

	const onShareCode = () => {
		Share.share({
			message: referralCode
		});
	};
	const copyCode = () => {
		Clipboard.setString(referralCode);
		Alert.alert("Code is copied to clipboard");
	};

	return (
		<SafeAreaView style={styles.safeView} edges={["right", "bottom", "left"]}>
			<KeyboardAwareScrollView style={styles.reservationsScrollView}>
				<View style={styles.mainView}>
					<Text style={styles.subText}>{referralCode ? translate("referralCode.title") : ""}</Text>
					<View style={styles.subView}>
						<TouchableOpacity onPress={copyCode}>
							<Text style={referralCode ? styles.titleText : styles.invalidText}>{referralCode ? referralCode : translate("referralCode.code")}</Text>
						</TouchableOpacity>
						{
							referralCode
							&& (
								<Icon name="share" size={20} style={styles.icon} onPress={onShareCode} />
							)
						}
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	endUserId: getEndUserId(state),
	referralCode: getReferralCode(state),
});

const mapDispatchToProps = {
	dispatchHandleReferralCode: handleReferralCode
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferralCodeScreen);