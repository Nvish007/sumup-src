import React, { useState } from "react";
import { connect } from "react-redux";
import { View, Image, TextInput, Alert } from "react-native";
import { Text } from "native-base";
import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/reportLocker";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Rating } from "react-native-ratings";
import { translate } from "src/locales/i18n";
import { showAlert } from "src/utils/native";
import { handleDamageReport } from "src/redux/actions";
import { getActiveRental, getEndUserId } from "src/redux/selectors";
import AppTheme from "../../styles/theme";

const ReportLocker = ({
	navigation,
	route,
	hasActiveRental,
	endUserId,
	dispatchDamageReport
}) => {
	const [remarks, updateRemarks] = useState("");
	const [rating, updateRating] = useState(0);

	const onDamageReportResponse = (res) => {
		if (res?.success) {
			showAlert(res.message);
			console.log(route);
			if (route.params && route.params.onGoBack) {
				
				route.params.onGoBack(); // Roep de refresh-actie van het homescreen aan voordat je teruggaat
			  }
			  navigation.goBack();
			
		}
	};

	const onContinue = () => {
		if (remarks === "") return Alert.alert("Please add some remarks!");
		const data = new FormData();
		data.append("clientId", endUserId);
		data.append("assetId", hasActiveRental ? hasActiveRental?.asset?._id : "");
		data.append("subject", rating);
		data.append("rating", rating);
		data.append("message", remarks);
		data.append("priority", "normal");
		data.append("rentId", hasActiveRental ? hasActiveRental?.rental?.id : "");
		dispatchDamageReport(data, onDamageReportResponse);
	};

	return (
		<SafeAreaView
			style={styles.safeView}
			edges={["left", "bottom", "right"]}
		>
			<KeyboardAwareScrollView style={styles.mainScrollView} extraHeight={50}>
				<View style={styles.alertContainer}>
					<View
						style={[styles.rowCar]}
					>
						<Image source={Images.carRental.alertIcon} style={styles.alertIcon} />
						<Text style={styles.alertText}>{translate("reportLocker.endFormAlert")}</Text>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View style={styles.noteContainer}>
						<Image source={Images.common.noteIconLocker} style={styles.noteIcon} />
						<Text style={styles.desText}>{translate("reportLocker.describe")}</Text>
					</View>
				</View>
				<View style={styles.carContainer}>
					<Rating
						style={styles.ratingInput}
						type="custom"
						ratingCount={5}
						imageSize={30}
						defaultRating={5}
						startingValue={rating}
						onFinishRating={(value) => updateRating(value)}
						// ratingColor="#008c44"
						ratingColor={AppTheme.colors.primary}
						ratingBackgroundColor="#c8c7c8"
						// readonly={true}
						tintColor="#fff"
					/>
				</View>
				<View style={[styles.ratingInput, styles.remarkInput]}>
					<TextInput
						multiline={true}
						numberOfLines={6}
						blurOnSubmit={false}
						placeholder={translate("reportLocker.remarks")}
						style={styles.textArea}
						value={remarks.value}
						onChangeText={(value) => updateRemarks(value)}
					/>
				</View>
			</KeyboardAwareScrollView>
			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("reportLocker.continue")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonText}
					buttonClicked={onContinue}
				/>
				<Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} />
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	hasActiveRental: getActiveRental(state),
	endUserId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchDamageReport: handleDamageReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportLocker);