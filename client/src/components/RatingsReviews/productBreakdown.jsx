import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChars } from '../../store/ratingsReviews/productBreakdownSlice.js';

const ProductBreakdown = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChars());
  }, []);

  const characteristics = useSelector((state) => {
    return state.productBreakdown.characteristics;
  })

  if (!Object.keys(characteristics).length) {
    return <div>LOADING...</div>
  }

  const breakdowns = Object.keys(characteristics).map((char) => {
    const rating = Math.round(characteristics[char].value * 10) / 10;
    const position = Math.round((rating / 5) * 100) + '%';
    console.log('rating: ', rating, 'position: ', position);
    return (
      <div className="rating-container">
        <span>{char}: {rating}/5</span>
        <div className="slider">
          <div className="slider-track">
            <div className="slider-thumb" style={{left: position}}></div>
          </div>
        </div>
      </div>
    )
  })



  return (
    <div className="productBreakdown">{breakdowns}</div>
  );
}

export default ProductBreakdown;