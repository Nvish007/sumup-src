import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import AppTheme from "src/styles/theme";

const styles = StyleSheet.create({
	loaderContainer: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	loaderContainer1: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: -60,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		backgroundColor: "rgba(0,0,0,0.33)"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		marginBottom: 50
	},
	activityIndicatorWrapper: {
		height: 75,
		width: 75,
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	activityIndicatorWrapper1: {
		height: 100,
		width: "70%",
		borderRadius: 10,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		backgroundColor: "rgba(255,255,255,0.7)"
	},
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 10
	}
});

function LoadingIndicator({ isLoading, loadingText, style }) {
	if (isLoading) {
		return (
			<View style={[loadingText ? styles.loaderContainer1 : styles.loaderContainer, style]}>
				<View style={styles.container}>
					<View style={loadingText ? styles.activityIndicatorWrapper1 : styles.activityIndicatorWrapper}>
						<ActivityIndicator size="large" color={AppTheme.colors.primary} style={styles.activityIndicator} />
						{
							(loadingText)
							&& (
								<Text style={styles.text}>{loadingText}</Text>
							)
						}
					</View>
				</View>
			</View>
		);
	} else {
		return null;
	}
}

LoadingIndicator.propTypes = {
	isLoading: PropTypes.bool,
	loadingText: PropTypes.string
};

export default LoadingIndicator;
