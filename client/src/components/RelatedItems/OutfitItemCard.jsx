import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OutfitItemCard = ({name}) => {

  return (
    <div className = "outfitItemCard">
      <div>{name}</div>
    </div>
  )
}

export default OutfitItemCard;