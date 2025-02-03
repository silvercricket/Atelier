import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSearchQuery } from '../../store/qaSlice.js';

const QASearch = () => {
  const query = useSelector((state) => state.qa.searchQuery.query);

  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
   dispatch(setSearchQuery(e.target.value));
  }

  return (
    <div className="qa-search-container">
      <input className="qa-search" placeholder="Have a question? Search for answers..." value={query} onChange={handleSearchInputChange} />
    </div>
  )
};

export default QASearch;