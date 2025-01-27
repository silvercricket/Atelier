import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      },
      {
        "question_id": 647192,
        "question_body": "1How long will the slacker's slacks last?",
        "question_date": "2023-11-28T00:00:00.000Z",
        "asker_name": "1Mallo123",
        "question_helpfulness": 66,
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

// THUNKS
export const fetchQuestions = createAsyncThunk(
  'qa/fetchQuestions',
  async (productId) => {
    const response = await axios.get(`/api/qa/questions?product_id=${productId}`);
    return response.data;
  }
);

export const addQuestion = createAsyncThunk(
  'qa/addQuestion',
  async (formData, thunkAPI) => {
    const productId = thunkAPI.getState().qa.productId;
    const question = {
      body: formData.question,
      name: formData.nickname,
      email: formData.email,
      product_id: productId
    }
    console.log(question);
    const response = await axios.post('/api/qa/questions', question);
    return response.data;
  }
);

const initialState = {
  // TODO: For testing only
  productId: 40347,
  productName: 'Great Product Name',
  // Array of questions sorted by helpfulness
  questions: [],
  addQuestionModal: false
}

export const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    // Add Question Modal
    showAddQuestionModal: (state) => {
      state.addQuestionModal = true;
    },
    hideAddQuestionModal: (state) => {
      state.addQuestionModal = false;
    }
  },
  extraReducers: (builder) => {
    // Fetch Questions
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      console.log('Failed to fetch questions.', action.payload);
    });
    // Add a Question
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      console.log('Added a question', action.payload);
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      console.log('Failed to add a question.', action.payload);
    });
  }
})

export const { showAddQuestionModal, hideAddQuestionModal } = qaSlice.actions;

export default qaSlice.reducer;