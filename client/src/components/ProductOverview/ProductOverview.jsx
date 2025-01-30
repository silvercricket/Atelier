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
  const status = useSelector(state => state.products?.status);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProducts());
        await dispatch(getProductDetails());
        await dispatch(getProductStyles());
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    if (status === 'idle') fetchData();
  }, [dispatch, status]);


  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

return (
  <div className='product-container'>
    <div className='left-column'>
      <ImageGallery />
    </div>
    <div className='right-column'>
      <ProductDetails />
      <StyleSelector />
      <AddToCart />
    </div>
  </div>
)
}

export default ProductOverview;