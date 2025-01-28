import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../store/productsSlice.js';
import axios from 'axios';

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const id = 40344;

  const products = useSelector(state => state.products);
  const productDetails = useSelector(state => state.products?.productDetails[id]);

  console.log('P', products)

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);


  const handleGetProductDetails = () => {
    dispatch(getProductDetails(id));
  }

  return (
    <div>
      <button onClick={handleGetProductDetails}>Product Details</button>
      {productDetails ? (
        <div>
          <h1>{productDetails.name}</h1>
          <p>{productDetails.description}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;