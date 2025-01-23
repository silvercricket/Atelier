import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  reviews : [{
      summary: 'nice bag',
      reviewer_name: 'steve',
      body: 'yeah it is a nice bag'
    },
    {
      summary: 'nice coat',
      reviewer_name: 'robert',
      body: 'yeah it is a nice coat'
    },
    {
      summary: 'horrible shoes',
      reviewer_name: 'ray',
      body: 'they hurt my feet'
    }
  ],
  renderedReviews: []
};

export const ratingsReviewsSlice = createSlice({
  name: 'ratingsReviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews = [...state.reviews, action.payload];
      console.log(state.reviews);
    },
    moreReviews: (state, action) => {

      state.renderedReviews = state.renderedReviews.concat(action.payload);
    }
  }
});

export const { addReview, moreReviews } = ratingsReviewsSlice.actions;

export default ratingsReviewsSlice.reducer;