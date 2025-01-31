import { createSelector } from '@reduxjs/toolkit';

const selectQuestions = (state) => {
  return state.qa.questions;
}

export const selectHasMoreThanTwoQuestions = createSelector(
  [selectQuestions],
  (questions) => questions.length > 2
)

export const selectFirstTwoQuestions = createSelector(
  [selectQuestions],
  (questions) => questions.slice(0, 2)
)

export const selectAllQuestions = createSelector(
  [selectQuestions],
  (questions) => questions
)