import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItemURLs } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles, setCurrentProduct } from '../../store/productsSlice.js';

const RelatedItemCard = ( {item} ) => {

  const dispatch = useDispatch();

  const [comparisonCard, setComparisonCard] = useState(false);
  const [URL, setURL] = useState('');

  const handleDetailClick = (event) => {
    setComparisonCard(!comparisonCard);

    //instead of showing comparison card, will update state for product overview to be id for that specific item
  }

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 60}%)`
  }

  const handleAddToOutfit = (event) => {
    var outfit = {
      category: item.category,
      name: event.target.value,
      price: item.default_price
    }
    dispatch(addToOutfit(outfit))
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

   useEffect(() => {
    dispatch(getRelatedItemURLs(item.id))
      .then((results) => {
        console.log(results)
        setURL(results.payload)
      })
    }, [])

  return (
    <div className = "relatedItemCard" style = {carouselStyle}>
      <img className = "relatedItemImage" onClick = {handleCardClick} src = {URL}></img>
      <span className = "actionButton" onClick = {handleDetailClick}><i className="fa-regular fa-star"></i></span>
      <div onClick = {handleCardClick}>
        <p>{item.category}</p>
        <div>{item.name}</div>
        <div>{item.default_price}</div>
        <div>Rating</div>
      </div>
      <button value = {item.name} onClick = {handleAddToOutfit}>Add To Outfit</button>
      {comparisonCard ? <ComparisonCard item = {item.name} price = {item.default_price}/> : null}
    </div>
  )
}

export default RelatedItemCard;