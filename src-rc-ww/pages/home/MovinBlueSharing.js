import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { Col } from "react-native-easy-grid";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "src/styles/pages/movinBlueSharing";
import { translate } from "src/locales/i18n";
import Modal from "react-native-modal";
import {
	getAvailability,
	getLocationName,
	getCarName
} from "src/redux/selectors";

const MovinBlueSharing = ({
	isVisible,
	onClose,
	availability,
	locationName,
	carName
}) => {
	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={() => onClose()}
		>
			<View style={styles.movinBlueSharingPart}>
				<View style={styles.movinBlueSharingCard}>
					<Col size={30} style={styles.colLeft}>
						<View style={styles.imgBox} />
					</Col>
					<Col size={70} style={styles.colRight}>
						<TouchableOpacity
							style={styles.qIconButton}
						>
							<FontAwesome
								name="question-circle"
								size={22}
								color="#000000"
							/>
						</TouchableOpacity>
						<Text
							numberOfLines={1}
							style={styles.nameTexts}
						>
							{carName}
						</Text>
						<Text
							numberOfLines={1}
							style={styles.locationTexts}
						>
							{locationName}
						</Text>
						<View style={styles.colRightButtonPart}>
							<Col style={styles.bottomColLeft}>
								{
									availability
										? <Text style={styles.availableTexts}>{translate("movinBlue.available")}</Text>
										: <Text style={styles.unAvailableTexts}>{translate("movinBlue.notAvailable")}</Text>
								}
							</Col>
						</View>
					</Col>
				</View>
			</View>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	availability: getAvailability(state),
	locationName: getLocationName(state),
	carName: getCarName(state)
});

export default connect(mapStateToProps, null)(MovinBlueSharing);
