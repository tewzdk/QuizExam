import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>(); 

  constructor(private quizActions: QuizActions, public dialog: MatDialog, private quizApi: QuizApiService, private router: Router) { }

  ngOnInit() {
  }

  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.removeQuiz();
      }
    });
  }
  removeQuiz() {
    console.log('1')
    this.quizApi.deleteQuiz(this.quizInput._id).subscribe(x => {
      console.log('2')
      
      this.quizActions.removeQuiz(this.quizInput._id);
      //this.router.navigate(['/portal/display-quizzes']);
    }, error => {
      console.log("something bad happened", error);
    });
    console.log('3')
  }

}