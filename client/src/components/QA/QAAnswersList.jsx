import React from 'react';

import QAAnswer from './QAAnswer.jsx';

const QAAnswersList = ({ question }) => {
  return (
    <div className="answers-list-container">
      {Object.keys(question.answers).map((answerId) => <QAAnswer answer={question.answers[answerId]} key={answerId} />)}
    </div>
  )
};

export default QAAnswersList;