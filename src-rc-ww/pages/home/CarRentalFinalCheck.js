import React, { useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "native-base";
// import { Images } from "src/assets/images";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/carRentalFinalCheck";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "src/components/CheckBoxComponent";
import { translate } from "src/locales/i18n";

const CarRentalFinalCheck = ({
	navigation
}) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.finalChecks")
		});
	}, [navigation]);

	return (
		<SafeAreaView
			style={styles.safeView}
		>
			<ScrollView style={styles.mainScrollView}>
				<View style={styles.subContainer}>
					<Text style={styles.mainText}>{translate("carRentalFinalCheck.almostDone")}</Text>
				</View>
				<View>
					<Text style={styles.subText}>{translate("carRentalFinalCheck.endRideText")}</Text>
				</View>
				<View style={styles.column}>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox
							// checked={value}
							// onChange={() => {}}
							checkboxStyle={styles.checkboxContainerStyle}
						/>
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox1")}</Text>
					</View>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox checkboxStyle={styles.checkboxContainerStyle} />
						<Text style={[styles.checkText]}>{translate("carRentalFinalCheck.checkBox2")}</Text>
					</View>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox checkboxStyle={styles.checkboxContainerStyle} />
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox3")}</Text>
					</View>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox checkboxStyle={styles.checkboxContainerStyle} />
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox4")}</Text>
					</View>
				</View>
			</ScrollView>

			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("carRentalFinalCheck.lockAndReturn")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={() => navigation.navigate("CarRentalFeedback")}
				/>
				{/* <Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} /> */}
			</View>
		</SafeAreaView>
	);
};

export default CarRentalFinalCheck;