import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../store/productsSlice.js';

const ProductDetails = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products);
  const details = useSelector(state.products.productDetails);

  console.log('P', products)
  console.log('PD', details)

  const handleGetProductDetails = () => {
    dispatch(getProductDetails(id))
  }

  return (
    <div>
    </div>
  )
}

export default ProductDetails;