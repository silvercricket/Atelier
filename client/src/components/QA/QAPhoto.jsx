import React from 'react';
import { useState } from 'react';

import QAModal from './QAModal.jsx';

const QAPhoto = ({ photo }) => {
  const [expandPhoto, setExpandPhoto] = useState(false);

  const handlePhotoClick = () => {
    setExpandPhoto(true);
  }

  return (
    <div className="qa-answer-thumbnail-container">
      {
        expandPhoto && (
          <QAModal closeModalHandler={() => setExpandPhoto(false)}>
            <img className="qa-answer-thumbnail" src={photo} />
          </QAModal>
        )
      }
      <img className="qa-answer-thumbnail" src={photo.replace(/v\d+/, 'c_fill,w_90,h_60')} onClick={handlePhotoClick} />
    </div>
  )
}

export default QAPhoto;