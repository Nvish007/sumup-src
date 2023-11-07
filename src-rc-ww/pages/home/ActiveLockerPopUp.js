import React from "react";
import { Alert, View, Text, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "src/styles/pages/activeLockerPopUp";
// import { translate } from "src/locales/i18n";
import ButtonComponent from "src/components/ButtonComponent";
import Images from "../../assets/images";

const ActiveLockerPopUp = ({
	isVisible,
	data,
	onClose,
	onPressReport,
	onPressOpen,
	onPressEndRent,
	dispatchHandleLockerOpen,
	dispatchHandleLockerEndRent
}) => {
	const onResponse = (response) => {

		if (response?.success) {
			Alert.alert(response?.message);
		}
	};

	const onOpenLocker = () => {
		dispatchHandleLockerOpen(data, onResponse);
	};
	const onEndRent = () => {
		dispatchHandleLockerEndRent(data, onResponse);
	};
	return (
		<View style={styles.container}>
				<Text style={styles.modalBorderTop} />
				<Text style={styles.modalBorderTopSec} />
				<View style={styles.carDetails}>
					<Image
						source={Images.markerDetailsScreen.lockers1}
						style={[styles.supportIcon]}
					/>
					<View>
						<Text style={styles.supportText1}>{data.asset.name}</Text>
						<Text style={styles.supportText2}>Bietenweg 27A</Text>
						<Text style={styles.supportText2}>3300 Tienen</Text>
					</View>
					<TouchableOpacity style={styles.reportContainer} onPress={onPressReport}>
						<Image
							source={Images.carRental.alertIcon}
							style={styles.reportIcon}
						/>
						<Text>Report</Text>
					</TouchableOpacity>
				</View>
				<View
					style={[styles.card]}
				>
					<Text style={styles.supportText2}>Current renting time: 0h </Text>
				</View>
				<View style={styles.buttonDetails}>
					<ButtonComponent
						buttonText="Open Locker"
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onPressOpen}
					/>
					<ButtonComponent
						buttonText="End Rent"
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onPressEndRent}
					/>
				</View>
			</View>
	);
};

export default ActiveLockerPopUp;
