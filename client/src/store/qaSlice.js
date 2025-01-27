import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// THUNKS
export const fetchQuestions = createAsyncThunk(
  'qa/fetchQuestions',
  async (productId) => {
    try {
      const response = await axios.get(`/api/qa/questions?product_id=${productId}`);
      return response.data;
    } catch(err) {
      return thunkAPI.rejectWithValue(err.message);
    }
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
    try {
      const response = await axios.post('/api/qa/questions', question);
      return response.data;
    } catch(err) {
      return thunkAPI.rejectWithValue(err.message);
    }

  }
);

const initialState = {
  // TODO: For testing only
  productId: 40347,
  productName: 'Great Product Name',
  // Array of questions sorted by helpfulness
  questions: [],
  // addQuestionModal' status can be: 'form', 'error', 'success'
  addQuestionModal: {
    show: false,
    status: 'form',
    successMsg: '',
    errorMsg: ''
  }
}

export const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    // Add Question Modal
    showAddQuestionModal: (state) => {
      state.addQuestionModal.show = true;
    },
    hideAddQuestionModal: (state) => {
      state.addQuestionModal = initialState.addQuestionModal;
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
      state.addQuestionModal.successMsg = 'Thank you for adding your question!';
      state.addQuestionModal.status = 'success';
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      console.log('Failed to add a question.', action.payload);
      state.addQuestionModal.errorMsg = 'Failed to add a question. Please try again.';
      state.addQuestionModal.status = 'error';
    });
  }
})

export const { showAddQuestionModal, hideAddQuestionModal } = qaSlice.actions;

export default qaSlice.reducer;