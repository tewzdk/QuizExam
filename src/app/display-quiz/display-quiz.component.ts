import { TempDataService } from './../service/temp-data.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { ActivatedRoute } from '@angular/router';
import { QuizActions } from '../quiz.actions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder,private tempData: TempDataService, private route: ActivatedRoute, private quizActions: QuizActions, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {

    //this.validForm = this.fb.group({});

    // Get the id from the url
    const id = this.route.snapshot.paramMap.get('id');

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
    //this.quiz.questions[1].options[1].correct;
    
    console.log(this.answer)
    console.log('complete quiz clicked');
  }

}
