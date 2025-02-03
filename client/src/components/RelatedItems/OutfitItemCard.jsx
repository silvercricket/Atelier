import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromOutfit } from '../../store/relatedItemsSlice.js';

const OutfitItemCard = ({item}) => {

  const handleOutfitAction = () => {

  }

  return (
    <span className = "outfitItemCard">
      <span className = "actionButtonOutfit" onClick = {handleOutfitAction}>&times;</span>
      <div>{item.category}</div>
      <div>{item.name}</div>
      <div>{item.price}</div>
    </span>
  )
}

export default OutfitItemCard;