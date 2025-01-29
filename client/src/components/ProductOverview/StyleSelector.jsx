import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StyleSelector = ({ styles, selectedStyle, setSelectedStyle }) => {


  return (
    <div className='style-section'>
      <p className='style-label'>
        {/* Style - {selectedStyle.name} */}
      </p>
      <div className='style-options'>
        {/* {style.map((style, index) => (
          <div key={index}
            className={`style-option ${selectedStyle.style_id === style.style_id ? 'selected' : ''}`}
            onClick={() => setSelectedStyle(style)}>
            <img src={style.photos[0].thumbnail_url} alt={style.name} />
            {selectedStyle.style_id === style.style_id && <span className="checkmark">✓</span>}
          </div>
        ))} */}
      </div>
    </div>
  );
};


export default StyleSelector;