import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../../store/ratingsReviewsSlice.js';

const RatingsReviews = () => {

  return (
    <div>
      <h1 className="rrHeader">Ratings & Reviews</h1>
      <div className="ratingsReviews">
        <RatingBreakdown />
        <ReviewList />
      </div>
    </div>
  )
}

import ReviewList from './reviewList.jsx';
import RatingBreakdown from './ratingBreakdown.jsx';

export default RatingsReviews;