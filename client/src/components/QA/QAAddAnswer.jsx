import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import validateFormData from './lib/validateFormData.js';
import { addAnswer } from '../../store/qaSlice.js';

import QAFormInput from './QAFormInput.jsx';
import QAPhotoUploader from './QAPhotoUploader.jsx';

const QAAddAnswer = () => {
  const productName = useSelector((state) => state.qa.productName);
  const question = useSelector((state) => state.qa.addAnswerModal.question);

  const initialFormState = {
    answer: '',
    nickname: '',
    email: '',
    photos: [],
    thumbnails: []
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
      dispatch(addAnswer(formData));
      setFormData(initialFormState);
    }
  }

  return (
    <div>
      <h4 className="qa-modal-title">Submit Your Answer <span className="qa-modal-subtitle">{productName}: {question}</span></h4>
      <form onSubmit={handleFormSubmit}>
        <QAFormInput
        tag="textarea"
        name="answer"
        label="Your answer"
        mandatory={true}
        placeholder="Please type your answer..."
        maxLength={1000}
        value={formData.answer}
        onChangeHandler={handleInputChange}
        />

        <QAFormInput
        name={"nickname"}
        label="Your nickname"
        mandatory={true}
        placeholder="Example: jack543!"
        maxLength={60}
        value={formData.nickname}
        onChangeHandler={handleInputChange}
        notice="For privacy reasons, do not use your full name or email address"
        />

        <QAFormInput
        name={"email"}
        label="Your email"
        mandatory={true}
        placeholder="Example: jack@email.com"
        maxLength={60}
        value={formData.email}
        onChangeHandler={handleInputChange}
        notice="For authentication reasons, you will not be emailed"
        />

        <QAPhotoUploader formData={formData} setFormData={setFormData} />

        {
          errMsg &&
          <div className="qa-form-err-msg-container">
            <p>You must enter the following:</p>
            <div>{ errMsg.split('\n').map((msg) => <p className="qa-form-err-msg">{msg}</p>) }</div>
          </div>
        }

        <button>Submit answer</button>
      </form>
    </div>
  )
};

export default QAAddAnswer;