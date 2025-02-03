import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOutfit, showNextOutfitCard, showPreviousOutfitCard } from '../../store/relatedItemsSlice.js';
import OutfitItemCard from './OutfitItemCard.jsx'

const Outfit = () => {

  const dispatch = useDispatch();

  const outfit = useSelector((state) => {
    return state.relatedItems.outfit;
  })

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentOutfitCardIndex;
  })

  const handleAddOutfit = () => {
    dispatch(addToOutfit(action.payload))
  }

  return (
    <div>
      <div className = "outfitWrapper">
        <span className = "outfitItemCard">Add to Outfit</span>
        {outfit.map((item) => <OutfitItemCard item = {item}/>)}
          {currentIndex === 0 ? null : <button className = "leftButton button" onClick = {() => dispatch(showPreviousOutfitCard())}>ᐸ</button>}
          {currentIndex !== outfit.length - 1 ? null : <button className = "rightButton button" onClick = {() => dispatch(showNextOutfitCard())}>ᐳ</button>}
      </div>
    </div>
  )
}

export default Outfit;