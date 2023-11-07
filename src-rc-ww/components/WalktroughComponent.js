import PropTypes from "prop-types";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import styles from "src/styles/components/WalktroughComponent";
import Images from "src/assets/images";

export default function WalktroughComponent({ image, contentText1, contentText2, contentText3, titleText, skipButtonText, doneButtonText, skipPressed, onDone }) {
	const insets = useSafeAreaInsets();
	return (
		<View style={styles.walktroughComponentMain}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
			<TouchableOpacity
				style={styles.skipButtonPart}
				onPress={skipPressed}
			>
				<Text style={styles.skipButtonTexts}>
					{skipButtonText}
				</Text>
			</TouchableOpacity>
			<View style={styles.walktroughContentPart}>
				<View style={styles.logoImagePart}>
					{
						image !== undefined
						&& (
							image
								? (<Image source={{ uri: image }} style={styles.logoImage} />)
								: (<Image source={Images.authScreen.mobility} style={styles.logoImage} />)
						)
					}
				</View>
				<Text style={styles.screenTitle}>
					{titleText}
				</Text>
				<Text style={styles.screenContent}>
					{contentText1}
				</Text>
				<Text style={styles.screenContent}>
					{contentText2}
				</Text>
				<Text style={styles.screenContent}>
					{contentText3}
				</Text>
			</View>
			<TouchableOpacity
				style={[styles.doneButtonPart, { bottom: insets.bottom }]}
				onPress={onDone}
			>
				<Text style={styles.doneButtonText}>
					{doneButtonText}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
WalktroughComponent.propTypes = {
	skipPressed: PropTypes.func,
	onDone: PropTypes.func,
	doneButtonText: PropTypes.string,
	skipButtonText: PropTypes.string,
	titleText: PropTypes.string.isRequired,
	contentText1: PropTypes.string.isRequired,
	contentText2: PropTypes.string,
	contentText3: PropTypes.string,
};
WalktroughComponent.defaultProps = {
	skipPressed: () => { },
	onDone: () => {},
	contentText2: "",
	contentText3: "",
	skipButtonText: "",
	doneButtonText: "",
};