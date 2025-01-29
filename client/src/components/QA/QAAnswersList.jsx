import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import QAAnswer from './QAAnswer.jsx';

const QAAnswersList = ({ question }) => {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [answers, setAnswers] = useState([]);

  const answersCount = Object.keys(question.answers).length;

  let answersToDisplay;
  if (showAllAnswers) {
    answersToDisplay = answers;
  } else {
    answersToDisplay = answers.slice(0, 2);
  }

  useEffect(() => {
    const count = showAllAnswers ? 100 : 2;
    axios.get(`/api/qa/questions/${question.question_id}/answers?page=1&count=${count}`)
    .then((response) => {
      setAnswers(response.data.results);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [question, showAllAnswers]);

  const handleLoadAnswersClick = () => {
    setShowAllAnswers((prev) => !prev);
  }


  return (
    <div className="qa-answers-list-container">
      <div className="qa-a">A:</div>
      <div>
        {
          answers.length > 0 && (
            <div className="qa-answers-list">
              {
                answersToDisplay.map((answer) => {
                  return (
                    <QAAnswer answer={answer} key={uuidv4()} />
                  )
                })
              }
            </div>
          )
        }

        {
          answersCount > 2 && (
            <div>
              <button onClick={handleLoadAnswersClick}>{showAllAnswers ? 'Collapse answers' : 'Load more answers'}</button>
            </div>
          )
        }
      </div>
    </div>
  )
};

export default QAAnswersList;