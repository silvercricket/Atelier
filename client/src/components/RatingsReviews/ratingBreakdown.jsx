import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const RatingBreakdown = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => {
    return state.reviews.reviews;
  })

  const avgRating = () => {
    let sum = 0;
    for (let review of reviews) {
      sum += review.rating;
    }
    let avg = sum / reviews.length;
    return Math.round(avg * 2) / 2;
  };

  const percentRec = () => {
    let recommendCount = 0;
    for (let review of reviews) {
      if (review.recommend) {
        recommendCount++;
      }
    }
    return Math.round((recommendCount / reviews.length) * 100);
  };

  // disgusting wet code I can't figure out how to pass in a star value and only make one function :(
  const fiveStar = () => {
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 5) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  };

  const fourStar = () => {
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 4) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  };

  const threeStar = () => {
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 3) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  };

  const twoStar = () => {
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 2) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  };

  const oneStar = () => {
    let starCount = 0;
    for (let review of reviews) {
      if (review.rating === 1) {
        starCount++;
      }
    }
    return Math.round((starCount / reviews.length) * 100);
  };



  const stars = {
    empty: <i className="fa-regular fa-star"></i>,
    half: <i className="fa-regular fa-star-half-stroke"></i>,
    full: <i className="fa-solid fa-star"></i>
  }


  // handle async http requests or empty reviews
  if (!reviews.length) {
    return (
      <div className="ratingBreakdown">
      <h1>No Ratings</h1>
        <div className="rating">
          {stars.empty}
          {stars.empty}
          {stars.empty}
          {stars.empty}
          {stars.empty}
        </div>
        <div className="starBars">
          <p>{percentRec()}% of reviews reccomend this product</p>
          <p>5 stars</p><progress value="0" max="100"></progress>
          <p>4 stars</p><progress value="0" max="100"></progress>
          <p>3 stars</p><progress value="0" max="100"></progress>
          <p>2 stars</p><progress value="0" max="100"></progress>
          <p>1 stars</p><progress value="0" max="100"></progress>
        </div>
    </div>
    );
  }

  // only run function once upon render now that reviews have been fetched and rendered
  const avgStar = avgRating();

  return (
    <div className="ratingBreakdown">
      <h1>{avgStar}</h1>
        <div className="rating">
          {avgStar >= 1 ? stars.full : avgStar >= 0.5 ? stars.half : stars.empty}
          {avgStar >= 2 ? stars.full : avgStar >= 1.5 ? stars.half : stars.empty}
          {avgStar >= 3 ? stars.full : avgStar >= 2.5 ? stars.half : stars.empty}
          {avgStar >= 4 ? stars.full : avgStar >= 3.5 ? stars.half : stars.empty}
          {avgStar >= 5 ? stars.full : avgStar >= 4.5 ? stars.half : stars.empty}
        </div>
        <div className="starBars">
          <p>{percentRec()}% of reviews reccomend this product</p>
          <p>5 stars</p><progress value={fiveStar()} max="100"></progress>
          <p>4 stars</p><progress value={fourStar()} max="100"></progress>
          <p>3 stars</p><progress value={threeStar()} max="100"></progress>
          <p>2 stars</p><progress value={twoStar()} max="100"></progress>
          <p>1 stars</p><progress value={oneStar()} max="100"></progress>
        </div>
    </div>

  );
}

export default RatingBreakdown;