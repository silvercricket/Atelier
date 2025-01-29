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
  const [ recommend, setRecommend ] = useState(false);

  // Toggle Modal Window
  const isOpen = useSelector((state) => {
    return state.newReviewForm.formOpen;
  })

  const handleRating = (e) => {
    setRating(e.target.value);
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
          <input type="radio" value="yes"/>
          <label for="yes">Yes</label>
          <input type="radio" value="no"/>
          <label for="no">No</label>
          {/* characteristics go here */}
          <table className="charTable">
            <caption>
              Product Characteristics
            </caption>
            <tbody>
              <tr className="charTable">
                <th scope="col" className="charTable, colHead"></th>
                <th scope="col" className="charTable, colHead">1</th>
                <th scope="col" className="charTable, colHead">2</th>
                <th scope="col" className="charTable, colHead">3</th>
                <th scope="col" className="charTable, colHead">4</th>
                <th scope="col" className="charTable, colHead">5</th>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Size</th>
                <td className="charTable">size too small</td>
                <td className="charTable">slightly small</td>
                <td className="charTable">just right</td>
                <td className="charTable">slightly big</td>
                <td className="charTable">size too big</td>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Width</th>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Comfort</th>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Quality</th>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Length</th>
              </tr>
              <tr className="charTable">
                <th scope="row" className="charTable">Fit</th>
              </tr>
            </tbody>

          </table><br></br>
          {/* Summary */}
          <label>Summary
            <textarea id="newSummary" rows="2" cols="30" maxLength="60" placeholder="Example: Best purchase ever!"/>
          </label>
          <label>Review:
            <textarea id="newBody" rows="5" cols="75" maxLength="1000" minLength="50"/>
          </label><br></br>
          {/* Photo Upload */}
          <label>Upload photos of this product
            <input id="uploadPic" type="file" accept="image/*"/>
          </label><br></br>
          {/* Nickname */}
          <label>Enter your nickname:
            <input type="text" maxLength="60" placeholder="Example: Jackson11!"/>
          </label>
          <p>For privacy reasons, do not enter your full name or email address</p>
          {/* email */}
          <label>Email:
            <input id="email" type="text" placeholder="Example: jackson11@email.com"/>
          </label>
          <p>For authentication reasons, you will not be emailed</p>
          <button>Submit Review -Not Functional-</button>
        </form>
      </div>
    </dialog>

  );
}

export default NewReviewModal;