import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showNewQuestionModal } from '../../store/qaSlice.js';
import { selectHasMoreThanTwoQuestions } from './qaSelectors.js';

const QAButtons = ({ showAllQuestion, setShowAllQuestions }) => {
  const hasMoreThanTwoQuestions = useSelector(selectHasMoreThanTwoQuestions);

  const dispatch = useDispatch();

  return (
    <div>
      { hasMoreThanTwoQuestions && !showAllQuestion && <button onClick={() => setShowAllQuestions(true)}>More Answered Questions</button> }
      <button onClick={() => dispatch(showNewQuestionModal())}>Add a Question</button>
    </div>
  )
}

export default QAButtons;