export const updateQuestions = (questions) => {
  return {
    type: 'UPDATE_QUESTIONS',
    questions
  }
}

export const addToGame = (question) => {
  return {
    type: 'ADD_TO_GAME',
    id: question.id,
    question
  }
}

export const removeQuestion = (question) => {
  return {
    type: 'REMOVE_QUESTION',
    question
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
