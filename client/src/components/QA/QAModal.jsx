import React from 'react';

import { hideAddQuestionModal } from '../../store/qaSlice.js';

const QAModal = ({ children, closeModalHandler }) => {

  return (
    <div className="qa-modal-background">
      <div className="qa-modal-container">
        <button onClick={closeModalHandler}>X</button>
        {children}
      </div>
    </div>
  )
};

export default QAModal;