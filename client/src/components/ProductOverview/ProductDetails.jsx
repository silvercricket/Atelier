import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const id = useSelector(state => state.products.currentProduct) || 40347;
  const details = useSelector(state => state.products.productDetails?.[id]);
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];
  const status = useSelector(state => state.products.status);

// console.log('DETAILS', details)

  // if (!details || !styles) return <div>Loading product details...</div>;


  return (
    <div className='product-details'>
      <div className='reviews-product-details'>
        <span>Read All Reviews</span>
      </div>
      {details ? (
        <div>
          <p>{details?.category}</p>
          <h1>{details?.name}</h1>
          <p>${details?.default_price}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;