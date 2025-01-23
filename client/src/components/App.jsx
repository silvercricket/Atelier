import React from 'react';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QA from './QA/QA.jsx';

var App = (props) => {

  return (
    <div>
      <ProductOverview />
      <QA />
      <p>hello world</p>
    </div>
  );
}

export default App;