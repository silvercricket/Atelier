import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import QAModal from './QAModal.jsx';
import QAAddQuestion from './QAAddQuestion.jsx';

const QAButtons = () => {
  const questions = useSelector((state) => state.qa.questions);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  const handleAddQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  return (
    <div>
      {
        showAddQuestionModal &&
        <QAModal>
          <QAAddQuestion />
        </QAModal>
      }
      { questions.length > 4 && <button>More Answered Questions</button> }
      <button onClick={handleAddQuestionClick}>Add a Question</button>
    </div>
  )
}

export default QAButtons;