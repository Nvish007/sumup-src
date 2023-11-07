import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoute from '../Navigation/MainRoute';
import NavigationService from '../Navigation/NavigationService';
import { setForegroundMesageHandler, setNotifeeForegroundEvent } from '../utils/fcm';
import messaging from '@react-native-firebase/messaging';

export const navigationRef = React.createRef();

export function navigate(name, params) {
	navigationRef.current?.navigate(name, params);
}

const RootNavigator = () => {

    function getNotificationOnClick() {
		try {
			const handleNavigateToChat = (remoteMessage) => {
				if (remoteMessage) {
					if (Object.keys(remoteMessage.data).length > 0) {
						const data = remoteMessage.data;
						navigationRef.current.dispatch(
							TabActions.jumpTo('Chat', {
								screen: 'UserChat',
								params: {
									messageId: data.messageId,
									uid2: data.uid2,
									fullname: data.fullname,
									credit: data.credit,
									profileImg: data.profileImg,
									notes: data.notes,
									sendUserId: data.sendUserId,
									notification: true
								}
							})
						);
						// setBadgeCount(data.badgeCount);
						// removeNotifications();
					}
				}
			};

			messaging().onNotificationOpenedApp(handleNavigateToChat);
			messaging().getInitialNotification().then(handleNavigateToChat);
		} catch (error) {
			console.info({ checkWhole: error });
		}
	}

    useEffect(() => {
        getNotificationOnClick();
		const unsubscribe = setForegroundMesageHandler();
		const unsubscribeNotifee = setNotifeeForegroundEvent();

        return () => {
			unsubscribe();
			unsubscribeNotifee();
		};
    }, []);

    return (
        <NavigationContainer
            ref={(navigatorRef) => {
                navigationRef.current = navigatorRef;
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}>
            <MainRoute />
        </NavigationContainer>
    );
}

export default RootNavigator;
