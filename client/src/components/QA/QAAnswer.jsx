import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchQuestions } from '../../store/qaSlice.js';

import QAAnswerPhotos from './QAAnswerPhotos.jsx';

const QAAnswer = ({ answer }) => {
  const [helpfulTouched, setHelpfulTouched] = useState(false);

  const dispatch = useDispatch();

  const handleHelpfulClick = () => {
    if (helpfulTouched) {
      return;
    }
    setHelpfulTouched(true);
    axios.put(`/api/qa/answers/${answer.id}/helpful`)
    .then((_response) => {
      dispatch(fetchQuestions());
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="qa-answer-container">
      <p className="qa-answer"><span className="qa-a">A: </span>{answer.body}</p>
      {answer.photos.length > 0 && <QAAnswerPhotos photos={answer.photos} />}
      <div className="qa-answer-info-container">
        <div>by {answer.answerer_name}, {answer.date}</div>
        <div>Helpful? <button className="link-button" onClick={handleHelpfulClick}>Yes</button> ({answer.helpfulness})</div>
        <div><button className="link-button">Report</button></div>
      </div>
    </div>
  )
};

export default QAAnswer;