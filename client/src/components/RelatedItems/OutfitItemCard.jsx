import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromOutfit } from '../../store/relatedItemsSlice.js';
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails, getRelatedItemURLs } from '../../store/relatedItemsSlice.js';

const OutfitItemCard = ({item}) => {

  const dispatch = useDispatch();

  const outfit = useSelector((state) => state.relatedItems.outfit)

  const handleOutfitAction = () => {

  }

  const [URL, setURL] = useState('')

  const currentOutfitIndex = useSelector((state) => {
    return state.relatedItems.currentOutfitCardIndex;
  })

  const carouselStyle = {
    transform: `translateX(-${currentOutfitIndex * 100}%)`
  }

  useEffect (() => {
    dispatch(getRelatedItemURLs(item.id))
    .then((results) => {
      console.log(results.payload)
      setURL(results.payload)
    })

  }, [outfit])

  return (
    <span className = "outfitItemCard" style = {carouselStyle}>
      <img className = "relatedItemImage" src = {URL}></img>
      <span className = "actionButtonOutfit" onClick = {handleOutfitAction}><i class="fa-solid fa-x"></i></span>
      <div>{item.category}</div>
      <div>{item.name}</div>
      <div>{item.price}</div>
    </span>
  )
}

export default OutfitItemCard;