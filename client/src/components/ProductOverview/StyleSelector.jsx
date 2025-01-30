import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StyleSelector = () => {

  const id = useSelector(state => state.products.currentProduct) || 40347;
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];
  const status = useSelector(state => state.products.status);

  const [selectedStyle, setSelectedStyle] = useState(styles?.[0]);

  if (status === 'loading') return <div>Loading styles...</div>;
  // if (!styles) return <div>No styles available</div>;


  console.log('STYLES', styles)


  return (
    <div className='style-section'>
      <p className='style-label'>
        <strong>Style -</strong> {selectedStyle?.name}
      </p>
      <div className='style-options'>
        {styles.length && styles.map((style, index) => (
          <div
            key={index}
            className={`style-option ${selectedStyle?.style_id === style?.style_id ? 'selected' : ''}`}
            onClick={(() => setSelectedStyle(style))}
          >
            {selectedStyle.style_id === style.style_id && <span className="checkmark">✓</span>}
            <img
              src={style?.photos[0].thumbnail_url}
              alt={style?.name}
            />
          </div>
        ))}
      </div>
    </div >
  );
};


export default StyleSelector;