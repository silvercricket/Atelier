import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import QAModals from '../QAModals.jsx';
import QANewQuestionForm from '../QANewQuestionForm.jsx';
import QANewAnswerForm from '../QANewAnswerForm.jsx';


//state.qa.newAnswerForm.question
const initialState = {
  qa: {
    questions: {
      productId: null,
      list: [],
      // idle, loading, success, error
      status: 'idle',
      showAllQuestions: false
    },
    searchQuery: {
      query: ''
    },
    newQuestionModal: {
      show: false,
    },
    newAnswerModal: {
      show: false,
    },
    newQuestionForm: {
      // active, loading, success, error
      status: 'active'
    },
    newAnswerForm: {
      // active, loading, success, error
      status: 'active',
      question: '',
      questionId: null
    }
  },
  products: {
    currentProduct:
    40348,
    productDetails: {
     '40348': {
      name: 'Test Product Name'
     }
    }
  }
};

const mockStore = configureStore([thunk]);

// QAModals Component
describe('QAModals Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  })

  test('Displays QANewQuestionForm component when showNewQuestionModal state is true', () => {
    const newState = {
      ...initialState,
      qa: {
        ...initialState.qa,
        newQuestionModal: {
          show:true
        }
      }
    }
    render(
      <Provider store={mockStore(newState)}>
        <QAModals />
      </Provider>
    )
    expect(screen.getByText('Ask Your Question')).toBeInTheDocument();
  });

  test('Displays QANewAnswerForm component when showNewAnswerModal state is true', () => {
    const newState = {
      ...initialState,
      qa: {
        ...initialState.qa,
        newAnswerModal: {
          show:true
        }
      }
    }
    render(
      <Provider store={mockStore(newState)}>
        <QAModals />
      </Provider>
    )
    expect(screen.getByText('Submit Your Answer')).toBeInTheDocument();
  });
});