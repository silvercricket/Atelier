import React from 'react';

import QAAnswersList from './QAAnswersList.jsx';

const QAListItem = ({ question }) => {
  return (
    <div className="qa-list-item">

      <div className="qa-question-container">
        <h4 className="qa-question">Q: {question.question_body}</h4>
        <div className="qa-question-info-container">
          <div>Helpful? <button className="link-button">Yes</button> ({question.question_helpfulness})</div>
          <div><button className="link-button">Add Answer</button></div>
        </div>
      </div>

      <QAAnswersList question={question} />


    </div>
  )
};

export default QAListItem;