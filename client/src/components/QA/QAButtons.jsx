import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showNewQuestionModal } from '../../store/qaSlice.js';

const QAButtons = () => {
  const questions = useSelector((state) => state.qa.questions);
  const dispatch = useDispatch();

  return (
    <div>
      { questions.length > 4 && <button>More Answered Questions</button> }
      <button onClick={() => dispatch(showNewQuestionModal())}>Add a Question</button>
    </div>
  )
}

export default QAButtons;