import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Text } from "native-base";
import { connect } from "react-redux";
import Button from "src/components/ButtonComponent";
import styles from "src/styles/pages/carRentalFinalCheck";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "src/components/CheckBoxComponent";
import { translate } from "src/locales/i18n";
import { showAlert } from "src/utils/native";
import { closeCarRental, handleCarLock, handleCarFixedKey } from "src/redux/actions";
import { getActiveRental, getCarRideStatus, getEndUserId } from "src/redux/selectors";

const CarFinalCheck = ({
	route,
	navigation,
	activeRental,
	carRideStatus,
	userId,
	dispatchCloseCarRental,
	dispatchHandleCarLock,
	dispatchCarFixedKey,
}) => {
	console.info("values", carRideStatus.fixed_key, carRideStatus.door_open, carRideStatus.door_lock);
	const { params } = route;
	const [key, setKey] = useState(false);
	const [doorOpen, setDoorOpen] = useState(false);
	const [checkBox3, setCheckcheckBox3] = useState(false);
	const [loader, setLoader] = useState(false);
	const onCloseCarRentalResponse = (response) => {
		if (response.success) {
			navigation.navigate("EndCarRideServiceFeedback", { rentalId: response?.data?.id });
		} else {
			showAlert("Error", response?.message);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: translate("pageTitles.finalChecks")
		});
	}, [navigation]);

	const onCloseCarRental = () => {
		setLoader(true);
		const data = {
			assetId: activeRental?.asset?._id,
			stateInside: params?.data?.stateInside ? params.data.stateInside : "0",
			stateOutside: params?.data?.stateOutside ? params.data.stateOutside : "0",
			stateRemarks: params?.data?.stateRemarks ? params.data.stateRemarks : "",
		};
		if (carRideStatus.door_lock === "locked" && key && doorOpen && checkBox3) {
			setLoader(false);
			dispatchCloseCarRental(data, onCloseCarRentalResponse);
		} else if (carRideStatus.door_lock === "unlocked") {
			setLoader(false);
			/* Alert.alert(
				"Door is unlocked!",
			); */
		} else {
			//Alert.alert("Please make sure all checkboxes are checked");
		}
	};
	const onCallback = (res) => {
		setTimeout(() => {
			setLoader(false);
			console.info(res);
			// Alert.alert("Mqtt command not arrived");
		}, 60000);
	};

	const onContinue = () => {
		setLoader(true);
		const data = { userId, qrContent: activeRental?.asset?._id, type: "car" };
		if (carRideStatus.door_lock === "locked") {
			onCloseCarRental();
		} else {
			dispatchHandleCarLock(data, onCallback);
		}
	};
	const onMqtt = () => {
		/* Alert.alert(
			`Door_open: ${carRideStatus.door_open}, Door_lock: ${carRideStatus.door_lock}`,
			`fixed_key: ${carRideStatus.fixed_key}, immobilizer: ${carRideStatus.immobilizer}`,
		); */
	};

	useEffect(() => {
		setKey(carRideStatus.fixed_key === "absent" ? false : true);
		setDoorOpen(carRideStatus.door_open === "closed" ? true : false);
		onMqtt();
		if (carRideStatus.door_lock === "locked" && key) {
			setLoader(false);
			onCloseCarRental();
		}
	}, [carRideStatus]);

	useEffect(() => {
		let assetId = { qrContent: activeRental?.asset?._id };
		dispatchCarFixedKey(assetId);
	}, []);

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
							onChange={(e) => setKey(e)}
							checkboxStyle={styles.checkboxContainerStyle}
						/>
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox1")}</Text>
					</View>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox
							// checked={doorOpen}
							onChange={(e) => setDoorOpen(e)}
							checkboxStyle={styles.checkboxContainerStyle}
						/>
						<Text style={[styles.checkText]}>{translate("carRentalFinalCheck.checkBox2")}</Text>
					</View>
					<View style={[styles.row, styles.subContainer]}>
						<CheckBox checkboxStyle={styles.checkboxContainerStyle} onChange={(e) => setCheckcheckBox3(e)} />
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox3")}</Text>
					</View>
					{/* <View style={[styles.row, styles.subContainer]}>
						<CheckBox checkboxStyle={styles.checkboxContainerStyle} />
						<Text style={styles.checkText}>{translate("carRentalFinalCheck.checkBox4")}</Text>
					</View> */}
				</View>
			</ScrollView>

			<View style={styles.verifyButtonContainer}>
				<Button
					buttonText={translate("carRentalFinalCheck.lockAndReturn")}
					buttonStyle={styles.confirmButton}
					textStyle={styles.buttonTextsStyle}
					buttonClicked={onContinue}
					isLoading={loader}
					disabled={(!key || !doorOpen || !checkBox3) || (loader)}
				/>
				{/* <Image source={Images.common.forwardArrow} style={styles.forwardArrowIcon} /> */}
			</View>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	activeRental: getActiveRental(state),
	carRideStatus: getCarRideStatus(state),
	userId: getEndUserId(state),
});

const mapDispatchToProps = {
	dispatchCloseCarRental: closeCarRental,
	dispatchHandleCarLock: handleCarLock,
	dispatchCarFixedKey: handleCarFixedKey,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarFinalCheck);