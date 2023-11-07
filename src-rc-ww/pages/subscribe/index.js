import React from "react";
import { ScrollView } from "react-native";
import { Text, View, CheckBox } from "native-base";
import { Col } from "react-native-easy-grid";
import { translate } from "src/locales/i18n";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/subscribe";

const SubscribeScreen = ({
	navigation
}) => {
	return (
		<View style={styles.subscribeMainView}>
			<ScrollView style={styles.subscribeScrollView}>
				<FocusAwareStatusBar barStyle="light-content" />
				<View style={styles.subscribeListView}>
					<Col size={80}>
						<Text style={styles.listsTitle}>{translate("subscribeScreen.listTitle1")}</Text>
						<Text style={styles.listsSubTexts}>{translate("subscribeScreen.listSubTitle1")}</Text>
						<Text style={styles.listsDetails}>{translate("subscribeScreen.listContent1")}</Text>
					</Col>
					<Col
						style={styles.checkBoxStyleCol}
						size={20}
					>
						<CheckBox color="#12681c" />
					</Col>
				</View>
				<View style={styles.subscribeListView}>
					<Col size={80}>
						<Text style={styles.listsTitle}>{translate("subscribeScreen.listTitle2")}</Text>
						<Text style={styles.listsSubTexts}>{translate("subscribeScreen.listSubTitle2")}</Text>
						<Text style={styles.listsDetails}>{translate("subscribeScreen.listContent2")}</Text>
					</Col>
					<Col
						style={styles.checkBoxStyleCol}
						size={20}
					>
						<CheckBox color="#12681c" />
					</Col>
				</View>
				<View style={styles.subscribeListView}>
					<Col size={80}>
						<Text style={styles.listsTitle}>{translate("subscribeScreen.listTitle3")}</Text>
						<Text style={styles.listsSubTexts}>{translate("subscribeScreen.listSubTitle3")}</Text>
						<Text style={styles.listsDetails}>{translate("subscribeScreen.listContent3")}</Text>
					</Col>
					<Col
						style={styles.checkBoxStyleCol}
						size={20}
					>
						<CheckBox
							color="#12681c"
							checked={true}
						/>
					</Col>
				</View>
			</ScrollView>
			<View style={styles.bottomFixedPart}>
				<Button
					style={styles.cancelSubButton}
					buttonText={translate("subscribeScreen.nextButtonTexts")}
					buttonStyle={styles.submitButton}
					buttonClicked={() => navigation.navigate("ConfirmSubscription")}
				/>
			</View>
		</View>
	);
};

export default SubscribeScreen;
