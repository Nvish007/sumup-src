/* eslint-disable react-native/no-inline-styles */
import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Button } from "native-base";
import AppTheme from "src/styles/theme";

const styles = StyleSheet.create({
	container: {
	},
	loginButton: {
		width: "100%",
		backgroundColor: AppTheme.colors.primary,
		textAlign: "center",
		alignSelf: "center",
		justifyContent: "center",
		borderColor: AppTheme.colors.primary,
		elevation: 0,
		paddingVertical: 8,
		borderRadius: 4
	},
	loginButtonText: {
		textAlign: "center",
		alignSelf: "center",
		fontSize: 14,
		textTransform: "uppercase",
		color: "white"
	},
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingIndicator: {
		marginBottom: 5,
		marginLeft: 5
	},
	loadingText: {
		textAlign: "center",
		alignSelf: "center",
		fontSize: 14,
		textTransform: "uppercase",
		color: "white",
	}
});

export default function ButtonComponent({ buttonClicked, buttonText, style, buttonStyle, textStyle, disabled, isLoading, withText }) {
	return (
		<View style={[styles.container, style]}>
			<Button style={[styles.loginButton, buttonStyle, { opacity: disabled ? 0.5 : 1 }]} onPress={buttonClicked} disabled={disabled}>
				{(!isLoading) && <Text style={[styles.loginButtonText, textStyle]}>{buttonText}</Text>}
				{(isLoading && withText) && <Text style={[styles.loadingText, textStyle]}>{withText}</Text> }
				{(isLoading) && <ActivityIndicator size="small" color="white" style={withText ? styles.loadingIndicator : styles.activityIndicator} />}
			</Button>
		</View>
	);
}

ButtonComponent.propTypes = {
	buttonClicked: PropTypes.func,
	buttonText: PropTypes.string.isRequired,
	style: PropTypes.object,
	buttonStyle: PropTypes.object,
	textStyle: PropTypes.object,
	disabled: PropTypes.bool,
	isLoading: PropTypes.bool,
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
ButtonComponent.defaultProps = {
	buttonClicked: () => { },
	style: {},
	buttonStyle: {},
	textStyle: {},
	disabled: false,
	isLoading: false,
};
