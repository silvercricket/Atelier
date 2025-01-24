import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../store/ratingsReviewsSlice.js';

const RatingsReviews = () => {

  return (
    <div>
      <div>
        <ReviewList />
      </div>
    </div>
  )
}

import ReviewList from './reviewList.jsx';

export default RatingsReviews;