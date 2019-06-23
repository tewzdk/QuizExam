import { QuizActions } from './quiz.actions';
import { QuizState } from './store';
import { tassign } from 'tassign';
import { TempDataService } from './service/temp-data.service';

let temp = new TempDataService();
const INITIAL_STATE: QuizState = { isLoggedIn: false, quizzes: [], isLoading: false, quiz: null, user: null }

export function quizReducer(state: QuizState = INITIAL_STATE, action: any) {
  switch (action.type) {

    case QuizActions.GET_QUIZ:
      let newQuiz = state.quizzes.find(quiz => quiz._id === action.payload.quizId);

      return tassign(state, { quiz: newQuiz });

    case QuizActions.GET_QUIZZES_LOADING:
      return tassign(state, { isLoading: true });

    case QuizActions.GET_QUIZZES_SUCCESS:
      return tassign(state, { isLoading: false, quizzes: action.payload });


    case QuizActions.GET_QUIZZES_FAILED:
      return tassign(state, { isLoading: false });

    case QuizActions.GET_USER_LOADING:
        return tassign(state, { isLoading: true });

    case QuizActions.GET_USER_FAILED:
        return tassign(state, { isLoading: false });

    case QuizActions.GET_USER:
      return tassign(state, {user: action.payload });

    case QuizActions.SET_USER:
      return tassign(state, {user: action.payload});

    case QuizActions.CREATE_QUIZ:
      // Create a copy of the array with the original quiz objects + action.payload.
      // return a new state object.

      // Javascript spread operator (...)
      // state.quizzes.push(action.payload);
      // return state;
      // newState.push(action.payload);

      return tassign(state, { quizzes: [...state.quizzes, action.payload] });

    case QuizActions.CREATE_RATING:
      // action.payload: rating object, id of quiz
      // action.payload.rating
      // action.payload.quizId
      // How to add an object to an array within an object in an array.

      // //Perhaps this works? 30% chance of working...
      let quizToUpdate = state.quizzes.find(quiz => quiz._id === action.payload.quiz._id);
      let pos = state.quizzes.findIndex(quiz => quiz._id === action.payload.quiz._id);
      //console.log("payload", action.payload.rating)
      //let ratingArr = [...quizToUpdate.ratings, action.payload.rating];
      
      let quizArray = [...state.quizzes.slice(0, pos), action.payload.quiz, ...state.quizzes.slice(pos + 1)];
      //quizArray[pos].ratings = ratingArr;
      //console.log("ratingArr", ratingArr);
      //console.log("ratings", quizArray[pos].ratings)
      return tassign(state, { quizzes: quizArray });

    case QuizActions.UPDATE_QUIZ:
      // action.payload: new quiz object
      // How to replace an object in an array without mutating state.
      return

    case QuizActions.DELETE_QUIZ:
      // action.payload: id of the quiz
      // How to create a new array with a missing object from another array.
      //const newArray = state.quizzes.filter(quiz => quiz._id != action.payload);
      //console.log(newArray); 
      
      return tassign(state, { quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload.quizId) });


    case QuizActions.LOG_IN:
      return tassign(state, { isLoggedIn: action.payload });

    // state.isLoggedIn = action.payload; // No No! You cannot modify state in Redux!
    // return state;
    // Make a copy of the state
    // Change isLoggedIn variable in the copy.
    // Shallow copy of the state object and changes isLoggedIn of the copy.
    // return Object.assign({}, state, { isLoggedIn: action.payload });
    default:
      return state;
  }
}