import { QuizApiService } from './quiz-api.service';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Quiz, Rating } from './entities/quiz';

@Injectable({ providedIn: 'root'})
export class QuizActions {
constructor (
  private ngRedux: NgRedux<AppState>, private api: QuizApiService) {} 
  
  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_QUIZ: string = 'CREATE_QUIZ'; 
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ'; 
  static DELETE_QUIZ: string = 'DELETE_QUIZ'; 

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';
  static GET_QUIZ: string = 'GET_QUIZ';

  static CREATE_RATING: string = 'CREATE_RATING'; 

  getQuiz(quizId: string)  : void {
    this.ngRedux.dispatch({
      type: QuizActions.GET_QUIZ,
      payload: {quizId}
    });
  }

  removeQuiz(quizId: string) : void {
    this.ngRedux.dispatch({
      type: QuizActions.DELETE_QUIZ,
      payload: {quizId}
    });
  }
  getQuizzes() : void {
    this.ngRedux.dispatch({ type: QuizActions.GET_QUIZZES_LOADING }); // start a "spinner"

    // call the ws
    this.api.getAllQuizzes().subscribe(quizzes => {
      console.log(quizzes);
      console.log('Hello Svend')
      console.log(quizzes.filter(quiz => quiz.customerId === 'vape'));
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'vape')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });

    // this.ngRedux.dispatch({type: QuizActions.GET_QUIZZES_SUCCESS}) // We do not wait for the reponse
  }

  createRating(rating: Rating, quizId: string) {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_RATING,
      // payload: {rating: rating, quizId: quizId}
      payload: {rating, quizId}
    })
  }

  createQuiz(quiz: Quiz) :void {
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_QUIZ,
      payload: quiz
    }); 
  }

  setLoggedIn(isLoggedIn: boolean): void {
    console.log(isLoggedIn);
    this.ngRedux.dispatch({
      type: QuizActions.LOG_IN,
      payload: isLoggedIn
    });

  }
}
