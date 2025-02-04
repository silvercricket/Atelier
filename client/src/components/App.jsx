import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import ProductDetails from './ProductOverview/ProductDetails.jsx';
import QA from './QA/QA.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import '../index.css';

var App = (props) => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ProductOverview />
                <RelatedItems />
                <QA />
                <RatingsReviews />
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <div>
                <ProductOverview />
                <RelatedItems />
                <QA />
                <RatingsReviews />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;