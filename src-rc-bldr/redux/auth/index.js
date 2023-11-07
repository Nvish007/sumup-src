import auth from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {callPostAPI} from '../../utils/axios';
import {loadingStart, loadingEnd} from '../common/slice';
import AuthService from '../../services/auth';
import { handleLogout, loginSucess } from './slice';
import { updateToken } from '../../utils/fcm';
import UserService from '../../services/user';

export const handleLogin = createAsyncThunk('login/post', async (params, {rejectWithValue, dispatch}) => {
  dispatch(loadingStart());
  try {
    const response = await callPostAPI({
      route: 'auth/login',
      body: params,
      isAuthenticated: false,
    });
    const data = response.data;
    dispatch(loadingEnd());
    return data;
  } catch (err) {
    const error = err.response.data;
    dispatch(loadingEnd());
    return rejectWithValue(error);
  } finally {
    dispatch(loadingEnd());
  }
});

export const handleSignIn = createAsyncThunk(
  'signIn',
  async (params, {rejectWithValue, dispatch}) => {
    try {
      dispatch(loadingStart());
      const { email, password } = params;
      const res = await auth().signInWithEmailAndPassword(email, password);
      const response = await UserService.getUsersByUid(res.user.uid);
      dispatch(loginSucess(response));
      dispatch(loadingEnd());
    } catch (err) {
      alert('Enter valid Email or Password')
      dispatch(loadingEnd());
      callback(true);
    }
  }
)

export const handleSignUp = createAsyncThunk(
  'signUp',
  async (params, {rejectWithValue, dispatch}) => {
    console.log('params', params);
    try {
      dispatch(loadingStart());
      const { user } = params;
      const res = await auth().createUserWithEmailAndPassword(user.email, user.password);
      console.log('res', res);
      // const response = await UserService.getUsersByUid(res.user._user.uid);
  
      // await updateToken(response.uid);
      // dispatch(logInSuccess(response));
      dispatch(loadingEnd());
      params.response(true, res);
    } catch (error) {
      console.log('error from here', error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized errors here
      }
      // handleSignout();
      dispatch(loadingEnd());
      params.response(false, error);
    }
  }
)

export const handleAuthLogout = createAsyncThunk(
  'logout',
  async (params, {dispatch}) => {
    try {
      dispatch(loadingStart());
      const user = auth().currentUser;
      if (user) {
        const res = await auth().signOut();
      }
      dispatch(handleLogout());
      dispatch(loadingEnd());
    } catch (error) {
      console.log('error', error);
      dispatch(loadingEnd());
    }
  }
)
