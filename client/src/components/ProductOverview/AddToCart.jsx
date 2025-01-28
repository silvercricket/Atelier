import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, postCart, putCart } from '../../store/cartSlice.js';


const AddToCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  // console.log('CART', cart);


  const handleGetCart = () => {
    dispatch(getCart());
  }


  return (
    <div>
      {/* <button onClick={handleGetCart}>Get Cart</button> */}
    </div>
  )
}

export default AddToCart;