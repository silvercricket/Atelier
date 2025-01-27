import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAddQuestionModal, hideAddAnswerModal } from '../../store/qaSlice.js';

import QAList from './QAList.jsx';
import QAModal from './QAModal.jsx';
import QAAddQuestion from './QAAddQuestion.jsx';
import QANotification from './QANotification.jsx';
import QAAddAnswer from './QAAddAnswer.jsx';

const QA = () => {
  const addQuestionModal = useSelector((state) => state.qa.addQuestionModal);
  const addAnswerModal = useSelector((state) => state.qa.addAnswerModal);

  const dispatch = useDispatch();

  return (
    <section>
      <h3 className="qa-title">Questions & Answers</h3>
      <QAList />
      {
        addQuestionModal.show &&
        <QAModal closeModalHandler={() => dispatch(hideAddQuestionModal())}>
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
            <QANotification type="error" msg={addQuestionModal.errorMsg} />
          }
        </QAModal>
      }
      {
        addAnswerModal.show &&
        <QAModal closeModalHandler={() => dispatch(hideAddAnswerModal())}>
          {
            addAnswerModal.status === 'form' &&
            <QAAddAnswer />
          }
          {
            addAnswerModal.status === 'success' &&
            <QANotification type="success" msg={addAnswerModal.successMsg} />
          }
          {
            addAnswerModal.status === 'error' &&
            <QANotification type="error" msg={addAnswerModal.errorMsg} />
          }
        </QAModal>

      }
    </section>
  )
};

export default QA;