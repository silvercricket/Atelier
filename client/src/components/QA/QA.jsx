import React from 'react';
import { useSelector } from 'react-redux';

import QAList from './QAList.jsx';
import QAModal from './QAModal.jsx';
import QAAddQuestion from './QAAddQuestion.jsx';

const QA = () => {
  const addQuestionModal = useSelector((state) => state.qa.addQuestionModal);

  return (
    <section>
      <h3 className="qa-title">Questions & Answers</h3>
      <QAList />
      {
        addQuestionModal &&
        <QAModal>
          <QAAddQuestion />
        </QAModal>
      }
    </section>
  )
};

export default QA;