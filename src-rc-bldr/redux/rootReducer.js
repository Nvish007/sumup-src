import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import auth from './auth/slice';
import loadingSlice from './common/slice';
import restaurantTypesSlice from './restaurantsDetails/slice';
import nearestNearestItemsSlice from './nearestSearch/slice';
import favouriteSlice from './favourite/slice';
import chatSlice from './chat/slice';

const authPersistConfig = {
  key: 'auth',
  whitelist: ['isLoggedIn', 'user'],
  storage: AsyncStorage,
};

const favouritePersistConfig = {
  key: 'favourite',
  whitelist: ['favouriteItems'],
  storage: AsyncStorage,
};

// const chatPersistConfig = {
//   key: 'chat',
//   whitelist: ['chatList'],
//   storage: AsyncStorage,
// };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  loading: loadingSlice,
  restaurantTypes: restaurantTypesSlice,
  nearestNearestItems: nearestNearestItemsSlice,
  favourite: persistReducer(favouritePersistConfig, favouriteSlice),
  chat: chatSlice,
});

export default rootReducer;

