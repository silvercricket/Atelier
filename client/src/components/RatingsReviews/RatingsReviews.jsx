import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const RatingsReviews = () => {


  const isOpen = useSelector((state) => {
    return state.newReviewForm.formOpen;
  })

  return (
    <div>
      <h1 className="rrHeader">Ratings & Reviews</h1>
      <div className="ratingsReviews">
        <RatingBreakdown />
        <ReviewList />
        <ProductBreakdown />
        { isOpen ? <NewReviewModal /> : null}
      </div>
    </div>
  )
}

import ReviewList from './reviewList.jsx';
import RatingBreakdown from './ratingBreakdown.jsx';
import ProductBreakdown from './productBreakdown.jsx';
import NewReviewModal from './newReviewModal.jsx';

export default RatingsReviews;