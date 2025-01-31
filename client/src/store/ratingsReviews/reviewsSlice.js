import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  reviews: [],
  renderedReviews: [],
  error: ''
};

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (_, thunkAPI) => {
  const product_id = thunkAPI.getState().products.currentProduct
  return axios
    .get(`/api/reviews/?product_id=${product_id}`)
    .then((response) => {
      return response.data.results;
    })
})

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    moreReviews:  (state, action) => {
      state.renderedReviews = state.renderedReviews.concat(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.renderedReviews = action.payload.slice(0, 2);
      state.error = '';
    })
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.reviews = [];
      state.renderedReviews = [];
      state.error = action.error.message;
    })
  }
})

export const { moreReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;


