import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favouriteItems: [],
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      state.favouriteItems = [...state.favouriteItems, action.payload];
    },
    removeFromFavourite: (state, action) => {
      let allItems = state.favouriteItems;
      allItems.splice(action.payload, 1)
      state.favouriteItems = allItems;
    },
  },
});

export const {addToFavourite, removeFromFavourite} =
favouriteSlice.actions;

export default favouriteSlice.reducer;
