import React from 'react';

const QAModal = ({ children }) => {
  return (
    <div className="qa-modal-background">
      <div className="qa-modal-container">
        {children}
      </div>
    </div>
  )
};

export default QAModal;