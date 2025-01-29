import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import { showPreviousCard, showNextCard, addToOutfit } from '../../store/relatedItemsSlice.js';

const RelatedItemCard = ( {item} ) => {

  const dispatch = useDispatch();

  const [comparisonCard, setComparisonCard] = useState(false);

  const handleDetailClick = (event) => {
    setComparisonCard(!comparisonCard);
  }

  const handleAddToOutfit = (event) => {
    var outfit = {
      category: item.category,
      name: event.target.value,
      price: item.default_price
    }
    dispatch(addToOutfit(outfit))
  }

  return (
    <div className = "relatedItemCard">
      <span className = "actionButton" onClick ={handleDetailClick}>&#9733;</span>
      <img onClick = {handleDetailClick}></img>
      <div onClick = {handleDetailClick}>
        <p>{item.category}</p>
        <div>{item.name}</div>
        <div>{item.default_price}</div>
        <div>Rating</div>
      </div>
      <button value = {item.name} onClick = {handleAddToOutfit}>Add To Outfit</button>
      {comparisonCard ? <ComparisonCard item = {item.name} price = {item.default_price}/> : null}
    </div>
  )
}

export default RelatedItemCard;