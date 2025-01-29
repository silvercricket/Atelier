import React from 'react';


const Breakdowns = () => {

  return (
    <div className="breakdowns">
      <RatingBreakdown />
      <ProductBreakdown />
    </div>
  );
}

import RatingBreakdown from './ratingBreakdown.jsx';
import ProductBreakdown from './productBreakdown.jsx';
export default Breakdowns;