import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails, getRelatedItemURLs, clearRelatedItems } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles } from '../../store/productsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  const currentProduct = useSelector((state) => {
    return state.products.currentProduct
  })

  const currentProductDetails =  useSelector((state) => {

  })

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const status = useSelector((state) => {
    return state.relatedItems.status
  })

  const error = useSelector((state) => {
    return state.relatedItems.error
  })

  const relatedItems = useSelector((state) => {
    return state.relatedItems.relatedItems
  })

  const relatedItemIds = useSelector((state) => {
    return state.relatedItems.relatedItemIds
  })

  const url = useSelector((state) => {
    return state.relatedItems.relatedItemURLs
  })

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 100}%)`
  }


    useEffect(() => {
      if (currentProduct) {
        dispatch(clearRelatedItems())
        dispatch(getRelatedItems())

        relatedItemIds.forEach((productId) => {
          dispatch(getRelatedItemDetails(productId))
        })
      }

    }, [currentProduct]);

  return (
    <div className="relatedItems">
      <h2>Related Items</h2>
      <div className = "relatedItemsWrapper" >
        {relatedItems.map((item, index) => <RelatedItemCard item = {item} key = {index} style = {carouselStyle}/>)}
        {currentIndex === 0 ? null : <button className = "leftButton button" onClick = {() => dispatch(showPreviousCard())}>ᐸ</button>}
        {currentIndex === relatedItems.length - 1 ? null : <button className = "rightButton button" onClick = {() => dispatch(showNextCard())}>ᐳ</button>}
      </div>
      <h2>Your Outfit</h2>
      <Outfit item = {}/>
    </div>
  )
}

export default RelatedItems;


// style = {{left: position.x; top: position.y}}