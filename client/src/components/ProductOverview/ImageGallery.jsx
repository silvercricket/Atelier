import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const id = useSelector(state => state.products.currentProduct) || 40347;
  const details = useSelector(state => state.products.productDetails?.[id]);
  const styles = useSelector(state => state.products.productStyles?.[id]?.results) || [];

  // console.log('PRODUCT DETAILS', details)
  // console.log(productStyles)

  return (
    <div className='image-gallery'>
      <div className='thumbnail-images'>

      {/* // TO DO -- map through images here, set selected image */}
      </div>
      <div className='main-image'>
        <img src='https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />

        {/* <button className='previous-button' onClick={() => }></button> */}
        {/* <button className='next-button' onClick={() => }></button> */}
      </div>
      <div>
        <p>
          {details?.description}
        </p>
      </div>
    </div>
  )
};

export default ImageGallery;