import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
// import { getProductDetails } from '../../store/productsSlice.js';

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const id = 40344;
  const productDetails = useSelector(state => state.products?.productDetails[id]);

  return (
    <div className='product-details'>
      <div className='reviews-product-details'>
        <span>Read All Reviews</span>
      </div>
      {productDetails ? (
        <div>
          <p>{productDetails.category}</p>
          <h1>{productDetails.name}</h1>
          <p>${productDetails.default_price}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;