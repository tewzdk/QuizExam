import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Gender } from '../entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authError: any;
  registerForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
      if(data){
        if(data){
          this.snackBar.open(data,'close',{duration: 3000})
        }
      }
    });
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required,Validators.minLength(2)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      gender: [''],
      birthDate: ['', Validators.required]
    })
  }

  onSubmit() : void {
    console.log(this.registerForm)

    if(this.registerForm.valid) {
      this.auth.createUser(this.registerForm.value)
    }
  }

}
