import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOutfit } from '../../store/relatedItemsSlice.js';
import OutfitItemCard from './OutfitItemCard.jsx'

const Outfit = () => {

  const dispatch = useDispatch();

  const outfit = useSelector((state) => {
    return state.relatedItems.outfit;
  })

  const handleAddOutfit = () => {
    dispatch(addToOutfit(action.payload))
  }
  return (
    <div>
      <span className = "outfitItemCard">Add to Outfit</span>
      {outfit.map((item) => <OutfitItemCard item = {item}/>)}
    </div>
  )
}

export default Outfit;