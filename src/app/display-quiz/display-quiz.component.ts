import { TempDataService } from './../service/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Quiz, Rating } from '../entities/quiz';
import { ActivatedRoute } from '@angular/router';
import { QuizActions } from '../quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../entities/user';
import { QuizApiService } from '../quiz-api.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {
  quiz: Quiz;
  answer: any;
  liste: boolean[];
  validForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,private tempData: TempDataService, private route: ActivatedRoute, 
    private quizActions: QuizActions, private ngRedux: NgRedux<AppState>, private quizApi: QuizApiService,
    private authService: AuthService) { }

  ngOnInit() {


    //this.validForm = this.fb.group({});

    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');
    //this.authService.getUser(this.authService.authState.uid)

    // Find the quiz object based on id
    //this.quiz = this.tempData.findQuiz(id);
    this.ngRedux.select(state => state.quiz).subscribe(result => {
      this.quiz = result.quiz;
      
      //console.log('Should be a quiz here: '+this.quiz);
    });
    
    this.quizActions.getQuiz(id);

    
    //console.log('Should be a quiz here: '+this.quiz);
    
    //findQuiz(searchForId: string) : Quiz {return this.quizzes.find(quiz => quiz._id === searchForId);}
    // Load the quiz in the html

  }

  picked(event: any) {
    console.log(event.value);
    this.answer = event.value;
  }
  
  quizComplete() {
    let rating = new Rating;
    rating.user = this.quiz.user;
    rating.grade = 5;
    this.quiz.ratings.push(rating)
    console.log('complete quiz clicked');
    
    this.quizApi.updateQuiz(this.quiz).subscribe(quizFromWs => {
      console.log(quizFromWs);
      this.quizActions.createRating(this.quiz);
      //this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      // Write some code for if the ws breaks.
      console.log("something bad happened", error);
      // this.quizActions.createQuizFailed(error);
    });

  }

  addRating() {

    
  }

}
