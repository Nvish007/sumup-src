import {createAsyncThunk} from '@reduxjs/toolkit';
import {callGetAPI} from '../../utils/axios';
import {loadingStart, loadingEnd} from '../common/slice';

export const nearestNearestItems = createAsyncThunk('nearestnearestitems/get', async (params, {rejectWithValue, dispatch}) => {
  dispatch(loadingStart());
  try {
    const response = await callGetAPI({
      route: `nearest/items?latitude=${params?.latitude}&longitude=${params?.longitude}`,
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
