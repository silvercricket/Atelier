import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import QAAnswer from './QAAnswer.jsx';
import QANotification from './QANotification.jsx';

const QAAnswersList = ({ question }) => {
  const [answers, setAnswers] = useState([]);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/qa/questions/${question.question_id}/answers?page=1&count=100`)
    .then((response) => {
      setAnswers(response.data.results);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
  }, []);

  let answersToDisplay;
  if (showAllAnswers) {
    answersToDisplay = answers;
  } else {
    answersToDisplay = answers.slice(0, 2);
  }

  const handleLoadAnswersClick = () => {
    setShowAllAnswers((prev) => !prev);
  }


  return (
    <div className="qa-answers-list-container">
      {
        isLoading ?
        <QANotification type="loading" msg="Loading answers..." /> : (
          answers.length > 0 && (
            <>
              <div className="qa-a">A:</div>
              <div>

                <div className="qa-answers-list">
                  {
                    answersToDisplay.map((answer) => {
                      return (
                        <QAAnswer answer={answer} key={answer.answer_id} />
                      )
                    })
                  }

                  {
                    answers.length > 2 && (
                      <div>
                        <button onClick={handleLoadAnswersClick}>{showAllAnswers ? 'Collapse answers' : 'Load more answers'}</button>
                      </div>
                    )
                  }
                </div>

              </div>
            </>
          )
        )
      }
    </div>
  )
};

export default QAAnswersList;