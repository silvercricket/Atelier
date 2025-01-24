import { configureStore } from '@reduxjs/toolkit';
import productOverviewReducer from './productOverviewSlice.js'
import ratingsReviewsReducer from './ratingsReviewsSlice.js'
import productOverviewReducer from './productOverviewSlice.js';
import relatedItemsReducer from './relatedItemsSlice.js';


export const store = configureStore({
  reducer: {
    productOverview: productOverviewReducer,
    ratingsReviews: ratingsReviewsReducer
    relatedItems: relatedItemsReducer
  }
})