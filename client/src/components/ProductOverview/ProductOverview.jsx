import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase } from '../../store/productOverviewSlice.js';

var ProductOverview = () => {

  const dispatch = useDispatch();

  const test = useSelector((state) => {
    return state.productOverview.value;
  })

  return (
    <div>
      <p>{test}</p>
      <button onClick = {() => {dispatch(increase())}}>Press Me</button>
      <p>Hello Hello World</p>
    </div>
  )
}

export default ProductOverview;