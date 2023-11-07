import { translate } from "src/locales/i18n";

export const emailValidator = (email) => {
	const re = /\S+@\S+\.\S+/;

	if (!email || email.length <= 0) return translate("validators.emptyEmail");
	if (!re.test(email)) return translate("validators.wrongEmail");

	return "";
};

export const passwordValidator = (password) => {
	if (!password || password.length <= 0) return translate("validators.emptyPassword");

	return "";
};
export const passwordLengthValidator = (password) => {
	if (password.length < 8) return translate("validators.minCharacter");

	return "";
};

export const passwordCaseValidator = (password) => {
	let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
	if (password.match(strongRegex)) {
		return "";
	} else {
		return translate("validators.caseError");
	}
};
export const passwordNumericValidator = (password) => {
	let strongRegex = new RegExp("^(?=.*[0-9])");
	if (password.match(strongRegex)) {
		return "";
	} else {
		return translate("validators.numericError");
	}
};
export const passwordCharValidator = (password) => {
	let strongRegex = new RegExp("^(?=.*[!@#\$%\^&\*])");
	if (password.match(strongRegex)) {
		return "";
	} else {
		return translate("validators.charError");
	}
};
export const passwordStringValidator = (password) => {
	let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	if (password.match(strongRegex)) {
		return "";
	} else {
		return translate("validators.fulfillRequirement");
	}
};

export const confirmPasswordValidator = (password, confirmPassword) => {
	if (password !== confirmPassword) translate("validators.confirmPassword");

	return "";
};

export const nameValidator = (name, field = "Name") => {
	if (!name || name.length <= 0) return `${field} ${translate("validators.emptyField")}`;

	return "";
};

export const streetValidator = (street) => {
	if (!street || street.length <= 0) return translate("validators.streetError");

	return "";
};

export const phoneInputValidator = (phone) => {
	const phoneNumber = /^\d{5,10}$/;

	if (!phone || phone.length <= 0) return translate("validators.emptyNumber");
	if (!phoneNumber.test(phone)) return translate("validators.wrongNumber");

	return "";
};