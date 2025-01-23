import React from 'react';
import RelatedItems from './RelatedItems/RelatedItems.jsx'
import ProductOverview from './ProductOverview/ProductOverview.jsx';

var App = (props) => {

  return (
    <div>
      <ProductOverview />
      <RelatedItems />
      <p>hello world</p>
    </div>
  );
}

export default App;