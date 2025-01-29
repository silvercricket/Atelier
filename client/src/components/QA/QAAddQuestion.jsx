import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import validateFormData from './lib/validateFormData.js';
import { addQuestion } from '../../store/qaSlice.js';

import QAFormInput from './QAFormInput.jsx';

const QAAddQuestion = () => {
  const productName = useSelector((state) => state.qa.productName);
  const initialFormState = {
    question: '',
    nickname: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errMsg, setFormErrMsg] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setFormData((formData) => {
      return {
        ...formData,
        [name]: value
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrMsg('');

    const errStr = validateFormData(formData);
    if (errStr !== '') {
      setFormErrMsg(errStr);
    } else {
      dispatch(addQuestion(formData));
      setFormData(initialFormState);
    }
  }

  return (
    <div>
      <h4 className="qa-modal-title">Ask Your Question <span className="qa-modal-subtitle">About the {productName}</span></h4>
      <form onSubmit={handleFormSubmit}>
      <QAFormInput
        tag="textarea"
        name={"question"}
        label="Your question"
        mandatory={true}
        placeholder="Please type your question..."
        maxLength={1000}
        value={formData.question}
        onChangeHandler={handleInputChange}
        />

        <QAFormInput
        name={"nickname"}
        label="Your nickname"
        mandatory={true}
        placeholder="Example: jackson11!"
        maxLength={60}
        value={formData.nickname}
        onChangeHandler={handleInputChange}
        notice="For privacy reasons, do not use your full name or email address"
        />

        <QAFormInput
        name={"email"}
        label="Your email"
        mandatory={true}
        placeholder="Example: jackson11@email.com"
        maxLength={60}
        value={formData.email}
        onChangeHandler={handleInputChange}
        notice="For authentication reasons, you will not be emailed"
        />

        {
          errMsg &&
          <div className="qa-form-err-msg-container">
            <p>You must enter the following:</p>
            <div>{ errMsg.split('\n').map((msg) => <p className="qa-form-err-msg">{msg}</p>) }</div>
          </div>
        }

        <button>Submit question</button>
      </form>
    </div>
  )
}

export default QAAddQuestion;