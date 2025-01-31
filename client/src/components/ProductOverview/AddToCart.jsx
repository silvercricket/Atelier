import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, postCart, putCart } from '../../store/cartSlice.js';


const AddToCart = ({ selectedStyle, setSelectedStyle, selectedSize, setSelectedSize, quantity, setQuantity }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const id = useSelector(state => state.products.currentProduct) || 40347;
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];


  // const handleGetCart = () => {
  //   dispatch(getCart());
  // };

  const skus = selectedStyle?.skus ?
    Object.entries(selectedStyle.skus).map(([skuId, data]) => ({
      id: skuId,
      size: data.size,
      quantity: data.quantity
    })).filter(item => item.quantity > 0)
    : [];

  const selectedSku = skus.find(sku => sku.size === selectedSize);
  const maxQuantity = selectedSku ? Math.min(selectedSku.quantity, 15) : 0;

  const quantityOptions = [];
  for (let i = 1; i <= maxQuantity; i++) {
    quantityOptions.push(i);
  };

  const handleClick = () => {
    if (selectedSku?.id) dispatch(postCart({ sku_id: selectedSku?.id }));
  };

  return (
    <div className="cart-container">
      <div className="selectors">
        <select
          className="size-selection"
          value={selectedSize}
          disabled={!skus.length}
          onChange={(e) => {
            setSelectedSize(e.target.value);
            setQuantity(1);
          }}
        >
          <option value="">{!skus.length ? "OUT OF STOCK" : 'Select Size'}</option>
          {skus.map(data => (
            <option key={data.id} value={data.size}>
              {data.size}
            </option>
          ))}
        </select>
        <select
          className="quantity-selection"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          disabled={!selectedSize || !skus.length}
        >
          {selectedSize ? (
            quantityOptions.map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))
          ) : (
            <option value="1">-</option>
          )}
        </select>
      </div>
      <div className="add-to-bag">
        <button
          className="add-to-bag-button"
          disabled={!skus.length}
          onClick={handleClick}
        >
          ADD TO BAG
          <span>+</span>
        </button>
        <button className="favorite-button">★</button>
      </div>
    </div>
  );
};

export default AddToCart;