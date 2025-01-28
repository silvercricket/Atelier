import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentProduct: null,
  // productList: [
  //   {
  //     "id": 1,
  //     "name": "Camo Onesie",
  //     "slogan": "Blend in to your crowd",
  //     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  //     "category": "Jackets",
  //     "default_price": "140"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Bright Future Sunglasses",
  //     "slogan": "You've got to wear shades",
  //     "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
  //     "category": "Accessories",
  //     "default_price": "69"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Morning Joggers",
  //     "slogan": "Make yourself a morning person",
  //     "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
  //     "category": "Pants",
  //     "default_price": "40"
  //   },
  // ],
  // productDetails: {
  //   "id": 11,
  //   "name": "Air Minis 250",
  //   "slogan": "Full court support",
  //   "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  //   "category": "Basketball Shoes",
  //   "default_price": "0",
  //   "features": [
  //     {
  //       "feature": "Sole",
  //       "value": "Rubber"
  //     },
  //     {
  //       "feature": "Material",
  //       "value": "FullControlSkin"
  //     },
  //   ],
  // },
  productList: [],
  productDetails: {},
  productStyles: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

export const getProducts = createAsyncThunk('products/getProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/products')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getProductDetails = createAsyncThunk('products/getProductDetails', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});


export const getProductStyles = createAsyncThunk('products/getProductStyles', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/products/${productId}/styles`)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts(state, action) {
      state.list = action.payload;
    },
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
        console.log('API Response:', action.payload);
        const { id, ...productDetails } = action.payload;
        console.log('**ID**', id);
        state.currentProduct = id;
        state.productDetails[id] = productDetails;
        console.log('Updated State:', state);
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
        state.currentProduct = productId;
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