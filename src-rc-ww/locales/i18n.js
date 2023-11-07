import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import nl from "./nl.json";
import hun from "./hun.json";

// Should the app fallback to English if user locale doesn't exists
i18n.fallbacks = true;

// the translations file path
// (tip: move them in a JSON file and import them)
const resources = {
	en: {
		translation: en
	},
	nl: {
		translation: nl
	},
	hun: {
		translation: hun
	}
};

// const currentLocale = i18n.currentLocale();

// export const isRTL = currentLocale.indexOf("nl") === 0 || currentLocale.indexOf("ar") === 0;

i18n.use(initReactI18next)
// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		resources,
		lng: "en",
		fallbackLng: "en",
		debug: true,
		interpolation: {
			escapeValue: false // react is already safe from xss
		}
	});

export function translate(text) {
	return i18n.t(text);
}

export default i18n;
