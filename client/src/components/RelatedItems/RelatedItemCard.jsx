import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComparisonCard from './ComparisonCard.jsx';
import { showPreviousCard, showNextCard, addToOutfit, getRelatedItems, getRelatedItemDetails, getRelatedItemURLs } from '../../store/relatedItemsSlice.js';
import { getProducts, getProductDetails, getProductStyles, setCurrentProduct } from '../../store/productsSlice.js';

const RelatedItemCard = ( {item} ) => {

  const dispatch = useDispatch();

  const [comparisonCard, setComparisonCard] = useState(false);
  const [URL, setURL] = useState('');

  const comparisonFeatures = useSelector((state) => {
    return state.relatedItems.comparisonFeatures
  })

  const getComparisonInfo = (currentId, comparisonId) => {
    var comparisonInfo = [];

  }

  const handleDetailClick = () => {
    setComparisonCard(!comparisonCard);

  }

  const currentProduct = useSelector((state) => {
    return state.products.currentProduct
  })

  const currentIndex = useSelector((state) => {
    return state.relatedItems.currentCardIndex
  })

  const outfit = useSelector((state) => {
    return state.relatedItems.outfit
  })

  const carouselStyle = {
    transform: `translateX(-${currentIndex * 100}%)`
  }

  const handleAddToOutfit = (event) => {
    if (!outfit.includes(item)) {
      dispatch(addToOutfit(item))
    }
  }

  const handleCardClick = () => {
    console.log(item.id)
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
        setURL(results.payload)
      })
    }, [])

  return (
    <div className = "relatedItemCard" style = {carouselStyle}>
      <img className = "relatedItemImage" onClick = {handleCardClick} src = {URL} ></img>
      <span className = "actionButton" onClick = {handleDetailClick}><i className="fa-regular fa-star"></i></span>
      <div onClick = {handleCardClick}>
        <p>{item.category}</p>
        <h3>{item.name}</h3>
        <div>&nbsp;</div>
        <div>{item.default_price}</div>
        <div>Rating</div>
      </div>
      <button value = {item.name} onClick = {handleAddToOutfit}>Add To Outfit</button>
      {comparisonCard ? <ComparisonCard item = {item}/> : null}
    </div>
  )
}

export default RelatedItemCard;