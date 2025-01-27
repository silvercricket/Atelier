import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import QAFormInput from './QAFormInput.jsx';

const QAAddQuestion = () => {
  const productName = useSelector((state) => state.qa.productName);
  const initialFormState = {
    question: '',
    nickname: '',
    email: ''
  };
  const initialFormErrors = {
    question: '',
    nickname: '',
    email: ''
  }
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

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
    console.log(formData);
    setFormData(initialFormState);
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
        value={formData.question}
        onChangeHandler={handleInputChange}
        errMsg={formErrors.question}
        />

        <QAFormInput
        name={"nickname"}
        label="Your nickname"
        mandatory={true}
        placeholder="Example: jackson11!"
        value={formData.nickname}
        onChangeHandler={handleInputChange}
        notice="For privacy reasons, do not use your full name"
        errMsg={formErrors.nickname}
        />

        <QAFormInput
        name={"email"}
        label="Your email"
        mandatory={true}
        placeholder="Example: johndoe@gmail.com"
        value={formData.email}
        onChangeHandler={handleInputChange}
        notice="For authentication reasons, you will not be emailed"
        errMsg={formErrors.email}
        />

        <button>Submit question</button>
      </form>
    </div>
  )
}

export default QAAddQuestion;