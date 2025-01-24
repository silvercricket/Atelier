import React from 'react';
import { useSelector } from 'react-redux';

const QAButtons = () => {
  const questions = useSelector((state) => state.qa.questions);

  return (
    <div>
      { questions.length > 4 && <button>More Answered Questions</button> }
      <button>Add a Question</button>
    </div>
  )
}

export default QAButtons;