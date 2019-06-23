import { QuizActions } from './../quiz.actions';
import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './../app.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;
  user: firebase.User;

  constructor(private quizActions: QuizActions, private ngRedux: NgRedux<AppState>,private auth: AuthService) { }

  ngOnInit() {
    this.ngRedux.select(state => state.quizzes).subscribe(res => {
      // When notified
      this.loggedIn = res.isLoggedIn; 
    });

    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
    });
 
  }

  logout() {
    this.auth.logout2();
  }

  onLogoutClick() {
    this.quizActions.setLoggedIn(false);
  }
}
