import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
// import Torch from "react-native-torch";
// import IonIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FocusAwareStatusBar from "src/components/FocusAwareStatusBar";
import Images from "src/assets/images";
import styles from "src/styles/pages/scan";

const ScanQR = ({
	route,
	navigation
}) => {
	const { params: { showSearch } } = route;
	const onRead = (e) => {
		route.params.onScanResult(e);
	};
	const [torchOn, setTorchOn] = useState(false);
	// const setTorchOnFunc = (on) => {
	// 	console.log("settoruch state", torchOn);
	// 	// Torch.switchState(true);
	// 	// setTorchOn(!on);
	// 	setTorchOn(on);
	// };

	return (
		<View style={styles.container}>
			<FocusAwareStatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent={true}
			/>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => {
					navigation.pop();
				}}
			>
				<Icon name="close" color="white" size={35} />
				{/* <IonIcon name="arrow-back" size={16} color="blue" /> */}
			</TouchableOpacity>
			<QRCodeScanner
				reactivate={false}
				showMarker={true}
				onRead={onRead}
				flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
				bottomContent={(
					<View style={styles.QRscannerBottomButton}>
						{
							showSearch && (
								<TouchableOpacity
									style={styles.scannerBtns}
									onPress={() => navigation.navigate("Search")}
								>
									<Image source={Images.common.keyboardIcon} style={styles.keyboardIcon} />
									{/* <MaterialCommunityIcons name="dialpad" color="white" size={30} /> */}
									{/* <IonIcon name="ios-keypad" color="white" size={30} /> */}
								</TouchableOpacity>
							)
						}
						<TouchableOpacity
							style={styles.scannerBtns}
							onPress={() => {
								// setTorchOnFunc(!torchOn);
								setTorchOn(!torchOn);
							}}
						>
							<MaterialCommunityIcons name="flashlight" color="white" size={30} />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

export default ScanQR;