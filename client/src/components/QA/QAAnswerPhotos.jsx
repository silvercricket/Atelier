import React from 'react';

const QAAnswerPhotos = ({ photos }) => {
  return (
    <div className="qa-answer-thumbnails-container">
      {
        photos.map((photo) => {
          return (
            <div className="qa-answer-thumbnail-container">
              <img className="qa-answer-thumbnail" src={photo} />
            </div>
          )
        })
      }
    </div>
  )
}

export default QAAnswerPhotos;