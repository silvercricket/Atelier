import React from 'react';
import { useState } from 'react';

import QAModal from './QAModal.jsx';

const QAPhoto = ({ photo }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);

  const handlePhotoClick = () => {
    console.log('CLICKED')
    expandPhoto(true);
  }

  return (
    <div className="qa-answer-thumbnail-container">
      {
        expandPhoto && (
          <QAModal closeModalHandler={() => setExpandPhoto(false)}>
            <img className="qa-answer-thumbnail" src={photo.url} />
          </QAModal>
        )
      }
      <img className="qa-answer-thumbnail" src={photo.url.replace(/v\d+/, 'c_fill,w_90,h_60')} onClick={handlePhotoClick} />
    </div>
  )
}

export default QAPhoto;