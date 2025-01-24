import { configureStore } from '@reduxjs/toolkit';
import productOverviewReducer from './productOverviewSlice.js';
import ratingsReviewsReducer from './ratingsReviewsSlice.js';
import relatedItemsReducer from './relatedItemsSlice.js';
import qaReducer from './qaSlice.js';


export const store = configureStore({
  reducer: {
    productOverview: productOverviewReducer,
    ratingsReviews: ratingsReviewsReducer,
    relatedItems: relatedItemsReducer,
    qa: qaReducer
  }
})