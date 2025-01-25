import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showDetailView, showPreviousCard, showNextCard, addToOutfit } from '../../store/relatedItemsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  const itemCard = useSelector((state) => {
    return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
  })

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems
  })

  return (
    <div>
      <h2>Related Items</h2>
      {relatedItems.map((item) => <RelatedItemCard category = {item.category} name = {item.name} price = {item.default_price}/>)}
      <div>
      <button onClick = {() => {dispatch(showPreviousCard())}}>Show Previous Item</button>
      <button onClick = {() => {dispatch(showNextCard())}}>Show Next Item</button>
      </div>
      <h2>My Outfit</h2>
      <Outfit />
    </div>
  )
}

export default RelatedItems;