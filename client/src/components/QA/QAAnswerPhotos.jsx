import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import QAPhoto from './QAPhoto.jsx';

const QAAnswerPhotos = ({ photos }) => {

  return (
    <div className="qa-answer-thumbnails-container">
      {
        photos.map((photo) => {
          return (
            <QAPhoto photo={photo} key={uuidv4()} />
          )
        })
      }
    </div>
  )
}

export default QAAnswerPhotos;