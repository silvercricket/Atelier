import React from 'react';
import { useDispatch } from 'react-redux';

import { hideAddQuestionModal } from '../../store/qaSlice.js';

const QAModal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div className="qa-modal-background">
      <div className="qa-modal-container">
        <button onClick={() => dispatch(hideAddQuestionModal())}>X</button>
        {children}
      </div>
    </div>
  )
};

export default QAModal;