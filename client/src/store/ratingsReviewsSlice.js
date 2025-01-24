import { createSlice } from '@reduxjs/toolkit';

const exampleData = [
  {
    "review_id": 5,
    "rating": 3,
    "summary": "I'm enjoying wearing these shades",
    "recommend": false,
    "response": null,
    "body": "Comfortable and practical.",
    "date": "2019-04-14T00:00:00.000Z",
    "reviewer_name": "shortandsweeet",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      }
    ]
  },
  {
    "review_id": 3,
    "rating": 4,
    "summary": "I am liking these glasses",
    "recommend": false,
    "response": "Glad you're enjoying the product!",
    "body": "They are very dark. But that's good because I'm in very sunny spots",
    "date": "2019-06-23T00:00:00.000Z",
    "reviewer_name": "bigbrotherbenjamin",
    "helpfulness": 5,
    "photos": [],
  },
  {
    "review_id": 4,
    "rating": 4,
    "summary": "I am liking these pants",
    "recommend": true,
    "response": "Glad you're enjoying the product!",
    "body": "They are very dark. like my soul",
    "date": "2019-06-23T00:00:00.000Z",
    "reviewer_name": "bwork22",
    "helpfulness": 5,
    "photos": [],
  }
]


const initialState = {
  reviews : exampleData,
  renderedReviews: exampleData.slice(0, 2)
};

export const ratingsReviewsSlice = createSlice({
  name: 'ratingsReviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews = [...state.reviews, action.payload];
      console.log(state.reviews);
    },
    moreReviews: (state, action) => {

      state.renderedReviews = state.renderedReviews.concat(action.payload);
    }
  }
});

export const { addReview, moreReviews } = ratingsReviewsSlice.actions;

export default ratingsReviewsSlice.reducer;