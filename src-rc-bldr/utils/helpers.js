import {Platform, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';

export const getCurrentLocation = async () => {
  if (Platform.OS !== 'ios') {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            resolve({latitude, longitude});
          },
          e => {
            const error = new Error();
            error.code = 'location';
            error.message = e.message;
            reject(error);
          },
        );
      });
    }
  } else {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization('whenInUse');
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude});
        },
        e => {
          const error = new Error();
          error.code = 'location';
          error.message = e.message;
          reject(error);
        },
      );
    });
  }
};

export function isIOS() {
  return Platform.OS === 'ios';
}

export function calculateDistanceAndTime(location1, location2) {
  const distanceInMeters = getDistance(location1, location2);
  const speedInMetersPerSecond = 40;
  const timeInSeconds = distanceInMeters / speedInMetersPerSecond;
  return {
    distanceInMeters,
    timeInSeconds,
  };
}

export function fullNameOfLanguage(code) {
   if(code == 'nl'){
    return 'Nederlands'
   } else if (code == 'fr') {
    return 'Frans'
   } else if (code == 'en') {
    return 'Engels'
   } else if (code == 'pl') {
    return 'Pools'
   } else if (code == 'de') {
    return 'Duits'
   } else if (code == 'ro') {
    return 'Roemeens'
   } else if (code == 'bg') {
    return 'Bulgaars'
   } else if (code == 'ua') {
    return 'Oekraïns'
   } else if (code == 'pt') {
    return 'Portugees'
   } else if (code == 'es') {
    return 'Spaans'
   }  else if (code == 'tr') {
    return 'Turks'
   }  else if (code == 'ma') {
    return 'Marokaans'
   }
}
