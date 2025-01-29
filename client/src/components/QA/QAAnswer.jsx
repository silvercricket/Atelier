import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';

import { fetchQuestions } from '../../store/qaSlice.js';

import QAAnswerPhotos from './QAAnswerPhotos.jsx';

const QAAnswer = ({ answer }) => {
  const [helpfulTouched, setHelpfulTouched] = useState(false);
  const [reportTouched, setReportTouched] = useState(false);

  const dispatch = useDispatch();

  const date = format(new Date(answer.date), 'MMMM dd, yyyy');

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

  const handleReportClick = () => {
    if (reportTouched) {
      return;
    }
    setReportTouched(true);
    axios.put(`/api/qa/answers/${answer.id}/report`)
    .then((_response) => {
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="qa-answer-container">
      <p className="qa-answer">{answer.body}</p>
      {answer.photos.length > 0 && <QAAnswerPhotos photos={answer.photos} />}
      <div className="qa-answer-info-container">
        <div>by {answer.answerer_name}, {date}</div>
        <div>Helpful? <button className="link-button" onClick={handleHelpfulClick}>Yes</button> ({answer.helpfulness})</div>
        <div>
          {
            reportTouched ? (
              <span>Reported</span>
            ) : (
              <button className="link-button" onClick={handleReportClick}>Report</button>
            )
          }
        </div>
      </div>
    </div>
  )
};

export default QAAnswer;