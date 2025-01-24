import React from 'react';

import { setQuestions } from '../../store/qaSlice.js';

const exampleData = {
  "product_id": "40347",
  "results": [
      {
          "question_id": 647191,
          "question_body": "How long will the slacker's slacks last?",
          "question_date": "2023-11-28T00:00:00.000Z",
          "asker_name": "Mallo123",
          "question_helpfulness": 36,
          "reported": false,
          "answers": {
              "5993667": {
                  "id": 5993667,
                  "body": "not long",
                  "date": "2024-01-20T00:00:00.000Z",
                  "answerer_name": "sasha32",
                  "helpfulness": 3,
                  "photos": [
                      "https://res.cloudinary.com/daakpfwlp/image/upload/v1705736211/ttr5ebvadvo1wgcgurz0.jpg"
                  ]
              },
              "5993669": {
                  "id": 5993669,
                  "body": "They last an unusually long time",
                  "date": "2024-01-20T00:00:00.000Z",
                  "answerer_name": "sasha67",
                  "helpfulness": 1,
                  "photos": [
                      "https://res.cloudinary.com/daakpfwlp/image/upload/v1705785807/wruucnwgvrhq2njfwz1y.jpg"
                  ]
              },
              "5994028": {
                  "id": 5994028,
                  "body": "test123321",
                  "date": "2024-10-24T00:00:00.000Z",
                  "answerer_name": "test123321",
                  "helpfulness": 0,
                  "photos": [
                      "https://res.cloudinary.com/daxozvday/image/upload/v1729788012/qobi2iczf5dcjuoh1jtc.jpg",
                      "https://res.cloudinary.com/daxozvday/image/upload/v1729788016/fko8syb7ireag9mia0rd.jpg"
                  ]
              }
          }
      }
  ]
}

const QAList = () => {

};

export default QAList;