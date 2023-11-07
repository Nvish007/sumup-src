import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Images } from "src/assets/images";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
	backArrowIcon: {
		width: 18,
		height: 15,
		padding: 10,
		resizeMode: "cover"
	},
	backButton: {
		position: "absolute",
		left: 15,
	},
});

function CustomBackButton(file) {
	const navigation = useNavigation();
	const onNavigate = () => {
		if (file?.file == "file") {
			navigation.navigate("Home");
		} else {
			navigation.goBack();
		}
	};
	return (
		<TouchableOpacity
			style={styles.backButton}
			onPress={onNavigate}
		>
			<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
		</TouchableOpacity>
	);
}

export default CustomBackButton;