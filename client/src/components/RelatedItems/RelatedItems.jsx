import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedItemCard from './RelatedItemCard.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails, getRelatedItemURLs, clearRelatedItems, clearIndex, getCurrentProductDetails } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles } from '../../store/productsSlice.js';
import Outfit from './Outfit.jsx'
import axios from 'axios';

const RelatedItems = () => {

  const dispatch = useDispatch();

  //states
  const currentProduct = useSelector((state) => {
    return state.products.currentProduct
  })

  const currentProductDetails =  useSelector((state) => {
    return state.relatedItems.currentProductDetails
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

  //carousel styling
  const carouselStyle = {
    transform: `translateX(-${currentIndex * 100}%)`
  }


    useEffect(() => {
      const fetchData = async () => {
        if (currentProduct) {
          dispatch(clearRelatedItems())
          dispatch(clearIndex())
          const { payload: relatedItemIds } = await dispatch(getRelatedItems())
          await dispatch(getCurrentProductDetails(currentProduct))
          // const relatedItemIds = useSelector((state) => {
          //   return state.relatedItems.relatedItemIds
          // })
          console.log(relatedItemIds);
          relatedItemIds.forEach((productId) => {
            dispatch(getRelatedItemDetails(productId))
          })
      }
    }

    fetchData();

    }, [currentProduct]);

  return (
    relatedItems.length > 0 && Object.keys(currentProductDetails).length > 0 ? (
      <div className="relatedItems">
      <h2>Related Items</h2>
      <div className = "relatedItemsWrapper" >
        {relatedItems.map((item, index) => <RelatedItemCard item = {item} key = {index} style = {carouselStyle}/>)}
        {currentIndex === 0 ? null : <button className = "leftButton button" onClick = {() => dispatch(showPreviousCard())}>ᐸ</button>}
        {currentIndex === relatedItems.length - 1 ? null : <button className = "rightButton button" onClick = {() => dispatch(showNextCard())}>ᐳ</button>}
      </div>
      <h2>Your Outfit</h2>
      <Outfit currentProductDetails = {currentProductDetails}/>
    </div>
    ) : (
      <p>Loading...</p>
    )
  )
}

export default RelatedItems;


