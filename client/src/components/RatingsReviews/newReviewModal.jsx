import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isFormOpen } from '../../store/ratingsReviews/newReviewFormSlice.js';

const NewReviewModal = () => {
  const dispatch = useDispatch();
  const { useState } = React;

  const [ rating, setRating ] = useState(0);
  const [ summary, setSummary ] = useState('');
  const [ body, setBody ] = useState('');
  const [ reviewer, setReviewer ] = useState('');
  const [ recommend, setRecommend ] = useState(null);
  const [ email, setEmail ] = useState('');


  // Toggle Modal Window
  const isOpen = useSelector((state) => {
    return state.newReviewForm.formOpen;
  })


  // Handlers for form data setting state
  const handleRating = (e) => {
    e.preventDefault();
    setRating(e.target.value);
  }

  const handleRec = (isRecommended) => {
    if (isRecommended) {
      setRecommend(true);
    } else {
      setRecommend(false);
    }
  }

  const handleSummary = (e) => {
    e.preventDefault();
    setSummary(e.target.value);
  }

  const handleBody = (e) => {
    e.preventDefault();
    setBody(e.target.value);
  }

  const handleReviewer = (e) => {
    e.preventDefault();
    setReviewer(e.target.value);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }



  const stars = {
    empty: <i className="fa-regular fa-star"></i>,
    half: <i className="fa-regular fa-star-half-stroke"></i>,
    full: <i className="fa-solid fa-star"></i>
  }

  if (!isOpen) return null;

  return (
    <dialog className="reviewModalContainer" open>
      <button onClick={() => dispatch(isFormOpen())}>Close Without Saving</button>
      <div className="reviewModal">
        <form>
          {/* rating */}
          <label>Rate this product 1-5 stars!
            <input type="number" id="newReviewStars" min="0" max="5" value={rating} onChange={handleRating} required/>
          </label>
          <div>
            {rating >= 1 ? stars.full : rating >= 0.5 ? stars.half : stars.empty}
            {rating >= 2 ? stars.full : rating >= 1.5 ? stars.half : stars.empty}
            {rating >= 3 ? stars.full : rating >= 2.5 ? stars.half : stars.empty}
            {rating >= 4 ? stars.full : rating >= 3.5 ? stars.half : stars.empty}
            {rating >= 5 ? stars.full : rating >= 4.5 ? stars.half : stars.empty}
          </div>
          {/* recommend */}
          <p>Would you recommend this product?</p>
          <div>
            <input type="radio" name="recRadio" value={recommend} onClick={() => handleRec(true)}/>
            <label>Yes</label>
            <input type="radio" name="recRadio" value={recommend} onClick={() => handleRec(false)}/>
            <label>No</label>
          </div>
          {/* characteristics go here */}
          <CharacteristicsTable />
          {/* Summary */}
          <div>
            <p>Summary</p>
            <textarea id="newSummary" rows="2" cols="30" maxLength="60" value={summary} onChange={handleSummary} placeholder="Example: Best purchase ever!"/>
          </div>
          <div>
            <p>Review</p>
              <textarea id="newBody" rows="5" cols="75" maxLength="1000" value={body} onChange={handleBody} minLength="50"/>
          </div>
          {/* Photo Upload */}
          <label>Upload photos of this product
            <input id="uploadPic" type="file" accept="image/*"/>
          </label><br></br>
          {/* Nickname */}
          <label>Enter your nickname:
            <input type="text" maxLength="60" placeholder="Example: Jackson11!" value={reviewer} onChange={handleReviewer}/>
          </label>
          <p>For privacy reasons, do not enter your full name or email address</p>
          {/* email */}
          <label>Email:
            <input id="email" type="text" placeholder="Example: jackson11@email.com" value={email} onChange={handleEmail}/>
          </label>
          <p>For authentication reasons, you will not be emailed</p>
          <button>Submit Review -Not Functional-</button>
        </form>
      </div>
    </dialog>

  );
}

import CharacteristicsTable from './CharacteristicsTable.jsx';
export default NewReviewModal;