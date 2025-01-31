import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import { showPreviousCard, showNextCard, addToOutfit } from '../../store/relatedItemsSlice.js';


const RelatedItemCard = ( {item} ) => {

  const dispatch = useDispatch();

  const [comparisonCard, setComparisonCard] = useState(false);

  const handleDetailClick = (event) => {
    setComparisonCard(!comparisonCard);

    //instead of showing comparison card, will update state for product overview to be id for that specific item
  }

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 60}%)`
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
    <div className = "relatedItemCard" style = {carouselStyle} onClick = {handleDetailClick}>
      <span className = "actionButton" onClick ={handleDetailClick}>&#9733;</span>
      <img onClick = {handleDetailClick} src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVceWgOp0vbYOrWbYXhMOxiEUv76XWGB_7OA&s"></img>
      <div >
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