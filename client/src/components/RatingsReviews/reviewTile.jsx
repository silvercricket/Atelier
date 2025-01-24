import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ReviewTile = ({review}) => {

  const stars = {
    empty: <i className="fa-regular fa-star"></i>,
    half: <i className="fa-regular fa-star-half-stroke"></i>,
    full: <i className="fa-solid fa-star"></i>
  }

  return (
    <div className="reviewTile">
      <h3>{review.reviewer_name}</h3>
      <div>
        {review.rating >= 1 ? stars.full : review.rating >= 0.5 ? stars.half : stars.empty}
        {review.rating >= 2 ? stars.full : review.rating >= 1.5 ? stars.half : stars.empty}
        {review.rating >= 3 ? stars.full : review.rating >= 2.5 ? stars.half : stars.empty}
        {review.rating >= 4 ? stars.full : review.rating >= 3.5 ? stars.half : stars.empty}
        {review.rating >= 5 ? stars.full : review.rating >= 4.5 ? stars.half : stars.empty}
      </div>
      <p>month, DD, YYYY</p>
      <strong>Summary: {review.summary}</strong>
      <p>Review: {review.body}</p>
      {review.recommend ? <p>I recommend this product  ✅ </p> : null}
      <p>seller response here eventually</p>
      <p>Was this review helpful?</p>
      <button>Yes - not functional</button><button>No - not functional</button>

    </div>
  );

}

export default ReviewTile;