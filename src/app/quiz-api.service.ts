import { Injectable } from '@angular/core';
import { Quiz } from './entities/quiz';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {
  private baseUrl: string = 'http://angular2api2.azurewebsites.net/api/internships';

  constructor(private http: HttpClient) { }
  
  createQuiz(quiz: Quiz) : Observable<any> {
    quiz.customerId = 'vape';
    quiz.created = new Date();
    return this.http.post(this.baseUrl, quiz);
  }

  getQuiz(id: string):Observable<Quiz> {
    return this.http.get<Quiz>(this.baseUrl+'/'+id)
  }

  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  updateQuiz(quiz: Quiz) : Observable<any> {
    quiz.customerId = 'vape';
    quiz.created = new Date();
    return this.http.post(this.baseUrl,quiz._id);
  }

  deleteQuiz(id: string) : Observable<any> {
    return this.http.delete(this.baseUrl+'/' + id, {responseType:"text"})
    
  }
  handleError(arg0: string): (err: any, caught: Observable<{}>) => never {
    throw new Error("Method not implemented.");
  }



}
