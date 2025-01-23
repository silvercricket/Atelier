import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
}

export const productOverviewSlice = createSlice({
  name: 'productOverview',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1
    }
  }
})

export const { increase } = productOverviewSlice.actions;

export default productOverviewSlice.reducer;