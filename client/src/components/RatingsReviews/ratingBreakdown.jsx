import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const RatingBreakdown = () => {
  const dispatch = useDispatch();

  const avgRating = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let sum = 0;
    for (let review of reviews) {
      sum += review.rating;
    }
    let avg = sum / reviews.length;
    return Math.round(avg * 2) / 2;
  })

  const percentRec = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let recommendCount = 0;
    for (let review of reviews) {
      if (review.recommend) {
        recommendCount++;
      }
    }
    return Math.round((recommendCount / reviews.length) * 100);
  })


  return (
    <div>
      <h2>{avgRating}</h2><p>STAR ICONS HERE</p>
      <p>{percentRec}% of reviews reccomend this product</p>
      <p>5 stars</p><progress value="60" max="100"></progress>
      <p>4 stars</p><progress value="20" max="100"></progress>
      <p>3 stars</p><progress value="0" max="100"></progress>
      <p>2 stars</p><progress value="15" max="100"></progress>
      <p>1 stars</p><progress value="5" max="100"></progress>
    </div>

  );
}

export default RatingBreakdown;