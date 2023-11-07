import {createSlice} from '@reduxjs/toolkit';
import {restaurantTypes, restaurantTag} from './index';

const initialState = {
  restaurantTypesInfo: [],
  restaurantTagInfo: []
};

export const restaurantTypesSlice = createSlice({
  name: 'restaurantTypes',
  initialState,
  extraReducers: builder => {
    builder.addCase(restaurantTypes.pending, state => {
      state.error = null;
    });
    builder.addCase(restaurantTypes.fulfilled, (state, {payload}) => {
      state.restaurantTypesInfo = payload.data;
    });
    builder.addCase(restaurantTypes.rejected, (state, {payload}) => {
      state.error = payload.error;
    });

    builder.addCase(restaurantTag.pending, state => {
      state.error = null;
    });
    builder.addCase(restaurantTag.fulfilled, (state, {payload}) => {
      state.restaurantTagInfo = payload.data;
    });
    builder.addCase(restaurantTag.rejected, (state, {payload}) => {
      state.error = payload.error;
    });
  },
});

export default restaurantTypesSlice.reducer;
