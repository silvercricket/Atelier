import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchQuestions, showNewAnswerModal } from '../../store/qaSlice.js';

import QAAnswersList from './QAAnswersList.jsx';


const QAListItem = ({ question }) => {
  const [helpfulTouched, setHelpfulTouched] = useState(false);

  const dispatch = useDispatch();

  const handleHelpfulClick = () => {
    if (helpfulTouched) {
      return;
    }
    setHelpfulTouched(true);
    axios.put(`/api/qa/questions/${question.question_id}/helpful`)
    .then((_response) => {
      dispatch(fetchQuestions());
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="qa-list-item">

      <div className="qa-question-container">
        <div className="qa-question">
          <div>Q:</div>
          <h4>{question.question_body}</h4>
        </div>
        <div className="qa-question-info-container">
          <div>Helpful? <button className="link-button" onClick={handleHelpfulClick}>Yes</button> ({question.question_helpfulness})</div>
          <div><button className="link-button" onClick={() => dispatch(showNewAnswerModal({questionBody: question.question_body, questionId: question.question_id}))}>Add Answer</button></div>
        </div>
      </div>

      <QAAnswersList question={question} />


    </div>
  )
};

export default QAListItem;