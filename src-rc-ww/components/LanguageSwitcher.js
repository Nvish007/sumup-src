/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Keys, KeyValueStore } from "../utils/KeyValueStore";
import { translate } from "../locales/i18n";

const styles = StyleSheet.create({
	modalHeader: {
		backgroundColor: "white",
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	listItem: {
		paddingVertical: 10,
		alignSelf: "flex-start",
		paddingHorizontal: 10,
	},
	item: {
		fontSize: 16,
	},
	languageContainer: {
		marginRight: 20
	},
	languageStyle: {
		color: "white",
		fontSize: 16,
		textTransform: "uppercase"
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0
	}
});

class LanguageSwitcher extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			language: "en",
			isModalVisible: false
		};
	}

	async componentDidMount() {
		const language = await KeyValueStore.getItem(Keys.LANGUAGE);

		if (language !== null) {
			this.setState({ language: language });
		}
	}

	changeLanguage = (lang, i18n) => {
		KeyValueStore.setItem(Keys.LANGUAGE, lang);
		this.setState({ language: lang, isModalVisible: false });
		i18n.changeLanguage(lang);
	}

	render() {
		let { i18n, insets } = this.props;
		const { language, isModalVisible } = this.state;
		return (
			<View>
				<TouchableOpacity style={styles.languageContainer} onPress={() => this.setState({ isModalVisible: true })}>
					<Text style={styles.languageStyle}>{language}</Text>
				</TouchableOpacity>
				<Modal
					animationIn="slideInUp"
					animationInTiming={400}
					hideModalContentWhileAnimating={true}
					animationOut="slideOutDown"
					animationOutTiming={400}
					hasBackdrop={true}
					backdropOpacity={0.4}
					useNativeDriver={true}
					onBackdropPress={() => this.setState({ isModalVisible: false })}
					onBackButtonPress={() => this.setState({ isModalVisible: false })}
					swipeDirection={["up", "left", "right", "down"]}
					style={styles.modal}
					isVisible={isModalVisible}
				>
					<View style={[styles.modalHeader, { paddingBottom: insets.bottom ? insets.bottom : 15 }]}>
						<TouchableOpacity style={styles.listItem} onPress={() => this.changeLanguage("en", i18n)}>
							<Text style={styles.item}>{translate("global.english")}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.listItem} onPress={() => this.changeLanguage("fr", i18n)}>
							<Text style={styles.item}>{translate("global.france")}</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

export default LanguageSwitcher;