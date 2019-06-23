import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatCheckboxModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { DisplayQuizComponent } from './display-quiz/display-quiz.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { DisplayQuizzesComponent } from './display-quizzes/display-quizzes.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { QuizComponent } from './quiz/quiz.component';
import { AppState } from './store';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { rootReducer } from './store';
import { QuizPipe } from './quiz.pipe';
import { httpInterceptorProviders } from './http-interceptors';
import { DialogComponent } from './dialog/dialog.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { DisplayUserComponent } from './display-user/display-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DisplayQuizComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
    HomeComponent,
    PortalComponent,
    DisplayQuizzesComponent,
    CreateQuizComponent,
    QuizComponent,
    QuizPipe,
    DialogComponent,
    DisplayUserComponent
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule, BarRatingModule,
    NgReduxModule,   NgReduxRouterModule.forRoot(),
    MatGridListModule, MatRadioModule, MatMenuModule, 
    MatProgressSpinnerModule, MatIconModule, MatToolbarModule, 
    MatButtonModule, MatFormFieldModule, MatInputModule, 
    MatSnackBarModule, MatCardModule, MatDividerModule, 
    MatExpansionModule, MatCheckboxModule, MatDialogModule, 
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [httpInterceptorProviders, MatDatepickerModule, AuthGuard, AuthService,NgReduxModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]  
})
export class AppModule {
  constructor(private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,) {
   
    // this.ngRedux.configureStore(rootReducer, {});
    this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);

     ngReduxRouter.initialize(/* args */);  
 
 
  }
 
 }
