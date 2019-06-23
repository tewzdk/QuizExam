import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Quiz } from '../entities/quiz';
import { QuizActions } from '../quiz.actions';
import { QuizApiService } from '../quiz-api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { User } from '../entities/user';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  @Input() quizInput: Quiz;
  @Output() quizClicked: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  user: User; 
  sameUser: boolean;

  constructor(private quizActions: QuizActions, public dialog: MatDialog, 
    private quizApi: QuizApiService, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.authService.getUser().subscribe(user =>{
      this.user = user;
      console.log(user)
      if(this.user._id == this.quizInput.user._id) {
        this.sameUser = true;
        console.log('changed boolean', this.sameUser)
      }
    });
  }

  emitQuizClicked() {
    this.quizClicked.emit(this.quizInput);
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: "Are you sure you want to delete this quiz?"
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