import React from 'react';

const QAAnswer = ({ answer }) => {
  return (
    <div className="qa-answer-container">
      <p className="qa-answer"><span className="qa-a">A: </span>{answer.body}</p>
      <div className="qa-answer-info-container">
        <div>by {answer.answerer_name}, {answer.date}</div>
        <div>Helpful? <button className="link-button">Yes</button> ({answer.helpfulness})</div>
        <div><button className="link-button">Report</button></div>
      </div>
    </div>
  )
};

export default QAAnswer;