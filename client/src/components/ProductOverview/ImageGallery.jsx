import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ImageGallery = ({ selectedStyle, setSelectedStyle, selectedImage, setSelectedImage }) => {

  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const id = useSelector(state => state.products.currentProduct) || 40347;
  const details = useSelector(state => state.products.productDetails?.[id]);
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];

  const handlePrevious = (selectedImage) => {
    if (selectedImage > 0) setSelectedImage(selectedImage - 1);
  };

  const handleNext = (selectedImage) => {
    if (selectedImage < selectedStyle?.photos.length - 1) setSelectedImage(selectedImage + 1);
  };

  console.log('PRODUCT STYLES', selectedStyle);
  console.log("PHOTOS: ", selectedImage)

  return (
    <div className='image-gallery'>
      <div className='thumbnail-images'>
        {selectedStyle?.photos.length && selectedStyle?.photos.map((photo, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={photo?.thumbnail_url} alt='style-photo' />
          </div>
        ))}
      </div>
      <div className='main-image'>
        <img src={selectedStyle?.photos?.[selectedImage].url} alt='style-photo-main' />
        {selectedImage > 0 && (
          <button className='previous-button' onClick={() => handlePrevious(selectedImage)}><span><i className="fa-solid fa-arrow-left"></i></span></button>
        )}
        {selectedImage < selectedStyle?.photos.length - 1 && (
          <button className='next-button' onClick={() => handleNext(selectedImage)}><span><i className="fa-solid fa-arrow-right"></i></span></button>
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