import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchQuestions, showAddAnswerModal } from '../../store/qaSlice.js';

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
        <h4 className="qa-question">Q: {question.question_body}</h4>
        <div className="qa-question-info-container">
          <div>Helpful? <button className="link-button" onClick={handleHelpfulClick}>Yes</button> ({question.question_helpfulness})</div>
          <div><button className="link-button" onClick={() => dispatch(showAddAnswerModal({questionBody: question.question_body, questionId: question.question_id}))}>Add Answer</button></div>
        </div>
      </div>

      <QAAnswersList question={question} />


    </div>
  )
};

export default QAListItem;