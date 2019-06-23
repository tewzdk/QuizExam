import { Injectable } from '@angular/core';
import { Quiz } from './entities/quiz';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
//    'Authorization': 'my-auth-token' // If you use auth.
  })
};

@Injectable({
  providedIn: 'root'
})

export class QuizApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';
  
  constructor(private http: HttpClient) {   
  }
  
  createQuiz(quiz: Quiz) : Observable<any> {
    quiz.customerId = 'examsidney';
    quiz.created = new Date();
    return this.http.post(this.baseUrl, quiz);
  }

  getQuiz(id: string):Observable<Quiz> {
    return this.http.get<Quiz>(this.baseUrl+'/'+id)
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  updateQuiz(quiz: Quiz) : Observable<Quiz> {
    quiz.customerId = 'examsidney';
    quiz.created = new Date();
    return this.http.put<Quiz>(this.baseUrl,quiz,httpOptions)
    .pipe(catchError(this.handleError)
    );
    //return this.http.put<void>(`${this.baseUrl}/${quiz._id}`,quiz, 
    //{headers: new HttpHeaders({'Content Type':'application/json'})})
  }

  deleteQuiz(id: string) : Observable<any> {
    return this.http.delete(this.baseUrl+'/' + id, {responseType:"text"})
  }
  /*
  handleError(arg0: string): (err: any, caught: Observable<{}>) => never {
    throw new Error("Method not implemented.");
  }
  */

 private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};



}
