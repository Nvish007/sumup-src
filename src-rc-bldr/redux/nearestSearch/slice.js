import {createSlice} from '@reduxjs/toolkit';
import {nearestNearestItems} from './index';

const initialState = {
  nearestNearestItemsInfo: [],
  myCurrentLocation: {}
};

export const nearestNearestItemsSlice = createSlice({
  name: 'nearestNearestItems',
  initialState,
  reducers: {
    saveCurrentLocation: (state, {payload}) => {
      state.myCurrentLocation = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(nearestNearestItems.pending, state => {
      state.error = null;
    });
    builder.addCase(nearestNearestItems.fulfilled, (state, {payload}) => {
      state.nearestNearestItemsInfo = payload.data;
    });
    builder.addCase(nearestNearestItems.rejected, (state, {payload}) => {
      state.error = payload.error;
    });
  },
});

export const {saveCurrentLocation} = nearestNearestItemsSlice.actions;

export default nearestNearestItemsSlice.reducer;
