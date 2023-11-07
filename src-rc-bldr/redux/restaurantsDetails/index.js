import {createAsyncThunk} from '@reduxjs/toolkit';
import {callGetAPI} from '../../utils/axios';
import {loadingStart, loadingEnd} from '../common/slice';

export const restaurantTypes = createAsyncThunk('restauranttypes/get', async (params, {rejectWithValue, dispatch}) => {
  dispatch(loadingStart());
  try {
    const response = await callGetAPI({
      route: 'get/tags?category_id=1',
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

export const restaurantTag = createAsyncThunk('restauranttag/get', async (params, {rejectWithValue, dispatch}) => {
  dispatch(loadingStart());
  try {
    const response = await callGetAPI({
      route: `get/items?tag_id=${params?.tag_id}`,
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
