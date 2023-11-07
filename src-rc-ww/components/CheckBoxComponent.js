import React, { useState } from "react";
import PropTypes from "prop-types";
import { Images } from "src/assets/images";
import {
	StyleSheet,
	Image,
	Text,
	View,
	TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
	flexContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 3,
	},
	checkbox: {
		width: 20,
		height: 20
	},
	labelContainer: {
		marginLeft: 10,
		marginRight: 10
	},
	label: {
		fontSize: 15,
		color: "grey"
	}
});

export default function CheckBoxComponent({
	accessible,
	accessibilityLabel,
	testID,
	label,
	labelBefore,
	labelStyle,
	labelLines,
	checkboxStyle,
	containerStyle,
	checked,
	checkedImage,
	uncheckedImage,
	underlayColor,
	onChange,
	hitSlop
}) {
	const [internalChecked, updateInternalChecked] = useState(false);

	const onChangeCheckbox = () => {
		if (onChange && typeof checked === "boolean") {
			// If passing the value as a prop, return the negation of current value
			onChange(!checked);
		} else {
			let newState = !internalChecked;
			if (onChange) {
				onChange(newState);
			}
			updateInternalChecked(newState);
		}
	};

	let source;
	let container = (
		<View style={containerStyle || styles.container}>
			<Image
				style={checkboxStyle || styles.checkbox}
				source={source}
			/>
			<View style={styles.labelContainer}>
				<Text style={[styles.label, labelStyle]}>{label}</Text>
			</View>
		</View>
	);

	if (typeof checked === "boolean") {
		source = checked ? checkedImage : uncheckedImage;
	} else {
		source = internalChecked ? checkedImage : uncheckedImage;
	}

	if (labelBefore) {
		container = (
			<View style={containerStyle || [styles.container, styles.flexContainer]}>
				{ (label ? (
					<View
						style={styles.labelContainer}
						accessible={accessible}
						accessibilityLabel={`${accessibilityLabel} Label`}
						testID={`${testID} Label`}
					>
						<Text
							numberOfLines={labelLines}
							style={[styles.label, labelStyle]}
						>
							{label}
						</Text>
					</View>
				) : <View />) }
				<Image
					style={[styles.checkbox, checkboxStyle]}
					source={source}
					accessible={accessible}
					accessibilityLabel={`${accessibilityLabel} Checkbox`}
					testID={`${testID} Checkbox`}
				/>
			</View>
		);
	} else {
		container = (
			<View style={[styles.container, containerStyle]}>
				<Image
					style={[styles.checkbox, checkboxStyle]}
					source={source}
					accessible={accessible}
					accessibilityLabel={`${accessibilityLabel} Checkbox`}
					testID={`${testID} Checkbox`}
				/>
				{ (label ? (
					<View
						style={styles.labelContainer}
						accessible={accessible}
						accessibilityLabel={`${accessibilityLabel} Label`}
						testID={`${testID} Label`}
					>
						<Text numberOfLines={labelLines} style={[styles.label, labelStyle]}>
							{label}
						</Text>
					</View>
				) : <View />) }
			</View>
		);
	}

	return (
		<TouchableHighlight
			accessible={accessible}
			accessibilityLabel={accessibilityLabel}
			testID={testID}
			onPress={onChangeCheckbox}
			underlayColor={underlayColor}
			style={styles.flexContainer}
			checkbox={hitSlop}
		>
			{container}
		</TouchableHighlight>
	);
}

CheckBoxComponent.propTypes = {
	accessible: PropTypes.bool,
	accessibilityLabel: PropTypes.string,
	testID: PropTypes.string,
	label: PropTypes.string,
	labelBefore: PropTypes.bool,
	labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
	labelLines: PropTypes.number,
	checkboxStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
	containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
	checked: PropTypes.bool,
	checkedImage: PropTypes.number,
	uncheckedImage: PropTypes.number,
	underlayColor: PropTypes.string,
	onChange: PropTypes.func,
	hitSlop: PropTypes.object
};

CheckBoxComponent.defaultProps = {
	accessible: false,
	accessibilityLabel: "",
	testID: "",
	label: "",
	labelBefore: false,
	labelStyle: {},
	labelLines: 1,
	checkboxStyle: {},
	containerStyle: {},
	checked: null,
	checkedImage: Images.common.checkBoxChecked,
	uncheckedImage: Images.common.checkBoxUnChecked,
	underlayColor: "transparent",
	onChange: () => {},
	hitSlop: {}
};
