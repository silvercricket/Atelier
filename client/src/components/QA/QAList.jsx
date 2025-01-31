import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { fetchQuestions } from '../../store/qaSlice.js';
import { selectHasMoreThanTwoQuestions, selectFirstTwoQuestions, selectAllQuestions } from './qaSelectors.js';

import QASearch from './QASearch.jsx';
import QAListItem from './QAListItem.jsx';
import QAButtons from './QAButtons.jsx';

const QAList = () => {
  const [showAllQuestion, setShowAllQuestions] = useState(false);

  const productId = useSelector((state) => state.qa.productId);
  const hasMoreThanTwoQuestions = useSelector(selectHasMoreThanTwoQuestions);
  const firstTwoQuestions = useSelector(selectFirstTwoQuestions);
  const allQuestions = useSelector(selectAllQuestions);

  const dispatch = useDispatch();

  let questionsToDisplay;
  if (showAllQuestion && hasMoreThanTwoQuestions) {
    questionsToDisplay = allQuestions;
  } else {
    questionsToDisplay = firstTwoQuestions;
  }

  useEffect(() => {
    if (productId) {
      dispatch(fetchQuestions());
    }
  }, [productId]);

  return (
    <> {
        allQuestions.length > 0 ? (
          <>
            <QASearch />
            { questionsToDisplay.map((question) => <QAListItem question={question} key={question.question_id} />) }
          </>
        ) : (
          <p>Be first to ask a question!</p>
        )
        }
        <QAButtons showAllQuestion={showAllQuestion} setShowAllQuestions={setShowAllQuestions} />
    </>
  )
};

export default QAList;