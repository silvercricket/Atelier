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
  // TO DO --> id state
  // const [id, SetId] = useState()
  // const id = 40347;

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getProductDetails());
    dispatch(getProductStyles());
  }, [dispatch]);

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