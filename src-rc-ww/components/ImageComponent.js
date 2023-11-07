import PropTypes from "prop-types";
import React from "react";
import FastImage from "react-native-fast-image";
import styles from "src/styles/components/ImageComponent";

export default function ImageComponent({ type, style, imageUrl, headers, priority, resizeMode }) {
	if (type === "local") {
		return (
			<FastImage
				style={[styles.fastImage, style && style]}
				source={imageUrl}
				resizeMode={resizeMode}
			/>
		);
	} else {
		return (
			<FastImage
				style={[styles.fastImage, style && style]}
				source={{
					uri: { imageUrl },
					headers: { headers },
					priority: { priority },
				}}
				resizeMode={resizeMode}
			/>
		);
	}
}
ImageComponent.propTypes = {
	type: PropTypes.oneOf(["local", "url"]),
	imageUrl: PropTypes.node.isRequired,
	headers: PropTypes.object,
	priority: PropTypes.any,
	resizeMode: PropTypes.any
};
ImageComponent.defaultProps = {
	headers: { },
	priority: { },
	resizeMode: { },
};