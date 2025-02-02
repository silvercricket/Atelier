import React from 'react';

import QAList from './QAList.jsx';
import QAModals from './QAModals.jsx';

const QA = () => {
  return (
    <section className="qa">
      <h3 className="qa-title">Questions & Answers</h3>
      <QAList />
      <QAModals />
    </section>
  )
};

export default QA;