import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import * as firebase from 'firebase';
import { QuizActions } from '../quiz.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private ngRedux: NgRedux<AppState>, private action: QuizActions) {
    this.ngRedux.select(state => state.isLoggedIn).subscribe(result => {
      this.authService.isLoggedIn = result.isLoggedIn;

    
    });
  }
//UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("AuthGuard on duty here!");
      
      if(this.authService.authenticated) { return true;}
      else{
        this.router.navigate(['home/login'])
        return false;  // true => yes, you are allowed access, false means no!

      }

      /*
      if (this.authService.isLoggedIn) {
        return true;
      }
      */

  }
  
}
