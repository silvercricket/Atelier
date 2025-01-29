import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import QANotification from './QANotification.jsx';

const QAPhotoUploader = ({ formData, setFormData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFileInputChange = (e) => {
    setIsError(false);
    setIsUploading(true);
    const photo = (e.target.files[0]);
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'hr_fec');

    axios.post('https://api.cloudinary.com/v1_1/dmbs2shkd/image/upload', formData)
    .then((result) => {
      setFormData((prev) => {
        return {
          ...prev,
          photos: [...prev.photos, result.data.secure_url],
          thumbnails: [...prev.thumbnails, `https://res.cloudinary.com/dmbs2shkd/image/upload/c_fill,w_100,h_100/${result.data.public_id}.jpg`]
        }
      })
      setIsUploading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsUploading(false);
      setIsError(true);
    })
  }

  return (
    <div className="qa-photo-uploader-container">
      {
        isUploading && (
          <QANotification type="loading" msg="Uploading your photo. Please wait..." />
        )
      }

      { (!isUploading && formData.photos.length < 5) && (
          <label>Upload a photo <span>(You can attach up to 5 photos)</span>
            <input type="file" accept="image/*" onChange={handleFileInputChange} />
          </label>
        )
      }

      {
        formData.photos.length === 5 && (
          <QANotification type="notification" msg="You have attached maximum number of photos." />
        )
      }

      {
        isError && (
          <QANotification type="error" msg="Image upload failed. Please try again." />
        )
      }

      {
        formData.photos.length > 0 && (
        <div className="qa-photo-uploader-thumbnails-container">
          { formData.thumbnails.map((thumbnailUrl) => <img src={thumbnailUrl} key={uuidv4()} />) }
        </div>
        )
      }
    </div>
  )
};

export default QAPhotoUploader;