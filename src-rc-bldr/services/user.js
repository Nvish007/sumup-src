import firestore from '@react-native-firebase/firestore';
import { getUsersTypeForRoom, isEmpty, userRoomIds } from '../utils/native';
import moment from 'moment';

export default class UserService {
    static setUser = (values) => {
		console.log('values', values);
		return new Promise((resolve, reject) => {
			firestore().collection('users').doc(values.uid).set(values)
				.then(() => {
					resolve(values);
				})
				.catch((error) => {
                    console.log('error user', error);
					reject(new Error(error));
				});
		});
	};

	static updateUser = (values) => {
		return new Promise((resolve, reject) => {
			firestore().collection('users').doc(values.uid).update(values)
				.then(() => {
					resolve(values);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};

    static getUsersByUid = (uid) => {
		console.log({uid});
        return new Promise((resolve, reject) => {
            firestore()
                .collection('users')
                .where('uid', '==', uid)
                .get()
                .then((querySnapshot) => {
					console.log({querySnapshot});
                    if (!querySnapshot.empty) {
                        let data = {};
                        querySnapshot.forEach((doc) => {
                            data = doc.data();
                            data.id = doc.id;
                        });
                        resolve(data);
                    } else {
                        reject(new Error('User not found'));
                    }
                })
                .catch((error) => {
                    reject(new Error(error));
                });
        });
    }

    static getUsers = () => {
		return new Promise((resolve, reject) => {
			firestore()
				.collection('users')
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot.empty) {
						let data = {};
						let temp = [];
						querySnapshot.forEach((doc) => {
							data = doc.data();
							data.id = doc.id;
							temp.push(data);
						});
						// console.warn("getUsers: ", temp);
						resolve(temp);
					}
				})
				.catch((error) => {
					// console.warn('error getUsers: ', error);
					reject(new Error(error));
				});
		});
	}

	static searchedUser = (value, user) => {
		return new Promise(async(resolve, reject) => {
			let users = await this.getUsers();
			console.log('value ?>>>', users);
			let data = [];
			if (value !== '') {
				for(let i = 0; i < users.length; i++) {
					value = value.toLowerCase();
					let email = users[i].email && users[i].email.toLowerCase();
					// let fullname = users[i].fullname && users[i].fullname.toLowerCase();
					let username = users[i].username && users[i].username.toLowerCase();
					// let specificType = user.type === 'guest' && user.type === 'guest' ? users[i].type === 'prime' : users[i].type === 'guest';
					const specificType = user.type === 'prime' && users[i].type === 'prime' ? false : true;
					if (specificType) {
						if (users[i].uid !== user.uid && (email.includes(value) || username.includes(value))) {
							data.push(users[i]);
						} else {
							// if (specificType && users[i]['hashTags']) {
							if (users[i].hashTags) {
								// let hashtags = users[i].hashTags.toLowerCase();
								// hashtags = hashtags.replace(' ', '');
								// let array = hashtags.split('#');
								let hashtags = Array.isArray(users[i].hashTags) ? users[i].hashTags : [];
								if (hashtags.length > 0) {
									hashtags.forEach(element => {
										let temp = false;
										if (element.includes(value) && temp === false) {
											temp = true;
											data.push(users[i]);
										}
									});
								}
							}
						}
					}
				}
				resolve(data);
			} else {
				resolve([]);
			}
		});
	};

	static deleteChatList = (id) => {
		return new Promise((resolve, reject) => {
			firestore().collection('rooms').doc(id).delete()
				.then(() => {
					resolve(true);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	}

	static updateChatList = (values) => {
		return new Promise((resolve, reject) => {
			firestore().collection('rooms').doc(values.documentId).update(values)
				.then(() => {
					resolve(values);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};

	static setMessages = (roomId, values) => {
		console.log('values', values);
		return new Promise((resolve, reject) => {
			firestore().collection('rooms').doc(roomId).collection('messages').doc().set(values)
				.then(() => {
					resolve(true);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};

	static getMessages = (roomId, uid) => {
		return new Promise(async(resolve, reject) => {
			await this.updateMessages(roomId, uid);

			firestore()
				.collection('rooms')
				.doc(roomId)
				.collection('messages')
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot.empty) {
						let data = {}, temp = [];
						querySnapshot.forEach((doc) => {
							data = doc.data();
							data.id = doc.id;
							let message = {
								_id: doc.id,
								createdAt: data.createdAt,
								credit: data.credit,
								read: data.read,
								user: {
									_id: data.userId
								}
							};
							if (!isEmpty(data.image)) {
								message.image = data.image;
							}
							if (!isEmpty(data.text)) {
								message.text = data.text;
							}
							temp.push(message);
						});
						// resolve(data.messages);
						resolve(temp);
					} else {
						resolve([]);
					}
				})
				.catch((error) => {
					console.warn('error getMessages: ', error);
					reject(new Error(error));
				});
		});
	}

	static updateMessages = async(roomId, uid) => {
		await firestore().collection('rooms').doc(roomId).collection('messages').where('userId', '!=', uid).where('read', '==', false).get().then((querySnapshot) => {
			if (!querySnapshot.empty) {
				querySnapshot.forEach((doc) => {
					let document = doc.data();
					if (document.userId !== uid) {
						firestore().collection('rooms').doc(roomId).collection('messages').doc(doc.id).update({ read: true });
					}
					if (querySnapshot.docs.length) {
						return;
					}
				});
			} else {
				return;
			}
		});
	}

	static updatePushToken = (uid, token) => {
		return new Promise((resolve, reject) => {
			firestore().collection('users').doc(uid).update({ token: token, updatedAt: new Date().getTime() })
				.then(() => {
					resolve(true);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};

	static getEarningsById = (id) => {
		return new Promise((resolve, reject) => {
			firestore()
				.collection('rooms')
				.where('primeUserId', '==', id)
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot.empty) {
						let data = {}, total = 0, result = 0;
						let temp = [];
						querySnapshot.forEach(async(doc) => {
							data = doc.data();
							data.id = doc.id;
							temp.push(data);

							await this.getMessagesFromRoomId(data).then((response) => {
								total = total + 1;
								if (total === 1) {
									result = response;
								} else {
									result = {
										today: result.today + response.today,
										week: result.week + response.week,
										month: result.month + response.month,
										total: result.total + response.total,
										pendingBalance: result.pendingBalance + response.pendingBalance
									};
								}
								if (temp.length === total) {
									resolve(result);
								}
							});
						});
					} else {
						// reject(new Error('Earnings not found'));
						let result = {
							today: 0,
							week: 0,
							month: 0,
							total: 0,
						};
						resolve(result);
					}
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	}

	static getMessagesFromRoomId = (temp) => {
		return new Promise(async(resolve, reject) => {
			let today = 0, week = 0, month = 0, total = 0, pendingBalance = 0;

			await firestore().collection('rooms').doc(temp.documentId).collection('messages').get().then((documents) => {
				if (!isEmpty(documents.empty)) {
					documents.forEach((document) => {
						let d = document.data();
						d.id = document.id;
						if (moment(d.createdAt).isSame(moment(), 'date')) {
							today = today + d.credit;
						}
						var startWeek = moment().startOf('week');
						var endWeek = moment().endOf('week');
						var startMonth = moment().startOf('month');
						var endMonth = moment().endOf('month');
						var before14th = moment().subtract(14, 'days');
						// console.log("week:: ", startWeek, endWeek);
						if (moment(d.createdAt).isBetween(startWeek, endWeek)) {
							week = week + +d.credit;
						}
						if (moment(d.createdAt).isBetween(startMonth, endMonth)) {
							month = month + +d.credit;
						}
						if (moment(d.createdAt).isBetween(before14th, moment())) {
							pendingBalance = pendingBalance + +d.credit;
						}
						total = total + +d.credit;
					});
				}
				resolve({ today: today, week: week, month: month, total: total, pendingBalance: pendingBalance });
			}).catch((error) => {
				reject(new Error(error));
			});
		});
	}

	static getHelpDeskMessage = () => {
		return new Promise((resolve, reject) => {
			firestore()
				.collection('helpDesk')
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot.empty) {
						resolve(querySnapshot.docs[0].data());
					} else {
						resolve('');
					}
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	}

	static updateMsgCount = (values) => {
		return new Promise((resolve, reject) => {
			firestore().collection('rooms').doc(values.documentId).update(values)
				.then(() => {
					resolve(values);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};

		// Queries regarding room collection

		static addUserToRoom = (user1, user2) => {
			return new Promise(async(resolve, reject) => {
				const doc = firestore().collection('rooms').doc();
	
				let result = getUsersTypeForRoom(user1, user2);
	
				const data = {
					...result,
					documentId: doc.id,
					// guestUserId: user1.type === 'guest' ? user1.uid : user2.uid,
					// primeUserId: user1.type === 'prime' ? user1.uid : user2.uid,
					credit: 1,
					lastMessage: null,
					updatedAt: moment().valueOf()
				};
				let res = await this.checkUsersInRooms(user1, user2);
				if (res.result === 'exits') {
					// console.info('addUserToRoom err');
					resolve({result: 'path', documentId: res.documentId});
					// reject(new Error('User is already added in chat list'));
				} else {
					doc.set(data).then(() => {
						// resolve(true);
						resolve({result: 'path', documentId: doc.id});
					}).catch((error) => {
						console.info('addUserToRoom err', error);
						reject(new Error(error));
					});
				}
			});
		}
	
		static checkUsersInRooms = (user1, user2) => {
			return new Promise((resolve, reject) => {
				firestore()
					.collection('rooms')
					.get()
					.then((querySnapshot) => {
						if (!querySnapshot.empty) {
							let data = {};
							querySnapshot.forEach((doc) => {
								data = doc.data();
								// if (user1.type === 'prime') {
								// 	if (data.primeUserId === user1.uid && data.guestUserId === user2.uid) {
								// 		resolve({result: 'exits', documentId: data.documentId});
								// 	}
								// } else {
								// 	if (data.primeUserId === user2.uid && data.guestUserId === user1.uid) {
								// 		// resolve('exits');
								// 		resolve({result: 'exits', documentId: data.documentId});
								// 	}
								// }
								if (user1.type === 'prime') {
									let types1 = userRoomIds('prime');
									let types2 = userRoomIds('guest');
									for(let i = 0; i <= 2; i++) {
										for(let j = 0; j <= 2; j++) {
											if ((data[`${types1[i]}`] === user1.uid && data[`${types2[j]}`] === user2.uid) ||
												// (data[`${types2[i]}`] === user1.uid && data[`${types2[j]}`] === user2.uid) ||
												(data[`${types1[i]}`] === user1.uid && data[`${types1[j]}`] === user2.uid)) {
												resolve({result: 'exits', documentId: data.documentId});
											}
										}
									}
								} else {
									let types1 = userRoomIds('guest');
									let types2 = userRoomIds('prime');
									for(let i = 0; i <= 2; i++) {
										for(let j = 0; j <= 2; j++) {
											if ((data[`${types1[i]}`] === user1.uid && data[`${types2[j]}`] === user2.uid) ||
												// (data[`${types2[i]}`] === user1.uid && data[`${types2[j]}`] === user2.uid) ||
												(data[`${types1[i]}`] === user1.uid && data[`${types1[j]}`] === user2.uid)) {
												resolve({result: 'exits', documentId: data.documentId});
											}
										}
									}
								}
							});
							resolve(true);
						} else {
							resolve(true);
						}
					})
					.catch((error) => {
						console.info('checkUsersInRooms err', error);
						reject(new Error(error));
					});
			});
		}	

	static getRoomList = (user, type) => {
		return new Promise((resolve, reject) => {
			const fields = userRoomIds(user.type);
			const query = this.chatQueryForPrime(user, fields);
			query.then((querySnapshot) => {
				let temp = [];
				if (querySnapshot && querySnapshot.length === 0) {
					console.log('here is 1', temp);
					resolve(temp);
				}
				if (!querySnapshot.empty) {
					let count = 0;
					querySnapshot.forEach(async(doc) => {
						let data = doc.data();
						data.msgCount = 0;
						await firestore().collection('rooms').doc(data.documentId).collection('messages').where('read', '==', false).get().then((res) => {
							data.read = 0;
							res.forEach((document) => {
								if (document.data().userId !== user.uid) {
									data.read += 1;
								}
							});
						});
						
						let user2_condition = user.type === 'prime' ?
							(!isEmpty(data.guestUserId) && data.guestUserId) :
							(!isEmpty(data.primeUserId) ? data.primeUserId : !isEmpty(data.guestUserId1) && user.uid !== data.guestUserId1 ? data.guestUserId1 : data.guestUserId2);
						if (user2_condition !== false) {
							await firestore().collection('users').doc(user2_condition).get().then((response) => {
								data.fullname = response.data()?.fullname;
								data.profileImg = response.data()?.profileImg;
								data.uid2 = response.data()?.uid;
								data.userType = response.data()?.type;
								data.username = response.data()?.username;
								temp.push(data);
							});
						} else {
							count += 1;
						}
						if (querySnapshot.length === temp.length || querySnapshot.length === (temp.length + count)) {
							if (type === 'list') {
								temp = temp.filter((obj) => (obj.lastMessage !== null || obj.userLastMessage !== null));
								temp.sort((a, b) => b.updatedAt - a.updatedAt);
								console.log('here is 2', temp);
								resolve(temp);
							}
							if (type === 'search') {
								temp.sort((a, b) => b.updatedAt - a.updatedAt);
								console.log('here is 3', temp);
								resolve(temp);
							}
						}
					});
				} else {
					console.log('here is 4', temp);
					resolve(temp);
				}
			})
				.catch((error) => {
					console.info('error getRoomList: ', error);
					reject(new Error(error));
				});
		});
	}

	static chatQueryForPrime = async(user, fields) => {
		const query1 = firestore()
			.collection('rooms')
			.where(fields[0], '==', user.uid)
			.get();
		const query2 = firestore()
			.collection('rooms')
			.where(fields[1], '==', user.uid)
			.get();
		const query3 = firestore()
			.collection('rooms')
			.where(fields[2], '==', user.uid)
			.get();
		const [query1Snapshot, query2Snapshot, query3Snapshot] = await Promise.all([
			query1, query2, query3
		]);

		const query1Array = query1Snapshot.docs;
		const query2Array = query2Snapshot.docs;
		const query3Array = query3Snapshot.docs;
		const query = query1Array.concat(query2Array).concat(query3Array);
		return query;
	}

	static totalUnreadMsgs = (user) => {
		return new Promise((resolve, reject) => {
			const fields = userRoomIds(user.type);
			const query = this.chatQueryForPrime(user, fields);
			query.then((querySnapshot) => {
				let flag = 0;
				let data = 0;
				if (!querySnapshot.empty) {
					querySnapshot.forEach(async(doc) => {
						await firestore().collection('rooms').doc(doc.data().documentId).collection('messages').where('read', '==', false).get().then((res) => {
							res.forEach((document) => {
								if (document.data().userId !== user.uid) {
									data += 1;
								}
							});
						});
						flag += 1;
						if (querySnapshot.length === flag) {
							resolve(data);
						}
					});
				} else {
					resolve(data);
				}
			})
				.catch((error) => {
					console.info('error totalUnreadMsgs: ', error);
					reject(new Error(error));
				});
		});
	}

	static deleteMessages = async(roomId) => {
		// await firestore().collection('rooms').doc(roomId).collection('messages').get().then((querySnapshot) => {
		// 	if (!querySnapshot.empty) {
		// 		firestore().collection('rooms').doc(roomId).update({ lastMessage: null, userLastMessage: null });
		// 		querySnapshot.forEach((doc) => {
		// 			let document = doc.data();
		// 			document.id = doc.id;
		// 			firestore().collection('rooms').doc(roomId).collection('messages').doc(doc.id).update({ isMsgDeleted: true, read: true });
		// 			if (querySnapshot.docs.length) {
		// 				return;
		// 			}
		// 		});
		// 	} else {
		// 		return;
		// 	}
		// });
		await firestore()
			.collection('rooms')
			.doc(roomId)
			.delete()
			.then(() => {
				console.log('User deleted!');
				return;
			});
	}

	static deleteMessageById = async(roomId, messageId, deletedFrom) => {
		// await firestore().collection('rooms').doc(roomId).collection('messages').doc(messageId).delete();
		const message = await new Promise((resolve, reject) => {
			firestore()
				.collection('rooms')
				.doc(roomId)
				.collection('messages')
				.doc(messageId)
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot.empty) {
						const data = querySnapshot.data();
						if ('deletedFrom' in data === true && data.deletedFrom.length > 0) {
							resolve(data.deletedFrom);
						} else {
							resolve([]);
						}
					}
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
		if (!message.includes(deletedFrom)) {
			await firestore().collection('rooms').doc(roomId).collection('messages').doc(messageId).update({ read: true, deletedFrom: [...message, deletedFrom] });
		}
	};

	static deleteMessageForAllById = async(roomId, messageId) => {
		await firestore().collection('rooms').doc(roomId).collection('messages').doc(messageId).update({ isMsgDeleted: true, read: true });
	}

	static storePaymentRecord = (userId, values) => {
		return new Promise((resolve, reject) => {
			firestore().collection('users').doc(userId).collection('paymentHistory').doc().set(values)
				.then(() => {
					resolve(true);
				})
				.catch((error) => {
					reject(new Error(error));
				});
		});
	};
}