import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isFormOpen } from '../../store/ratingsReviewsSlice.js';

const NewReviewModal = () => {
  const dispatch = useDispatch();
  const { useState } = React;

  const [ rating, setRating ] = useState(0);
  const [ summary, setSummary ] = useState('');
  const [ body, setBody ] = useState('');
  const [ reviewer, setReviewer ] = useState('');
  const [ recommend, setRecommend ] = useState(false);

  // Toggle Modal Window
  const isOpen = useSelector((state) => {
    return state.ratingsReviews.formOpen;
  })



  if (!isOpen) return null;

  return (
    <dialog className="reviewModalContainer" open>
      <button onClick={() => dispatch(isFormOpen())}>Close Without Saving</button>
      <div className="reviewModal">
        <form>
          <label>Rate this product!
            <input type="text"/>
          </label>
          <p>Would you recommend this product?</p>
          <input type="radio" value="yes"/>
          <label for="yes">Yes</label>
          <input type="radio" value="no"/>
          <label for="no">No</label>
        </form>
      </div>
    </dialog>

  );
}

export default NewReviewModal;