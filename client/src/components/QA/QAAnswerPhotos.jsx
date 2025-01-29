import React from 'react';

const QAAnswerPhotos = ({ photos }) => {

  return (
    <div className="qa-answer-thumbnails-container">
      {
        photos.map((photo) => {
          return (
            <div className="qa-answer-thumbnail-container">
              <img className="qa-answer-thumbnail" src={photo.url.replace(/v\d+/, 'c_fill,w_90,h_60')} />
            </div>
          )
        })
      }
    </div>
  )
}

export default QAAnswerPhotos;