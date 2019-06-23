import { QuizActions } from './quiz.actions';
import { quizReducer } from './quiz.reducer';
import { Quiz } from './entities/quiz';
import { QuizState } from './store';
import { User, Gender } from './entities/user';
var deepFreeze = require('deep-freeze');

describe('quiz reducer tests', () => {
  

  // each it block is a test case.
  it('should set state to true when logging in', () => {
    let startState = {isLoggedIn: false, quizzes: [], isLoading: false, quiz: null, user: null}  as QuizState;
    deepFreeze(startState);
    let actionObj = { 
      type: QuizActions.LOG_IN, payload: true};
    let newStateObj = quizReducer(startState, actionObj);
    expect(newStateObj).toEqual({isLoggedIn: true, quizzes: [], isLoading: false, quiz: null, user: null});
  });

  it('should create new quiz ', () => {
    // Arrange - Act - Assert

    // Arrange
    let startState = {isLoggedIn: false, quizzes: [], isLoading: false, quiz: null, user: null}  as QuizState;
    deepFreeze(startState);
    let quiz = { title: 'Test quiz', questions: [] } as Quiz;
    let actionObj = { type: QuizActions.CREATE_QUIZ, payload: quiz };
    
    // Act
    let newStateObj = quizReducer(startState, actionObj);
    
    // Assert (expect)
    expect(newStateObj.quizzes.length).toBe(1);
    expect(newStateObj.quizzes[0].title).toBe('Test quiz');
  });

  it('should create new user'), () => {
    let startState = {isLoggedIn: false, quizzes: [], isLoading: false, quiz: null, user: {_id: '1',username: 'Admin', email: 'mail@mail.dk',gender: Gender.MALE, birthDate: new Date}} as QuizState;
    deepFreeze(startState);
    let userId = '1'
    let actionObj = {type: QuizActions.GET_USER, payload: userId};

    let newStateObj = quizReducer(startState,actionObj);

    expect(newStateObj.user.username).toBe('Admin')
    expect(newStateObj.user.email).toBe('mail@mail.dk')
  }

  it('should remove quiz'), () => {
    let quiz = { _id: '1',title: 'Test quiz', questions: [] } as Quiz;
    let quiz2 = { _id: '2',title: 'Cola', questions: [] } as Quiz;
    let startState = {isLoggedIn: false, quizzes: [quiz,quiz2], isLoading: false, quiz: null, user: {_id: '1',username: 'Admin', email: 'mail@mail.dk',gender: Gender.MALE, birthDate: new Date}} as QuizState;
    deepFreeze(startState);
    let quizId = '1'
    let actionObj = {type: QuizActions.DELETE_QUIZ, payload: quizId}

    let newStateObj = quizReducer(startState,actionObj);
    console.log(newStateObj.quizzes)
    expect(newStateObj.quizzes.length).toBe(1); 
    expect(newStateObj.quizzes[0].title).toBe('Cola')
  }
});