import React from 'react';
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';

var App = (props) => {

  return (
    <div>
      <ProductOverview />
      <RatingsReviews />
      <RelatedItems />
      <p>hello world</p>
    </div>
  );
}

export default App;