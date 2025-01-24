import { configureStore } from '@reduxjs/toolkit';
import ratingsReviewsReducer from './ratingsReviewsSlice.js';
import relatedItemsReducer from './relatedItemsSlice.js';
import productsReducer from './productsSlice.js';
import cartReducer from './cartSlice.js';


export const store = configureStore({
  reducer: {
    ratingsReviews: ratingsReviewsReducer,
    relatedItems: relatedItemsReducer,
    products: productsReducer,
    cart: cartReducer,
  }
})