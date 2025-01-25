import React from 'react';
import { useSelector } from 'react-redux';

import { setQuestions } from '../../store/qaSlice.js';
import QAListItem from './QAListItem.jsx';
import QAButtons from './QAButtons.jsx';

const QAList = () => {
  const questions = useSelector((state) => state.qa.questions);

  return (
    <> {
        questions.length > 0 ? (
          questions.map((question) => <QAListItem question={question} key={question.question_id} />)
        ) : (
          <p>Be first to ask a question!</p>
        )
        }
        <QAButtons />
    </>
  )
};

export default QAList;