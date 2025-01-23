import React from 'react';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

var App = (props) => {

  return (
    <div>
      <ProductOverview />
      <RatingsReviews />
      <p>hello world</p>
    </div>
  );
}

export default App;