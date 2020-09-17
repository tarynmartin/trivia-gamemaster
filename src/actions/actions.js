export const updateQuestions = (questions) => {
  return {
    type: 'UPDATE_QUESTIONS',
    questions
  }
}

export const createError = (error) => {
  return {
    type: 'ERRORED',
    error
  }
}

export const resetError = () => {
  return {
    type: 'RESET_ERROR',
    error: ''
  }
}
