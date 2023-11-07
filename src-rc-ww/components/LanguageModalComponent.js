import React, { useState } from "react";
import { Image, View, ScrollView, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import { List, ListItem, Left, Right } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Images } from "src/assets/images";
import { translate } from "src/locales/i18n";
import { setLanguage } from "src/utils/language";
import i18n from "i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "src/styles/components/LanguageModalComponent";

const LanguageModalComponent = ({
	isVisible,
	onClose
}) => {
	const [checkedEn, setCheckedEn] = useState(i18n.language === "en" ? true : false);
	const [checkedNl, setCheckedNl] = useState(i18n.language === "nl" ? true : false);
	const [checkedHun, setCheckedHun] = useState(i18n.language === "hun" ? true : false);
	const insets = useSafeAreaInsets();

	const onLanguageChange = (type) => {
		if (type === "en") {
			setCheckedEn(true);
			setCheckedNl(false);
			setLanguage(type);
		} else if (type === "nl") {
			setCheckedNl(true);
			setCheckedEn(false);
			setLanguage(type);
		} else if (type === "hun") {
			setCheckedHun(true);
			setCheckedHun(false);
			setLanguage(type);
		}
		onClose();
	};

	return (
		<Modal
			isVisible={isVisible}
			style={styles.modal}
			onClose={() => onClose()}
		>
			<View style={[styles.screenFixHeader, { marginTop: insets.top }]}>
				<TouchableOpacity
					onPress={() => onClose()}
					style={styles.backButton}
				>
					<Image source={Images.common.backArrow} style={styles.backArrowIcon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>{translate("profileScreen.select")}</Text>
			</View>
			<ScrollView style={styles.modalScrollView} bounces={false}>
				<List>
					<ListItem style={styles.languageList} onPress={() => onLanguageChange("en")}>
						<Left>
							<Text style={styles.modalLanguageText}>{translate("global.english")}</Text>
						</Left>
						<Right>
							{
								(checkedEn)
								&& (
									<MaterialIcons
										style={styles.checkIcon}
										name="check"
										color="#000000"
										size={18}
									/>
								)
							}
						</Right>
					</ListItem>
					<ListItem style={styles.languageList} onPress={() => onLanguageChange("nl")}>
						<Left>
							<Text style={styles.modalLanguageText}>{translate("global.dutch")}</Text>
						</Left>
						<Right>
							{
								(checkedNl)
								&& (
									<MaterialIcons
										style={styles.checkIcon}
										name="check"
										color="#000000"
										size={18}
									/>
								)
							}
						</Right>
					</ListItem>
					<ListItem style={styles.languageList} onPress={() => onLanguageChange("hun")}>
						<Left>
							<Text style={styles.modalLanguageText}>{translate("global.magyar")}</Text>
						</Left>
						<Right>
							{
								(checkedHun)
								&& (
									<MaterialIcons
										style={styles.checkIcon}
										name="check"
										color="#000000"
										size={18}
									/>
								)
							}
						</Right>
					</ListItem>
					{/* <ListItem style={styles.languageList} onPress={() => onClose()}>
						<Left>
							<Image source={Images.common.flagImage} style={styles.modalFlagImage} />
							<Text style={styles.modalLanguageText}>English</Text>
						</Left>
						<Right>
							<MaterialIcons
								style={styles.checkIcon}
								name="check"
								color="#000000"
								size={18}
							/>
						</Right>
					</ListItem> */}
				</List>
			</ScrollView>
		</Modal>
	);
};

export default LanguageModalComponent;