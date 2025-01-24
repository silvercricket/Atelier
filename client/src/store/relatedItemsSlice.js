import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  detailView: false,
  relatedItems: [{
    "id": 40344,
    "campus": "hr-rfp",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:38:44.509Z",
    "updated_at": "2021-08-13T14:38:44.509Z"
},
{
    "id": 40345,
    "campus": "hr-rfp",
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69.00",
    "created_at": "2021-08-13T14:38:44.509Z",
    "updated_at": "2021-08-13T14:38:44.509Z"
}],
  currentCardIndex: 0

}

export const relatedItemsSlice = createSlice({
  name: 'relatedItem',
  initialState,
  reducers: {
    showDetailView: (state) => {
      state.detailView = !state.detailView;
    },
    showNextCard: (state) => {
      if (state.currentCardIndex !== state.relatedItems.length - 1) {
        state.currentCardIndex += 1;
      }
    },
    showPreviousCard: (state) => {
      if (state.currentCardIndex !== 0) {
        state.currentCardIndex -= 1;
      }
    }
  }
})

export const { showDetailView, showNextCard, showPreviousCard } = relatedItemsSlice.actions;

export default relatedItemsSlice.reducer;