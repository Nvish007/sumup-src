// import PropTypes from "prop-types";
import React, { } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import ButtonComponent from "src/components/ButtonComponent";
import styles from "src/styles/pages/accessControl";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";

const AccessControl = ({
	AccessGranted,
	AccessDenied,
	isFromLocker,
	onCloseAccessGranted,
	onCloseAccessDenied
}) => {
	return (
		<>
			<Modal
				isVisible={AccessGranted}
				onBackdropPress={onCloseAccessGranted}
			>
				<View style={styles.containerModal}>
					<Text style={styles.message}>{translate("accessControl.grantMessage1")}</Text>
					<Text style={styles.message}>{translate("accessControl.grantMessage2")}</Text>
					<Image source={Images.markerDetailsScreen.lockAccessGrant} style={styles.lockImage} />
				</View>
			</Modal>
			<Modal
				isVisible={AccessDenied}
				onBackdropPress={onCloseAccessDenied}
			>
				<View style={[styles.containerModal, isFromLocker && styles.additionalPadding]}>
					<Text style={isFromLocker ? styles.lockerMessage : styles.message1}>{isFromLocker ? translate("accessControl.lockerDeniedMessage1") : translate("accessControl.deniedMessage1")}</Text>
					<Text style={isFromLocker ? styles.lockerMessage : styles.message1}>{isFromLocker ? translate("accessControl.lockerDeniedMessage2") : translate("accessControl.deniedMessage2")}</Text>
					<Text style={isFromLocker ? [styles.lockerMessage, styles.textPadding] : styles.message1}>{isFromLocker ? translate("accessControl.lockerDeniedMessage3") : translate("accessControl.deniedMessage3")}</Text>
					{
						isFromLocker
							? (
								<ButtonComponent
									buttonText={translate("accessControl.okay")}
									buttonStyle={styles.OkayButton}
									textStyle={styles.buttonTextsStyle}
									buttonClicked={() => onCloseAccessDenied()}
								/>
							)
							:	<Image source={Images.markerDetailsScreen.lockAccessDenied} style={styles.lockImage} />
					}
				</View>
			</Modal>
		</>
	);
};

export default AccessControl;