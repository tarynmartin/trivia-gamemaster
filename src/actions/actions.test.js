import * as actions from './actions';

describe('actions', () => {
  it('should have a type of UPDATE_QUESTIONS', () => {

    const questions = [
      {
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

    const expectedAction = {
      type: 'UPDATE_QUESTIONS',
      questions: [
        {
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
      ]
    }

    const result = actions.updateQuestions(questions);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ADD_TO_GAME', () => {
    const question =
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
      };

    const expectedAction = {
      type: 'ADD_TO_GAME',
      id: "909",
      question:
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
    }

    const result = actions.addToGame(question);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of REMOVE_QUESTION', () => {

    const question =
      {
        id: "909",
        question: [
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
        ]
      };

    const expectedAction = {
      type: 'REMOVE_QUESTION',
      question:
        {
          id: "909",
          question: [
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
          ]
        }
    }

    const result = actions.removeQuestion(question);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of ERRORED', () => {
    const error = 'Oops, that didn\'t work!'

    const expectedAction = {
      type: 'ERRORED',
      error: 'Oops, that didn\'t work!'
    }

    const result = actions.createError(error);

    expect(result).toEqual(expectedAction);
  });

  it('should have a type of RESET_ERROR', () => {

    const expectedAction = {
      type: 'RESET_ERROR',
      error: ''
    }

    const result = actions.resetError();

    expect(result).toEqual(expectedAction);
  });
})
