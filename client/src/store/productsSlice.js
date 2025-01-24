import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: [],
  productDetails: {},
  productStyles: {}
}

// TO DO -- ADD THUNK

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts(state, action) {
      state.list = action.payload;
    },
    loadProductDetails(state, action) {
      state.productDetails = action.payload;
    },
    loadProductStyles(state, action) {
      const { productDetails, styles } = action.payload;
      state.productStyles[productId] = styles;
    }
  }
})

export const { loadProducts, loadProductDetails, loadProductStyles } = productsSlice.actions;

export default productsSlice.reducer;