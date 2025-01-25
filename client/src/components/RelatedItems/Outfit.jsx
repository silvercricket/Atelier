import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOutfit } from '../../store/relatedItemsSlice.js';

const Outfit = () => {

  const dispatch = useDispatch();

  const itemCard = useSelector((state) => {
    return state.relatedItems.relatedItems[state.relatedItems.currentCardIndex]
  })



  const outfit = useSelector((state) => {
    return state.relatedItems.outfit;
  })

  const handleAddOutfit = () => {
    dispatch(addToOutfit(action.payload))
  }
  return (
    <div>
      {outfit.map((item) => <span>{item}</span>)}
      <button value = {itemCard.name} onClick = {handleAddOutfit}>Add To Outfit</button>
    </div>
  )
}

export default Outfit;