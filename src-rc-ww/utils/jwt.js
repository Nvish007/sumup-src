import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export const checkTokenExpiration = (token) => {
	const { exp = 0 } = jwtDecode(token);
	const expirationDate = dayjs(exp * 1000);
	const todayDate = dayjs();
	const hourDifference = expirationDate.diff(todayDate, "hour");
	if (hourDifference < 4) {
		return true;
	} else {
		return false;
	}
};