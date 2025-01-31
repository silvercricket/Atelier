import React from 'react';
import { useSelector } from 'react-redux';

const QASearch = () => {
  const questions = useSelector((state) => state.qa.questions);

  return (
    <div className="qa-search-container">
      <input className="qa-search" placeholder="Have a question? Search for answers..." />
    </div>
  )
};

export default QASearch;