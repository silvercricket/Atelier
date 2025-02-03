import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  detailView: false,
  relatedItems: [],
  relatedItemIds: [],
  currentCardIndex: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  outfit: [],
  error: null,
  relatedItemDetails: [],
  relatedItemURLs: [],
  currentOutfitCardIndex: 0

}

export const getRelatedItems = createAsyncThunk('products/related', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/products/${productId}/related`)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getRelatedItemDetails = createAsyncThunk('products/related/details', async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message)
    }
})

export const getRelatedItemURLs = createAsyncThunk('products/related/URL', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/products/${productId}/styles`);
    // console.log(response.data.results[0].photos[0].url)
    if (response.data.results[0].photos[0].url === null) {
      return 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';
    } else {
      return response.data.results[0].photos[0].url;
    }
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

// export const fetchAPIData = createAsyncThunk('api/products', async () => {
//   const response = await axios.get('/api/products')
//   console.log(response)
//   // return response.todos
// })

export const relatedItemsSlice = createSlice({
  name: 'relatedItem',
  initialState,
  reducers: {
    showNextCard: (state) => {
      if (state.currentCardIndex !== state.relatedItems.length - 1) {
        state.currentCardIndex += 1;
        // state.currentCardIndex = ((prevIndex) => (prevIndex + 1) % state.relatedItems.length)
      }
    },
    showPreviousCard: (state) => {
      if (state.currentCardIndex !== 0) {
        state.currentCardIndex -= 1;
        // state.currentCardIndex = ((prevIndex) => (prevIndex - 1 + state.relatedItems.length) % state.relatedItems.length);

      }
    },
    addToOutfit: (state, action) => {
      if (!state.outfit.includes(action.payload)) {
        state.outfit = [...state.outfit, action.payload]
      }
    },
    removeFromOutfit: (state, action) => {

    },
    showNextOutfitCard: (state, action) => {
      if (state.currentOutfitCardIndex !== state.outfit.length - 1) {
        state.currentOutfitCardIndex += 1;
        // state.currentCardIndex = ((prevIndex) => (prevIndex + 1) % state.relatedItems.length)
      }
    },
    showPreviousOutfitCard: (state, action) => {
      if (state.currentOutfitCardIndex !== 0) {
        state.currentOutfitCardIndex -= 1;
        // state.currentCardIndex = ((prevIndex) => (prevIndex - 1 + state.relatedItems.length) % state.relatedItems.length);

      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedItems.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getRelatedItems.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.relatedItemIds = action.payload;
      })
      .addCase(getRelatedItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getRelatedItemDetails.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getRelatedItemDetails.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.relatedItemDetails = [...state.relatedItemDetails, action.payload];
        state.relatedItems = [...state.relatedItems, action.payload];
      })
      .addCase(getRelatedItemDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getRelatedItemURLs.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getRelatedItemURLs.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.relatedItemURLs = [...state.relatedItemURLs, action.payload];
      })
      .addCase(getRelatedItemURLs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})

export const { showNextCard, showPreviousCard, addToOutfit } = relatedItemsSlice.actions;

export default relatedItemsSlice.reducer;