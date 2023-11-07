import {createSlice} from '@reduxjs/toolkit';
import {handleLogin} from './index';

const initialState = {
  isLoggedIn: false,
  error: null,
  loadingStatus: 'idle',
  token: '',
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: state => {
      state = initialState;
      return state;
    },
    loginSucess: (state, {payload}) => {
      state.isLoggedIn = true,
      state.user = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(handleLogin.pending, state => {
      state.loadingStatus = 'loading';
      state.error = null;
    });
    builder.addCase(handleLogin.fulfilled, (state, {payload}) => {
      state.token = payload.token;
      state.loadingStatus = 'idle';
      state.error = null;
      state.isLoggedIn = true;
    });
    builder.addCase(handleLogin.rejected, (state, {payload}) => {
      if (payload) {
        state.error = payload.error;
      }
      state.loadingStatus = 'idle';
    });
  },
});

export const {handleLogout, loginSucess} = authSlice.actions;

export default authSlice.reducer;
