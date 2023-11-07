import React, {} from "react";
import { Alert, View, Text, } from "react-native";
import Modal from "react-native-modal";
import styles from "src/styles/pages/carSharing";
import { CarsharingIcon } from "src/assets/svgs";
import { translate } from "src/locales/i18n";
import ButtonComponent from "src/components/ButtonComponent";

const CarSharing = ({
	isVisible,
	data,
	onClose,
	dispatchHandleCarUnlock,
	dispatchHandleCarLock
}) => {
	// console.info(data);
	const onResponse = (response) => {
		if (response?.success) {
			Alert.alert(response?.message);
		}
	};

	const onCarLock = () => {
		dispatchHandleCarLock(data, onResponse);
	};
	const onCarUnlock = () => {
		dispatchHandleCarUnlock(data, onResponse);
	};
	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={() => onClose()}
		>
			<View style={styles.container}>
				<Text style={styles.modalBorderTop} />
				<Text style={styles.modalBorderTopSec} />
				<Text style={styles.modalTitle}>{translate("carSharing.start")}</Text>
				<View
					style={styles.card}
				>
					<View style={[styles.rideCard, styles.carDetails]}>
						<CarsharingIcon style={styles.supportIcon} />
						<View>
							<Text style={styles.supportText1}>{translate("carSharing.car")}</Text>
							<Text style={styles.supportText2}>{translate("carSharing.battery")}</Text>
						</View>
					</View>
				</View>
				<View style={styles.buttonDetails}>
					<ButtonComponent
						buttonText={translate("carSharing.unlock")}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onCarUnlock}
					/>
					<ButtonComponent
						buttonText={translate("carSharing.lock")}
						buttonStyle={styles.button}
						textStyle={styles.buttonTextsStyle}
						buttonClicked={onCarLock}
					/>
				</View>
				{/* <ButtonComponent
					buttonText={translate("carSharing.confirm")}
					buttonStyle={styles.button}
					textStyle={styles.buttonTextsStyle}
					// buttonClicked={}
				/> */}
			</View>
		</Modal>
	);
};

export default CarSharing;
