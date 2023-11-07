import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Linking, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Images } from "src/assets/images";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/support";
import i18n from "i18next";
import { translate } from "src/locales/i18n";
import { handleGetCompanySupport } from "src/redux/actions";
import { getCompanySupport } from "src/redux/selectors";

const SupportScreen = ({
	support,
	dispatchCompanySupport,
}) => {
	const faq = support?.faqs;
	const phoneNumber = support?.telephone;

	const openDial = () => {
		if (Platform.OS === "android") {
			Linking.openURL(`tel:${phoneNumber}`);
		} else {
			Linking.openURL(`telprompt:${phoneNumber}`);
		}
	};

	const onClickFAQ = () => {
		const link = faq?.map((item) => {
			if (item.language_id === i18n.language) {
				Linking.openURL(item.faq);
			} else if (item.language_id === "en") {
				Linking.openURL(item.faq);
			}
		});
		console.info(link);
	};
	useEffect(() => {
		dispatchCompanySupport();
	}, []);

	return (
		<SafeAreaView style={styles.safeView}>
			<View style={styles.mainContainer}>
				<View style={styles.margin}>
					<Text style={styles.supportText}>{translate("supportScreen.titleText")}</Text>
					<Text style={[styles.supportText, styles.margin]}>{translate("supportScreen.contact")}</Text>
				</View>

				<View style={[styles.width, styles.margin]}>
					<View style={styles.margin}>
						<View style={styles.mailIcon}>
							<Feather
								name="phone-call"
								color="#fff"
								size={22}
							/>
						</View>
						<Button
							buttonText={phoneNumber ? phoneNumber : "Number"}
							buttonStyle={styles.confirmButton}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={() => openDial()}
						/>
					</View>
					<View style={styles.margin}>
						<View style={styles.mailIcon}>
							<Octicons
								name="mail-read"
								color="#fff"
								size={22}
							/>
						</View>
						<Button
							buttonText={translate("supportScreen.emailText")}
							buttonStyle={styles.confirmButton}
							textStyle={styles.buttonTextsStyle}
							buttonClicked={() => {
								Linking.openURL(`mailto:${support?.email}`);
							}}
						/>
					</View>
					{/* <View style={styles.margin}>
						<View style={styles.mailIcon}>
							<Image source={Images.common.chatIcon} style={styles.chatIcon} />
						</View>
						<Button
							buttonText={translate("supportScreen.chat")}
							textStyle={styles.buttonTextsStyle}
							buttonStyle={styles.confirmButton}
						/>
					</View> */}
				</View>

				<View style={styles.margin}>
					<View style={styles.row}>
						<Text style={[styles.supportText, styles.margin]}>
							{translate("supportScreen.text1")}
						</Text>
						<TouchableOpacity onPress={onClickFAQ}>
							<Text style={[styles.supportTextBold, styles.margin]}>
								{"\t"}
								{translate("supportScreen.text2")}
							</Text>
						</TouchableOpacity>
					</View>

					{/* <View style={styles.row}>
						<Text style={[styles.supportText, styles.margin]}>
							{translate("supportScreen.text3")}
							{"\t"}
						</Text>
						<Text style={[styles.supportTextBold, styles.margin]}>{translate("supportScreen.text4")}</Text>
					</View> */}
					{/* <Text style={[styles.supportTextNormal]}>(link).</Text> */}
				</View>
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	support: getCompanySupport(state),
});
const mapDispatchToProps = {
	dispatchCompanySupport: handleGetCompanySupport,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);
