import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { quizReducer } from './quiz.reducer';
import { Quiz } from './entities/quiz';

export class QuizState {
  isLoggedIn: boolean;
  quizzes: Quiz[];
  isLoading: boolean;
  quiz: Quiz;
  // errorMessage: string;
}
export class AppState {
  quizzes?: QuizState;
  quiz?: QuizState;
}
export const rootReducer = combineReducers<AppState>({
  quizzes: quizReducer,
  quiz: quizReducer,
  router: routerReducer
} as any);
