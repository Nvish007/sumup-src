import auth from '@react-native-firebase/auth';
// import { deleteToken } from '../utils/fcm';
// import { showAPIErrorAlert } from '../utils/native';

export default class AuthService {
	static login = (email, password) => {
		return auth().signInWithEmailAndPassword(email, password);
	};

	static register = (userDetails) => {
		return auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password);
	};

	static forgetPassword = (email) => {
		return new Promise((resolve) => {
			auth().sendPasswordResetEmail(email).then((res) => {
				resolve(true);
			}).catch(() => {
				resolve(false);
			});
		});
	};

	static logout = () => {
		return new Promise((resolve) => {
			auth().signOut().then(async() => {
				resolve(true);
			}).catch(() => {
				resolve(false);
			});
		});
	};

	static updateEmail = (email, password, newEmail) => {
		return new Promise((resolve) => {
			this.login(email, password).then(() => {
				auth().currentUser.updateEmail(newEmail).then(() => {
					resolve(true);
				}).catch((error) => {
					// showAPIErrorAlert(error);
					resolve('error');
				});
			}).catch((err) => {
				// showAPIErrorAlert(err);
				resolve('error');
			});
		});
	};
}