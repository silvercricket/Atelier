import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  characteristics: {},
  error: ''
};

export const fetchChars = createAsyncThunk('productBreakdown/fetchChars', async (_, thunkAPI) => {
  return axios
    .get(`/api/reviews/meta/?product_id=40345`)
    .then((response) => {
      return response.data.characteristics;
    })
})

const productBreakdownSlice = createSlice({
  name: 'productBreakdown',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChars.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchChars.fulfilled, (state, action) => {
      state.loading = false;
      state.characteristics = action.payload;
      state.error = '';
    })
    builder.addCase(fetchChars.rejected, (state, action) => {
      state.loading = false;
      state.characteristics = {};
      state.error = action.error.message;
    })
  }
})

export default productBreakdownSlice.reducer;