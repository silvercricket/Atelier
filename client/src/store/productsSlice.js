import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productList: [],
  productDetails: {},
  productStyles: {}
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response = await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products')
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const getProductsDetails = createAsyncThunk('products/getProductsDetails', async (productId) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${productId}`)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const getProductStyles = createAsyncThunk('products/getProductStyles', async (productId) => {
  try {
    const response = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products${productId}/styles`)
    return response.data;
  } catch (err) {
    return err.message;
  }
})


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts(state, action) {
      state.list = action.payload;
    },
    // loadProductDetails(state, action) {
    //   state.productDetails = action.payload;
    // },
    // loadProductStyles(state, action) {
    //   const { productDetails, styles } = action.payload;
    //   state.productStyles[productId] = styles;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productList = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId, ...productDetails } = action.payload;
        state.productDetails[productId] = productDetails;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductStyles.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProductStyles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId, ...getProductStyles } = action.payload;
        state.productStyles[productId] = getProductStyles;
      })
      .addCase(getProductStyles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})

export const { loadProducts } = productsSlice.actions;

export default productsSlice.reducer;