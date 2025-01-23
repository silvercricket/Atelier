import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showDetailView, showPreviousCard, showNextCard } from '../../store/relatedItemsSlice.js';

const RelatedItemCard = () => {

  const dispatch = useDispatch();

    const detailView = useSelector((state) => {
      return state.relatedItems.detailView;
    })

    const itemCard = useSelector((state) => {
      return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
    })

  return (
    <div>
      <img></img>
      <div>{itemCard.name}</div>
      <button onClick = {() => {dispatch(showPreviousCard())}}>Show Previous Item</button>
      <button onClick = {() => {dispatch(showNextCard())}}>Show Next Item</button>
      {detailView ? <p>Hello, World</p> : <p>Goodbye, World</p>}
      <button onClick = {() => {dispatch(showDetailView())}}>Toggle Detail View</button>
      <p>Product Name</p>
      <p>$100</p>
      <p>Rating</p>
    </div>
  )
}

export default RelatedItemCard;