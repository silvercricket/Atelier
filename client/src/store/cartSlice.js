import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: []
}

// TO DO -- CREATE ASYNC THUNKS

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state, action) {
      state.cart = action.payload;
    },
    addToCart(state, payload) {
      const { sku_id, count } = action.payload;
      const item = state.find(item => item.sku_id === sku_id);
      if (item) item.count++;
      else state.push({ sku_id, count });
    },
    removeFromCart(state, payload) {
      const { sku_id, count } = action.payload;
      const item = state.find(item => item.sku_id === sku_id);
      if (item) item.count--;
    }
  }
});


export const { loadCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;