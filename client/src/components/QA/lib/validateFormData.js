const validateFormData = (formData) => {
  let errMsg = '';

  Object.keys(formData).forEach((inputName) => {

    if (formData[inputName].length === 0) {
      errMsg += `Your ${inputName}.\n`
    } else if (inputName === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[inputName])) {
        errMsg += 'Your email in correct format.\n'
      }
    }

  });

  return errMsg;
}

export default validateFormData;