import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet, TextInput as Input, Text } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginVertical: 12
	},
	input: {
		backgroundColor: "#F6F8F9",
		paddingHorizontal: 15,
		borderRadius: 4,
		paddingVertical: 13.7
	},
	error: {
		color: "red",
		marginTop: 5,
		fontSize: 16,
	}
});

const TextInput = ({
	style,
	inputStyle,
	errorText,
	...props
}) => {
	return (
		<View style={[styles.container, style]}>
			<Input
				style={[styles.input, inputStyle]}
				placeholderTextColor="#8e8d8d"
				{...props}
			/>
			{
				errorText ? <Text style={styles.error}>{errorText}</Text> : null
			}
		</View>
	);
};

TextInput.propTypes = {
	errorText: PropTypes.string,
	style: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),
	inputStyle: PropTypes.object
};

/* SPECIFIES THE DEFAULT VALUES FOR PROPS */
TextInput.defaultProps = {
	errorText: "",
	style: {},
	inputStyle: {}
};

export default TextInput;