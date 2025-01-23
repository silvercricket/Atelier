import { configureStore } from '@reduxjs/toolkit';
import productOverviewReducer from './productOverviewSlice.js'


export const store = configureStore({
  reducer: {
    productOverview: productOverviewReducer
  }
})