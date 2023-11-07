import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { Text, View } from "native-base";
import { Col } from "react-native-easy-grid";
import { translate } from "src/locales/i18n";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/subscription";

const SubscriptionScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.subscriptions")
		});
	}, [navigation]);

	return (
		<View style={styles.subscriptionMainView}>
			<ScrollView style={styles.subscriptionScrollView}>
				<FocusAwareStatusBar barStyle="light-content" />
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("subscriptionScreen.listTitle1")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>2021-02-02</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("subscriptionScreen.listTitle2")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>2021-02-03</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("subscriptionScreen.listTitle3")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>1 Day</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.renewedTexts}>{translate("subscriptionScreen.renewedDetails")}</Text>
					</Col>
				</View>
			</ScrollView>
			<View style={styles.bottomFixedPart}>
				<Text style={styles.cancelSubTexts}>{translate("subscriptionScreen.tripsTexts")}</Text>
				<Button
					style={styles.cancelSubButton}
					buttonText={translate("subscriptionScreen.subscriptionCancelText")}
					buttonStyle={styles.submitButton}
				/>
			</View>
		</View>
	);
};

export default SubscriptionScreen;
