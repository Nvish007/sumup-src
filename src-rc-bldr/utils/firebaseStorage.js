import storage from '@react-native-firebase/storage';
import moment from 'moment';
import { isEmpty, showAlert } from './native';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

async function getPathForFirebaseStorage(uri) {
	if (Platform.OS === 'ios') {
		return uri;
	}
	const { fs } = RNFetchBlob;

	if (uri.startsWith('content://')) {
		const Blob = RNFetchBlob.polyfill.Blob;
		const mime = 'application/octet-stream';
		return new Promise(async(resolve, reject) => {
			await fs.readFile(uri, 'base64')
				.then((data) => {
					return Blob.build(data, { type: `${mime};BASE64` });
				})
				.then((url) => {
					resolve(url._ref);
				})
				.catch((error) => {
					reject(error);
				});
		});
	} else {
		const stat = await RNFetchBlob.fs.stat(uri);
		return stat.path;
	}
}

export const FirebaseStorageChatImage = async(image, message_id, callback) => {
	const pathToFile = `/chat-media/${message_id}/${moment().valueOf()}`;

	const fileUri = await getPathForFirebaseStorage(image);
	if (!isEmpty(fileUri)) {
		const task = storage().ref(pathToFile).putFile(fileUri);
	
		task.on('state_changed', taskSnapshot => {
			console.info(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
		});
	
		task.then(() => {
			console.info('chat image uploaded');
		});
	
		task.catch((err) => {
			console.info('error on chat image uploading: ', err);
		});
	
		try {
			await task;
			const url = await storage()
				.ref(pathToFile)
				.getDownloadURL();
			callback(pathToFile, url);
		} catch (error) {
			console.info(error, JSON.stringify(error, null, 2));
		}
	} else {
		throw new Error('Video not uploaded');
	}
};
