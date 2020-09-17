const updateQuestionsReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_QUESTIONS' :
      return action.questions
    default :
      return state
  }
}

export default updateQuestionsReducer;
