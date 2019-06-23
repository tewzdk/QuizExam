import { Injectable } from '@angular/core';

import { Observable, of,BehaviorSubject} from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { QuizActions } from '../quiz.actions';

import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../entities/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userCollection: AngularFirestoreCollection<User>;
  user: Observable<User>;
  
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  authState: any = null;
  loggedUser: User;

  constructor(
     
    private ngRedux: NgRedux<AppState>, 
    private afAuth: AngularFireAuth, 
    private router: Router,
    private db: AngularFirestore) {

    this.ngRedux.select(state => state.isLoggedIn).subscribe(result => {
      afAuth.authState.subscribe((auth) =>{
        this.authState = auth;
        if(auth) {
          this.user = this.db.collection('Users').doc(this.authState.uid).valueChanges()
        }        
      });
      this.isLoggedIn = result.isLoggedIn;
    });
    

  }
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  currentUserObservable(): boolean {
    if(this.authState){
      return true
    } else{
      return false
    }
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  login(): Observable<boolean> {
      // Here, we want to call a webservice to log in.


    return of(true).pipe(
      delay(1000),
      tap(val => {
        console.log("logged in!");
        //this.quizActions.setLoggedIn(true);
        //this.isLoggedIn = true
      })
    );
  }
    getUserState() {
    return this.afAuth.authState;
  }

  login2( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          //this.isLoggedIn = true;
          this.router.navigate(['/portal/display-quizzes']);
        } else{

        }
      });
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  logout2() {
    //this.isLoggedIn = false;
    //this.userActions.setLoggedIn(false);
    this.router.navigate(['/home/login']);
    return this.afAuth.auth.signOut();
  }

  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.fullName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/portal/display-quizzes']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      _id: userCredential.user.uid,
      email: this.newUser.email,
      fullname: this.newUser.fullName,
      gender: this.newUser.gender,
      birthdate: this.newUser.birthDate
    })
  }

  getUser() {
    return this.user;
    //return this.db.doc(`Users/${userCredential.user.uid}`).snapshotChanges();
    //return this.db.doc(`Users/${id}`).snapshotChanges();
  }

}