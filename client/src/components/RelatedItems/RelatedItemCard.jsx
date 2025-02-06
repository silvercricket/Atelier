import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import Stars from './Stars.jsx'
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails, getRelatedItemURLs, fetchReviews } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles, setCurrentProduct } from '../../store/productsSlice.js';

const RelatedItemCard = ( {item} ) => {

  const [comparisonCard, setComparisonCard] = useState(false);
  const [URL, setURL] = useState('');

  const dispatch = useDispatch();

  //states
  const comparisonFeatures = useSelector((state) => {
    return state.relatedItems.comparisonFeatures
  })

  // const currentProduct = useSelector((state) => {
  //   return state.products.currentProduct
  // })

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const outfit = useSelector((state) => {
    return state.relatedItems.outfit
  })

  const urls = useSelector((state) => {
    return state.relatedItems.relatedItemURLs
  })

  //carousel styling
  const carouselStyle = {
    transform: `translateX(-${currentIndex * 100}%)`
  }

  //event handlers
  const handleAddToOutfit = (event) => {
    if (!outfit.includes(item)) {
      dispatch(addToOutfit(item))
    }
  }

  const handleDetailClick = () => {
    setComparisonCard(!comparisonCard);
  }

  const handleCardClick = () => {
    dispatch(setCurrentProduct(item.id))

    const fetchData = async () => {
      try {
        await dispatch(getProducts());
        await dispatch(getProductDetails());
        await dispatch(getProductStyles());
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();

  }

  return (
    <div className = "relatedItemCard" style = {carouselStyle}>
      <img className = "relatedItemImage" onClick = {handleCardClick} src = {urls[item.id]} ></img>
      <span className = "actionButton" onClick = {handleDetailClick}><i className="fa-regular fa-star"></i></span>
      <div onClick = {handleCardClick}>
        <p>{item.category}</p>
        <h3>{item.name}</h3>
        <div>&nbsp;</div>
        <div>{item.default_price}</div>
        <div><Stars item = {item}/></div>
      </div>
      <button value = {item.name} onClick = {handleAddToOutfit}>Add To Outfit</button>
      {comparisonCard ? <ComparisonCard item = {item}/> : null}
    </div>
  )
}

export default RelatedItemCard;