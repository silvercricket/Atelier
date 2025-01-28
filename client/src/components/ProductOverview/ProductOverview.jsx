import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ImageGallery from './ImageGallery.jsx';
import ProductDetails from './ProductDetails.jsx';
import AddToCart from './AddToCart.jsx';
import StyleSelector from './StyleSelector.jsx';
import { getProducts, getProductDetails, getProductStyles } from '../../store/productsSlice.js';

import './ProductOverview.css';



const ProductOverview = () => {
  const dispatch = useDispatch();
  const id = 40344;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductDetails(id));
    dispatch(getProductStyles(id));
  }, [dispatch, id]);


  return (
    <div className='product-container'>
      <ImageGallery />
      <ProductDetails />
      <StyleSelector />
      <AddToCart />
    </div>
  )
}

export default ProductOverview;