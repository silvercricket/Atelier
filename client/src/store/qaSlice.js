import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
}

export const productOverviewSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1
    }
  }
})

export const { increase } = qaSlice.actions;

export default qaSlice.reducer;