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



  // disgusting wet code I can't figure out how to pass in a star value and only make one function :(
    const fiveStar = useSelector((state) => {
      const reviews = state.ratingsReviews.reviews;
      let starCount = 0;
      for (let review of reviews) {
        if (review.rating === 5) {
          starCount++;
        }
      }
      return Math.round((starCount / reviews.length) * 100);
    });

  const fourStar = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 4) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  });

  const threeStar = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 3) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  });

  const twoStar = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 2) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  });

  const oneStar = useSelector((state) => {
    const reviews = state.ratingsReviews.reviews;
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 1) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  });


  return (
    <div>
      <h2>{avgRating}</h2><p>STAR ICONS HERE</p>
      <p>{percentRec}% of reviews reccomend this product</p>
      <p>5 stars</p><progress value={fiveStar} max="100"></progress>
      <p>4 stars</p><progress value={fourStar} max="100"></progress>
      <p>3 stars</p><progress value={threeStar} max="100"></progress>
      <p>2 stars</p><progress value={twoStar} max="100"></progress>
      <p>1 stars</p><progress value={oneStar} max="100"></progress>
    </div>

  );
}

export default RatingBreakdown;