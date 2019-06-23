import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss', './../app.component.scss']
})
export class PortalComponent implements OnInit {
  user: firebase.User;

  constructor(private auth: AuthService){

  }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe( user => {
      this.user = user;
    })
  }

  logout() {
    this.auth.logout2();
  }

}
