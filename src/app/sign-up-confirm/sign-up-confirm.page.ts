import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import {  Router } from "@angular/router";
import { User } from '../shared/user';


@Component({
  selector: 'app-sign-up-confirm',
  templateUrl: './sign-up-confirm.page.html',
  styleUrls: ['./sign-up-confirm.page.scss'],
})
export class SignUpConfirmPage implements OnInit {
  currentUser:User={
    uid:'',
    email:'',

  };
  constructor(private auth:AuthenticationService, private router: Router) {

     }

  ngOnInit() {
    this.auth.GetCurrentUser();
  }

  OnResend(){
   // this.auth.SendVerificationMail();
  }

  onNext(){
    this.auth.GetCurrentUser();
    this.currentUser.uid=this.auth.uid;
    this.currentUser.email=this.auth.email;
    console.log(this.currentUser.uid);
    this.auth.SetUserData(this.currentUser);
    console.log('done');
    this.router.navigate(['index']);
  }

}
