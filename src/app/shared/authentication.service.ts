import { Injectable,NgZone,OnInit } from '@angular/core';
import { User } from "../shared/User";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
  userData: any;
  user:any;
  uid:string;
  email:string;
  obs:Observable<any>;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone ,
    public db: AngularFireDatabase
  ) {
    this.obs=this.afStore.collection('users').valueChanges();
  }
  ngOnInit(){
    this.GetCurrentUser(); 
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid;
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    


  }
       //getting current user uid
       GetCurrentUser(){
        return this.ngFireAuth.currentUser.then( u=> 
        this.uid= u.uid )
     }
     //getting current user data
  GetUserStatus(){
    this.GetCurrentUser();
    return this.obs;
  }
    // Login in with email/password
    SignIn(email, password) {
      return this.ngFireAuth.signInWithEmailAndPassword(email, password);
    }
  
    RegisterUser(email, password) {
      return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  
    }
  
    // Email verification when new user register
    SendVerificationMail() {
      return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['sign-up-confirm']);
      })
    }
  
    // Returns true when user is looged in
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    }
    
  
     // Sign-out 
     SignOut() {
      return this.ngFireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['home']);
      })
    }
  
    //Adding New User in collection users
    SetUserData(user) {
      this.GetCurrentUser();
      const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`/users/`+this.uid);
      const userData: User = {
        uid: user.uid,
        email: user.email,
      }
      return userRef.set(userData, {
        merge: true
      })
    }

    // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


}
