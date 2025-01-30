import React, { useState, useEffect, useId } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails } from '../../store/relatedItemsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  const status = useSelector((state) => {
    return state.relatedItems.status || true
  })

  const error = useSelector((state) => {
    return state.relatedItems.error || null
  })

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems || []
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRelatedItems(40347))
        .then((results) => {
          results.payload.forEach((productId) => {
            dispatch(getRelatedItemDetails(productId))
          })
        })
    }
  }, [])

  return (
    <div className="relatedItems">
      <h2>Related Items</h2>
      <div className="relatedItemsWrapper">
        {/*_____________________________________________________________________FIX ME _____________________________________________________________________ */}
        {/* {relatedItems.map((item, index) => <RelatedItemCard item = {item} key = {useId()}/>)} */}
        {relatedItems.map((item, index) => <RelatedItemCard item={item} key={index} />)}
        {/*_____________________________________________________________________FIX ME _____________________________________________________________________ */}
      </div>
      <h2>Your Outfit</h2>
      <Outfit />
      <br />
      <br />
      <div>
        <button onClick={() => { dispatch(showPreviousCard()) }}>Show Previous Item</button>
        <button onClick={() => { dispatch(showNextCard()) }}>Show Next Item</button>
      </div>
    </div>
  )
}

export default RelatedItems;


// style = {{left: position.x; top: position.y}}