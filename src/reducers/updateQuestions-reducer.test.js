import updateQuestionsReducer from './updateQuestions-reducer';

describe('addToGameReducer', () => {
  it('should return the initial state', () => {
    const expected = [];
    const result = updateQuestionsReducer(undefined, {});

    expect(result).toEqual(expected)
  });

  it('should return the correct state if action is updateQuestions', () => {
    const initialState = [];
    const action = {
      type: 'UPDATE_QUESTIONS',
      questions: [
        {
          id: "909",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "Which of the following movies was not based on a novel by Stephen King? ",
          correct_answer: "The Thing",
          incorrect_answers: [
              "Carrie",
              "Misery",
              "The Green Mile"
          ]
        }]
      }

    const newState = [
        {
          id: "909",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "Which of the following movies was not based on a novel by Stephen King? ",
          correct_answer: "The Thing",
          incorrect_answers: [
              "Carrie",
              "Misery",
              "The Green Mile"
          ]
        }
    ];

    const result = updateQuestionsReducer(initialState, action)

    expect(result).toEqual(newState)
  });
})
