import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import QANewQuestionForm from '../QANewQuestionForm.jsx';


//state.qa.newAnswerForm.question
const initialState = {
  qa: {
    productName: 'Test Product',
    newQuestionForm: {
      status: 'active'
    }
  }
};

const mockStore = configureStore([thunk]);

describe('Add a Question Form', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  })

  test('Display correct input labels', () => {
    render(
      <Provider store={store}>
        <QANewQuestionForm />
      </Provider>
    );

    expect(screen.getByLabelText('Your question*')).toBeInTheDocument();
    expect(screen.getByLabelText('Your nickname*')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email*')).toBeInTheDocument();
  })
})