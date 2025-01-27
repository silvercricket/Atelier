import React from 'react';

const QAFormInput = ({ tag = 'input', name, label, mandatory, placeholder, value, onChangeHandler, notice, errMsg }) => {
  return (
    <>
      <label className="qa-form-label">{label}{mandatory && '*'}
        { tag === 'textarea' && <textarea placeholder={placeholder} value={value} onChange={(e) => onChangeHandler(name, e.target.value)}/>}
        { tag === 'input' && <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChangeHandler(name, e.target.value)} /> }
      </label>
      { notice && <p className="qa-form-notice">{notice}</p> }
      { errMsg && <p className="qa-form-err-msg">{errMsg}</p> }
    </>
  )
};

export default QAFormInput;