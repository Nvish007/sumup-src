import i18n from "i18next";
import { store } from "src/redux/store";
import { NativeModules, Platform } from "react-native";
import { Keys, KeyValueStore } from "./KeyValueStore";

export async function changeAppLanguage() {
	const language = await KeyValueStore.getItem(Keys.LANGUAGE);
	const { auth } = store.getState();
	const companyLanguage = auth?.endUser?.language;
	let deviceLanguage = Platform.OS === "ios"
		? NativeModules.SettingsManager.settings.AppleLocale
		: NativeModules.I18nManager.localeIdentifier;
	// const lang = deviceLanguage.substr(0, 2);
	const lang = deviceLanguage !== undefined ? deviceLanguage.substr(0, 2) : "en";
	// const lang = deviceLanguage.split("_")

	if (language !== null) {
		i18n.changeLanguage(language);
	} else if (lang === "hu") {
		i18n.changeLanguage("hun");
	} else if (lang) {
		i18n.changeLanguage(lang);
	} else if (companyLanguage) {
		i18n.changeLanguage(companyLanguage);
	} else i18n.changeLanguage("en");
}

export function setLanguage(lang) {
	KeyValueStore.setItem(Keys.LANGUAGE, lang);
	i18n.changeLanguage(lang);
}