import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails } from '../../store/relatedItemsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  const status = useSelector((state) => {
    return state.relatedItems.status
  })

  const error = useSelector((state) => {
    return state.relatedItems.error
  })

  const itemCard = useSelector((state) => {
    return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
  })

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRelatedItems(40350))
      .then((results) => {
        results.payload.forEach((productId) => {
          dispatch(getRelatedItemDetails(productId))
        })
      })
    }
  }, [])

  return (
    <div className = "relatedItems">
      <h2>Related Items</h2>
      <div className = "relatedItemsWrapper">
        {relatedItems.map((item) => <RelatedItemCard item = {item}/>)}
      </div>
      <h2>Your Outfit</h2>
      <Outfit />
      <br />
      <br />
      <div>
          <button onClick = {() => {dispatch(showPreviousCard())}}>Show Previous Item</button>
          <button onClick = {() => {dispatch(showNextCard())}}>Show Next Item</button>
      </div>
    </div>
  )
}

export default RelatedItems;


// style = {{left: position.x; top: position.y}}