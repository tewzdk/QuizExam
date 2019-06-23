import { QuizApiService } from './quiz-api.service';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './store';
import { Quiz, Rating } from './entities/quiz';
import { AuthService } from './auth/auth.service';
import { User } from './entities/user';

@Injectable({ providedIn: 'root'})
export class QuizActions {
constructor (
  private ngRedux: NgRedux<AppState>, private api: QuizApiService, private authService: AuthService) {} 
  
  static LOG_IN: string = 'LOG_IN'; 
  static CREATE_QUIZ: string = 'CREATE_QUIZ'; 
  static UPDATE_QUIZ: string = 'UPDATE_QUIZ'; 
  static DELETE_QUIZ: string = 'DELETE_QUIZ'; 

  static GET_QUIZZES_LOADING: string = 'GET_QUIZZES_LOADING';
  static GET_QUIZZES_SUCCESS: string = 'GET_QUIZZES_SUCCESS';
  static GET_QUIZZES_FAILED: string = 'GET_QUIZZES_FAILED';
  static GET_QUIZ: string = 'GET_QUIZ';
  static GET_USER: string = 'GET_USER';
  static GET_USER_LOADING: string = 'GET_USER_LOADING';
  static GET_USER_FAILED: string = 'GET_USER_FAILED';
  static SET_USER: string = 'SET_USER'

  static CREATE_RATING: string = 'CREATE_RATING'; 

  getQuiz(quizId: string)  : void {
    this.ngRedux.dispatch({
      type: QuizActions.GET_QUIZ,
      payload: {quizId}
    });
  }


  removeQuiz(quizId: string) : void {
    console.log('remove quiz:',quizId)
    this.ngRedux.dispatch({
      type: QuizActions.DELETE_QUIZ,
      payload: {quizId}
    });
  }

  getUser(userId: firebase.auth.UserCredential): void{
    
    this.ngRedux.dispatch({
      
      type: QuizActions.GET_USER,
      payload: {userId}
    })
    
  }

  setUser(user): void {
    console.log('set user')
    //let user = this.authService.getUser(this.authService.authState.uid)
    this.ngRedux.dispatch({
      type: QuizActions.SET_USER,
      payload: {user}
    })
  }

  getQuizzes() : void {
    this.ngRedux.dispatch({ type: QuizActions.GET_QUIZZES_LOADING }); // start a "spinner"

    // call the ws
    this.api.getAllQuizzes().subscribe(quizzes => {
      //console.log(quizzes);
      //console.log(quizzes.filter(quiz => quiz.customerId === 'vape'));
      console.log('getting quizzes')
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_SUCCESS,
        payload: quizzes.filter(quiz => quiz.customerId === 'examsidney')
      })
    }, error => {
      this.ngRedux.dispatch({
        type: QuizActions.GET_QUIZZES_FAILED,
        payload: error
      })
    });

    // this.ngRedux.dispatch({type: QuizActions.GET_QUIZZES_SUCCESS}) // We do not wait for the reponse
  }

  createRating(quiz: Quiz) {
    console.log('creating rating')
    this.ngRedux.dispatch({
      type: QuizActions.CREATE_RATING,
      payload: {quiz}
    })
  }

  createQuiz(quiz: Quiz) :void {
    console.log('creating quiz')
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
