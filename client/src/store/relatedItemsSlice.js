import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentTestItem = {
  "id": 40344,
  "campus": "hr-rfp",
  "name": "Camo Onesie",
  "slogan": "Blend in to your crowd",
  "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
  "category": "Jackets",
  "default_price": "140.00",
  "created_at": "2021-08-13T14:38:44.509Z",
  "updated_at": "2021-08-13T14:38:44.509Z"
}

const relatedItemIds = [
  40345,
  40346,
  40351,
  40350
];

const testDataRelatedItems = [
  {
    "id": 40345,
    "campus": "hr-rfp",
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69.00",
    "created_at": "2021-08-13T14:38:44.509Z",
    "updated_at": "2021-08-13T14:38:44.509Z",
    "features": [
        {
            "feature": "Lenses",
            "value": "Ultrasheen"
        },
        {
            "feature": "UV Protection",
            "value": null
        },
        {
            "feature": "Frames",
            "value": "LightCompose"
        }
    ]
},
{
  "id": 40346,
  "campus": "hr-rfp",
  "name": "Morning Joggers",
  "slogan": "Make yourself a morning person",
  "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
  "category": "Pants",
  "default_price": "40.00",
  "created_at": "2021-08-13T14:38:44.509Z",
  "updated_at": "2021-08-13T14:38:44.509Z",
  "features": [
      {
          "feature": "Fabric",
          "value": "100% Cotton"
      },
      {
          "feature": "Cut",
          "value": "Skinny"
      }
  ]
},
{
  "id": 40351,
  "campus": "hr-rfp",
  "name": "YEasy 350",
  "slogan": "Just jumped over jumpman",
  "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
  "category": "Kicks",
  "default_price": "450.00",
  "created_at": "2021-08-13T14:38:44.509Z",
  "updated_at": "2021-08-13T14:38:44.509Z",
  "features": [
      {
          "feature": "Sole",
          "value": "Rubber"
      },
      {
          "feature": "Material",
          "value": "FullControlSkin"
      },
      {
          "feature": "Stitching",
          "value": "Double Stitch"
      }
  ]
},
{
  "id": 40350,
  "campus": "hr-rfp",
  "name": "Blues Suede Shoes",
  "slogan": "2019 Stanley Cup Limited Edition",
  "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
  "category": "Dress Shoes",
  "default_price": "120.00",
  "created_at": "2021-08-13T14:38:44.509Z",
  "updated_at": "2021-08-13T14:38:44.509Z",
  "features": [
      {
          "feature": "Sole",
          "value": "Rubber"
      },
      {
          "feature": "Material",
          "value": "FullControlSkin"
      },
      {
          "feature": "Stitching",
          "value": "Double Stitch"
      }
  ]
}
]

const initialState = {
  detailView: false,
  relatedItems: [],
  relatedItemIds: [],
  currentCardIndex: 0,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  outfit: [],
  error: null,
  relatedItemDetails: []

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
      }
    },
    showPreviousCard: (state) => {
      if (state.currentCardIndex !== 0) {
        state.currentCardIndex -= 1;
      }
    },
    addToOutfit: (state, action) => {
      if (!state.outfit.includes(action.payload)) {
        console.log(action.payload)
        state.outfit = [...state.outfit, action.payload]
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
  }
})

export const { showNextCard, showPreviousCard, addToOutfit } = relatedItemsSlice.actions;

export default relatedItemsSlice.reducer;