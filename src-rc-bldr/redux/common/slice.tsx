import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingStart: state => {
      state.isLoading = true;
    },
    loadingEnd: state => {
      state.isLoading = false;
    },
  },
});

export const {loadingStart, loadingEnd} =
  loadingSlice.actions;

export default loadingSlice.reducer;
