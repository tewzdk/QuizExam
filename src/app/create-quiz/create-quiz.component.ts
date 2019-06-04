import { QuizApiService } from './../quiz-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TempDataService } from '../service/temp-data.service';
import { Quiz } from '../entities/quiz';
import { Router } from '@angular/router';
import { Gender } from '../entities/user';
import { QuizActions } from '../quiz.actions';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;

  constructor(private fb: FormBuilder, private data: TempDataService,
    private router: Router, private quizActions: QuizActions, private quizApi: QuizApiService) { }

  saveQuiz() {
    // console.log(this.createQuiz.value);
    // save a user who created this quiz.
    // hardcode a user until we have a proper login.
    let quiz = this.createQuiz.value as Quiz;
    quiz.user = {  // Hardcoded. We remove when we have a proper login
      _id: '1', 
      username: 'Veronique', 
      email: 'v@ve.dk', 
      gender: Gender.FEMALE, 
      birthDate: undefined 
    };

    console.log("1");
    this.quizApi.createQuiz(quiz).subscribe(quizFromWs => {
      console.log(quizFromWs);
      console.log("3");
      this.quizActions.createQuiz(quizFromWs);
      this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      // Write some code for if the ws breaks.
      console.log("something bad happened", error);
      // this.quizActions.createQuizFailed(error);
    });
    console.log("2");
    // this.data.saveQuiz(quiz);    
  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    questions.push(question);
  }
  removeQuestion(questionIndex: number) {
    const questions = this.createQuiz.controls.questions as FormArray;
    questions.removeAt(questionIndex);
    console.log(questions)
  }
  createNewOption(questionIndex: number){
    const option = this.createNewOptionGroup();
    const questions = this.createQuiz.controls.questions as FormArray;

    const options = (<FormArray>questions.controls[questionIndex]).controls['options'] as FormArray;
    console.log(option);
    options.push(option);
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const questions = this.createQuiz.controls.questions as FormArray;
    const options = (<FormArray>questions.controls[questionIndex]).controls['options'] as FormArray;
    console.log(options);
    options.removeAt(optionIndex);
  }

  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }


  ngOnInit() {
    this.createQuiz = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
    })
  }
}
