import React from "react";
import { ScrollView } from "react-native";
import { Text, View } from "native-base";
import { Col } from "react-native-easy-grid";
import { translate } from "src/locales/i18n";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/subscription";
// import stripe from "src/utils/stripe";

const ConfirmSubscriptionScreen = () => {
	// const handleConfirmation = async() => {
	// 	try {
	// 		const cardDetails = await stripe.paymentRequestWithCardForm();
	// 		console.info("cardDetails", cardDetails);
	// 		const response = await stripe.confirmPaymentIntent({
	// 			clientSecret: "",
	// 			paymentMethodId: cardDetails.id
	// 		});
	// 		console.info("response", response);
	// 	} catch (error) {
	// 		console.info(error);
	// 	}
	// };

	return (
		<View style={styles.subscriptionMainView}>
			<ScrollView style={styles.confirmSubscriptionScrollView}>
				<FocusAwareStatusBar barStyle="light-content" />
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("confirmSubscription.listTitle1")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>250</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("confirmSubscription.listTitle2")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>250</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.listingTitle}>{translate("confirmSubscription.listTitle3")}</Text>
					</Col>
					<Col>
						<Text style={styles.listingContent}>1 month</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.renewedTexts}>{translate("confirmSubscription.renewedDetails")}</Text>
					</Col>
				</View>
				<View style={styles.subscriptionListView}>
					<Col>
						<Text style={styles.renewedTexts}>{translate("confirmSubscription.renewedDetails2")}</Text>
					</Col>
				</View>
			</ScrollView>
			<View style={styles.bottomFixedPart}>
				<Text style={styles.cancelSubTexts}>{translate("confirmSubscription.tripsTexts")}</Text>
				<Button
					style={styles.cancelSubButton}
					buttonText={translate("confirmSubscription.confirmButtonText")}
					buttonStyle={styles.submitButton}
					// buttonClicked={handleConfirmation}
				/>
			</View>
		</View>
	);
};

export default ConfirmSubscriptionScreen;
