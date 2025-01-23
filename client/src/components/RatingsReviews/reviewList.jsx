import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moreReviews } from '../../store/ratingsReviewsSlice.js';

const ReviewList = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => {
    return state.ratingsReviews.reviews;
  });

  const renderedReviews = useSelector((state) => {
    return state.ratingsReviews.renderedReviews;
  })

  let reviewCards = renderedReviews.map((review) => {
    return (
      <div>
        <h3>{review.reviewer_name}</h3>
        <p>Summary: {review.summary}</p>
        <p>Review: {review.body}</p>
      </div>
    );
  })



  const handleMoreReviews = () => {
    let start = renderedReviews.length;
    let reviewsToAdd = reviews.slice(start, start + 2);
    dispatch(moreReviews(reviewsToAdd));
  }

  return (
    <div>
      <h1>Ratings & Reviews</h1>
      <div>Rating Breakdown goes here</div>
      <div>Product Breakdown goes here</div>
      <h3>{reviews.length} reviews, sorted by FIX_ME</h3>
      {reviewCards}
      <button onClick={handleMoreReviews}>MORE REVIEWS</button><button>ADD A REVIEW +</button>
    </div>
  );
}

export default ReviewList;