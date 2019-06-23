import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.getUser().subscribe(user =>{
      this.user = user;
      console.log(user)
    });
  }

}
