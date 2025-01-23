import { configureStore } from '@reduxjs/toolkit';
import productOverviewReducer from './productOverviewSlice.js'
import ratingsReviewsReducer from './ratingsReviewsSlice.js'


export const store = configureStore({
  reducer: {
    productOverview: productOverviewReducer,
    ratingsReviews: ratingsReviewsReducer
  }
})