import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

const ReviewTile = ({review}) => {
  const stars = {
    empty: <i className="fa-regular fa-star"></i>,
    half: <i className="fa-regular fa-star-half-stroke"></i>,
    full: <i className="fa-solid fa-star"></i>
  }

  const date = format(new Date(review.date), 'MMMM dd, yyyy');

  let photos = [];
  if (review.photos.length) {
    photos = review.photos.map((photo) => {
      return <img key={photo.id} src={photo.url.replace(/v\d+/, 'c_fill,w_90,h_60')}/>
    })
  }

  return (
    <div className="reviewTile">
      <h3 className="reviewerName">{review.reviewer_name}</h3>
      <div>
        {review.rating >= 1 ? stars.full : review.rating >= 0.5 ? stars.half : stars.empty}
        {review.rating >= 2 ? stars.full : review.rating >= 1.5 ? stars.half : stars.empty}
        {review.rating >= 3 ? stars.full : review.rating >= 2.5 ? stars.half : stars.empty}
        {review.rating >= 4 ? stars.full : review.rating >= 3.5 ? stars.half : stars.empty}
        {review.rating >= 5 ? stars.full : review.rating >= 4.5 ? stars.half : stars.empty}
      </div>
      <p>{date}</p>
      <strong>{review.summary}</strong>
      <p>{review.body}</p>
      {photos.length ? photos : null}
      {review.recommend ? <p>I recommend this product  ✅ </p> : null}
      <p>seller response here eventually</p>
      <p>Was this review helpful?</p>
      <button>Yes - not functional</button><button>No - not functional</button>
      <p>{review.helpfulness} customers found this review helpful</p>

    </div>
  );

}

export default ReviewTile;