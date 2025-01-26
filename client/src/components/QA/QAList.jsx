import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchQuestions } from '../../store/qaSlice.js';

import QASearch from './QASearch.jsx';
import QAListItem from './QAListItem.jsx';
import QAButtons from './QAButtons.jsx';

const QAList = () => {
  const productId = useSelector((state) => state.qa.productId);
  const questions = useSelector((state) => state.qa.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchQuestions(productId));
    }
  }, [productId]);

  return (
    <> {
        questions.length > 0 ? (
          <>
            <QASearch />
            {questions.map((question) => <QAListItem question={question} key={question.question_id} />)}
          </>
        ) : (
          <p>Be first to ask a question!</p>
        )
        }
        <QAButtons />
    </>
  )
};

export default QAList;