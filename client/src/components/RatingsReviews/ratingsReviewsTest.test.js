import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import RatingBreakdown from './ratingBreakdown.jsx';
import ReviewList from './reviewList.jsx';

const mockReviews = {
  reviews: [
    {
        "review_id": 1280449,
        "rating": 5,
        "summary": "I love it",
        "recommend": false,
        "response": null,
        "body": "Nothing beats it!",
        "date": "2023-08-22T00:00:00.000Z",
        "reviewer_name": "John",
        "helpfulness": 3,
        "photos": []
    },
    {
        "review_id": 1280776,
        "rating": 1,
        "summary": "HORRRIBLE",
        "recommend": false,
        "response": null,
        "body": "dont waste your time or money...",
        "date": "2023-11-30T00:00:00.000Z",
        "reviewer_name": "CC",
        "helpfulness": 1,
        "photos": []
    },
    {
        "review_id": 1280783,
        "rating": 5,
        "summary": "dasdfdsfa",
        "recommend": true,
        "response": null,
        "body": "fdsfadsdfsads",
        "date": "2023-12-01T00:00:00.000Z",
        "reviewer_name": "dsfadsfdsa",
        "helpfulness": 1,
        "photos": [
            {
                "id": 2459234,
                "url": "blob:http://13.56.234.9:3000/031772f0-cd90-4089-8be2-c2fb97bc0c0b"
            }
        ]
    },
    {
        "review_id": 1280796,
        "rating": 4,
        "summary": "This is a demo",
        "recommend": true,
        "response": null,
        "body": "This is a demo",
        "date": "2023-12-03T00:00:00.000Z",
        "reviewer_name": "demo",
        "helpfulness": 0,
        "photos": []
    },
    {
        "review_id": 1280784,
        "rating": 5,
        "summary": "dffsfd",
        "recommend": true,
        "response": null,
        "body": "ddsfsdfsdf",
        "date": "2023-12-01T00:00:00.000Z",
        "reviewer_name": "sdfsdfsdf",
        "helpfulness": 0,
        "photos": []
    }
  ]
}

const initialState = {
  reviews: mockReviews
}

const mockStore = configureStore({
  reducer: (state = initialState) => state,
  middleware: [thunk]
});

describe('ProductOverview', () => {
  let store;
  let user;

  beforeEach(() => {
    store = mockStore(initialState);
    user = userEvent.setup();
  })

  test('renders rating breakdown', async () => {
    render(
      <Provider store={store}>
        <RatingBreakdown />
      </Provider>
    );
    // avg rating of mockReviews is 4
    expect(screen.getByText(4)).toBeInTheDocument();
  });

  test('renders % of customers who recommend product', async () => {
    render(
      <Provider store={store}>
        <RatingBreakdown />
      </Provider>
    );
    // 60% of the reviews recommend the product
    expect(screen.getByText('60% of reviews reccomend this product')).toBeInTheDocument();
  })
});