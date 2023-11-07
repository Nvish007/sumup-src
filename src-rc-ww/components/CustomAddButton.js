import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AppTheme from "../styles/theme";

const styles = StyleSheet.create({
	backButton: {
		// position: "absolute",
		right: 10,
	},
});

function CustomAddButton() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			style={styles.backButton}
			onPress={() => navigation.navigate("NewReservations")}
		>
			<Icon
				name="plus"
				// color="#008C44"
				color={AppTheme.colors.primary}
				size={32}
			/>
		</TouchableOpacity>
	);
}

export default CustomAddButton;