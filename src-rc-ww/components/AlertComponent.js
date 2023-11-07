/* eslint-disable react-native/no-inline-styles */
import PropTypes from "prop-types";
import React from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";

export default function ModelComponent({ scanPressed, cancelPressed, scantext, canceltext, modeltext, modalVisible }) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			<View>
				<View
					style={{
						margin: 50,
						marginTop: 250,
						backgroundColor: "white",
						height: 150,
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<Text
							style={{
								marginBottom: 15,
								marginTop: 15,
								textAlign: "center"
							}}
						>
							{modeltext}
						</Text>
					</View>
					<View
						style={
							{
								flex: 1,
								flexDirection: "row",
							}
						}
					>
						<TouchableOpacity
							style={{
								width: 155,
								borderTopWidth: 1,
								borderRightColor: "black",
								borderRightWidth: 1,
								borderTopColor: "black",
								backgroundColor: "white"
							}}
							onPress={cancelPressed}
						>
							<Text style={{ flex: 1, color: "black", marginTop: 30, fontWeight: "bold", textAlign: "center" }}>
								{canceltext}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								width: 155,
								borderTopWidth: 1,
								borderTopColor: "black",
								backgroundColor: "White"
							}}
							onPress={scanPressed}
						>
							<Text
								style={{
									marginTop: 30,
									color: "black",
									fontWeight: "bold",
									textAlign: "center"
								}}
							>
								{scantext}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
ModelComponent.propTypes = {
	scanPressed: PropTypes.func,
	cancelPressed: PropTypes.func,
	scantext: PropTypes.string.isRequired,
	canceltext: PropTypes.string.isRequired,
	modeltext: PropTypes.string.isRequired,
	modalVisible: PropTypes.bool,
};
ModelComponent.defaultProps = {
	scanPressed: () => { },
	cancelPressed: () => { },
	modalVisible: false,
};