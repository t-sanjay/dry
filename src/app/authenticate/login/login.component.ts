import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  applicationVerifier: any;
  constructor(public auth: AngularFireAuth) { }

  ngOnInit() {

  }
  
  login(){
    this.applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phoneNumber = '+917058677407';
    firebase.auth().signInWithPhoneNumber(phoneNumber, this.applicationVerifier)
    .then((confirmationResult) => {
      var verificationCode = window.prompt('Please enter the verification ' +
          'code that was sent to your mobile device.');
      return confirmationResult.confirm(verificationCode);
    })
    .catch((error) => {
      // Handle Errors here.
    });
  }

}
