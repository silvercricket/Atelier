import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, postCart, putCart } from '../../store/cartSlice.js';


const AddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);


  const handleGetCart = () => {
    dispatch(getCart());
  }


  return (
    <div className="add-to-cart">
      <div className="selectors">
      </div>
      <div className="add-to-bag">
        <button className="add-to-bag-button">
          ADD TO BAG
          <span>+</span>
        </button>
        <button className="favorite-button">★</button>
      </div>
    </div>
  );
};

export default AddToCart;