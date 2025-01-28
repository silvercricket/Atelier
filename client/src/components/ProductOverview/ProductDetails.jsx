import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../store/productsSlice.js';

const ProductDetails = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const id = 11;

  // TO DO --> TEST PRODUCTS REDUCERS

  const products = useSelector(state => state.products);
  const productDetails = useSelector(state => state.products.productDetails[id]);

  console.log('P', products)
  console.log('PD', productDetails)

  const handleGetProductDetails = () => {
    dispatch(getProductDetails(id))
  }

  return (
    <div>
      <button onClick={handleGetProductDetails}>Product Details</button>
    </div>
  )
}

export default ProductDetails;