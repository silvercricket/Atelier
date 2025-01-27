import React from 'react';
import { useSelector } from 'react-redux';

import QAList from './QAList.jsx';
import QAModal from './QAModal.jsx';
import QAAddQuestion from './QAAddQuestion.jsx';
import QANotification from './QANotification.jsx';

const QA = () => {
  const addQuestionModal = useSelector((state) => state.qa.addQuestionModal);

  return (
    <section>
      <h3 className="qa-title">Questions & Answers</h3>
      <QAList />
      {
        addQuestionModal.show &&
        <QAModal>
          {
            addQuestionModal.status === 'form' &&
            <QAAddQuestion />
          }
          {
            addQuestionModal.status === 'success' &&
            <QANotification type="success" msg={addQuestionModal.successMsg} />
          }
          {
            addQuestionModal.status === 'error' &&
            <QANotification type="error"  msg={addQuestionModal.errorMsg} />
          }
        </QAModal>
      }
    </section>
  )
};

export default QA;