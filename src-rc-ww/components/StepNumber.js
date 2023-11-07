import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";
import AppTheme from "src/styles/theme";
import commonStyles from "src/styles/common";

const styles = StyleSheet.create({
	stepNumber: {
		...commonStyles.regular1,
		textAlign: "right",
		letterSpacing: -0.3,
		color: AppTheme.colors.primary,
		position: "absolute",
		right: 15,
	}
});

function StepNumber({
	currentStep,
	totalStep
}) {
	return (
		<Text style={styles.stepNumber}>
			{`${currentStep}/${totalStep}`}
		</Text>
	);
}

StepNumber.propTypes = {
	currentStep: PropTypes.number.isRequired,
	totalStep: PropTypes.number.isRequired
};

export default StepNumber;