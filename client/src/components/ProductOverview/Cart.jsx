import React, { useState, useEffect } from 'react';
import { getCart } from '../../store/cartSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);


  // console.log('CART', cart)

  const handleCart = () => {
    dispatch(getCart());
  }

  // useEffect(() => {
  //   dispatch(getCart());
  // }, [])


  return (
    <div className='cart'>
      <button>handleCart</button>
    </div>
  );
}


export default Cart;