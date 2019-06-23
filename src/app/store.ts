import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { quizReducer } from './quiz.reducer';
import { Quiz } from './entities/quiz';
import { User} from './entities/user';

export class QuizState {
  isLoggedIn: boolean;
  quizzes: Quiz[];
  isLoading: boolean;
  quiz: Quiz;
  user: User;
  // errorMessage: string;
}
export class AppState {
  quizzes?: QuizState;
  quiz?: QuizState;
  isLoggedIn?: QuizState;
  user?: QuizState;
}
export const rootReducer = combineReducers<AppState>({
  quizzes: quizReducer,
  quiz: quizReducer,
  router: routerReducer,
  isLoggedIn:quizReducer,
  user: quizReducer
} as any);
