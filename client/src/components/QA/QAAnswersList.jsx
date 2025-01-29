import React from 'react';

import QAAnswer from './QAAnswer.jsx';

const QAAnswersList = ({ question }) => {
  return (
    <div className="qa-answers-list-container">
      <div className="qa-a">A:</div>
      <div className="qa-answers-list">
        {Object.keys(question.answers).map((answerId) => <QAAnswer answer={question.answers[answerId]} key={answerId} />)}
      </div>
    </div>
  )
};

export default QAAnswersList;