import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ImageGallery = ({ selectedStyle, setSelectedStyle, selectedImageIndex, setSelectedImageIndex }) => {

  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const id = useSelector(state => state.products.currentProduct) || 40347;
  const details = useSelector(state => state.products.productDetails?.[id]);
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];

  const handlePrevious = (selectedImageIndex) => {
    if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
  };

  const handleNext = (selectedImageIndex) => {
    if (selectedImageIndex < selectedStyle?.photos.length - 1) setSelectedImageIndex(selectedImageIndex + 1);
  };

  // console.log('PRODUCT STYLES', styles);
  // console.log("PHOTOS: ", selectedStyle?.photos)

  return (
    <div className='image-gallery'>
      <div className='thumbnail-images'>
        {selectedStyle?.photos.length && selectedStyle?.photos.map((photo, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImageIndex === index ? 'selected' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={photo?.thumbnail_url} alt='style-photo' />
          </div>
        ))}
      </div>
      <div className='main-image'>
        <img src={selectedStyle?.photos?.[selectedImageIndex].url} alt='style-photo-main' />
        {selectedImageIndex > 0 && (
          <button className='previous-button' onClick={() => handlePrevious(selectedImageIndex)}><span><i className="fa-solid fa-arrow-left"></i></span></button>
        )}
        {selectedImageIndex < selectedStyle?.photos.length - 1 && (
          <button className='next-button' onClick={() => handleNext(selectedImageIndex)}><span><i className="fa-solid fa-arrow-right"></i></span></button>
        )}
      </div>
      <div>
        <strong>
          <p>
            {details?.slogan}
          </p>
        </strong>
        <p>
          {details?.description}
        </p>
      </div>
    </div >
  )
};

export default ImageGallery;