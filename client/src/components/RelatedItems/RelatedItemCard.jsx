import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import { showDetailView, showPreviousCard, showNextCard, addToOutfit } from '../../store/relatedItemsSlice.js';

const RelatedItemCard = ( {category, name, price} ) => {

  const dispatch = useDispatch();

  const detailView = useSelector((state) => {
    return state.relatedItems.detailView;
  })

  const itemCard = useSelector((state) => {
    return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
  })

  const [comparisonCard, setComparisonCard] = useState(false);

  const handleDetailClick = (event) => {
    var target = event.target.value;
    // dispatch(showDetailView());
    setComparisonCard(!comparisonCard);
  }

  const handleAddToOutfit = (event) => {
    dispatch(addToOutfit(event.target.value))
  }

  return (
    <div className = "relatedItemCard">
      <img onClick = {handleDetailClick}></img>
      <div onClick = {handleDetailClick}>
        <p>{category}</p>
        <div>{name}</div>
        <div>{price}</div>
        <div>Rating</div>
      </div>
      <span className = "actionButton" onClick ={handleDetailClick}>&#9733;</span>
      <button value = {name} onClick = {handleAddToOutfit}>Add To Outfit</button>
      {comparisonCard ? <ComparisonCard item = {name} price = {price}/> : null}
      {/* <button onClick = {() => {dispatch(showDetailView())}}>Toggle Detail View</button> */}
    </div>
  )
}

export default RelatedItemCard;