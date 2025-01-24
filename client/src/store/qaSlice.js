import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: []
}

export const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    }
  }
})

export const { setQuestions } = qaSlice.actions;

export default qaSlice.reducer;