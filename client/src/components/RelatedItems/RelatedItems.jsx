import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems
  })

  return (
    <div>
      {/* <RelatedItemCard /> */}
      {relatedItems.map((item) => <RelatedItemCard name = {item.name} />)}
      <Outfit />
    </div>
  )
}

export default RelatedItems;