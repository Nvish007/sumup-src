import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
// import { Card } from "native-base";
import { Col } from "react-native-easy-grid";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "src/styles/pages/kmDocking";
import { translate } from "src/locales/i18n";
import Modal from "react-native-modal";
import {
	kmDockingUnlock
} from "src/redux/actions";
import {
	getStationId,
	getLocationName,
	getAvailability,
	getStationDbId,
	getUser,
} from "src/redux/selectors";

const KMDocking = ({
	isVisible,
	onClose,
	user,
	stationId,
	locationName,
	availability,
	stationDbId,
	dispatchDockingUnlock
}) => {
	const handleUnlock = () => {
		onClose();
		const data = {
			unlockData: { userId: user.id },
			stationId: stationDbId
		};
		dispatchDockingUnlock(data);
	};

	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onBackdropPress={() => onClose()}
		>
			<View style={styles.KMDockingPart}>
				<View style={styles.kmDockingCard}>
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
							{stationId}
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
										? <Text style={styles.availableTexts}>{translate("kmDocking.available")}</Text>
										: <Text style={styles.unAvailableTexts}>{translate("kmDocking.notAvailable")}</Text>
								}
							</Col>
							{
								availability && (
									<Col style={styles.bottomColRight}>
										<TouchableOpacity
											style={styles.unlockButton}
											onPress={() => handleUnlock()}
										>
											<FontAwesome
												name="lock"
												size={18}
												color="#FFFFFF"
											/>
											<Text style={styles.unlockText}>{translate("kmDocking.unlock")}</Text>
										</TouchableOpacity>
									</Col>
								)
							}
						</View>
					</Col>
				</View>
			</View>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	user: getUser(state),
	locationName: getLocationName(state),
	stationId: getStationId(state),
	availability: getAvailability(state),
	stationDbId: getStationDbId(state)
});

const mapDispatchToProps = {
	dispatchDockingUnlock: (data) => kmDockingUnlock(data)
};

export default connect(mapStateToProps, mapDispatchToProps)(KMDocking);
