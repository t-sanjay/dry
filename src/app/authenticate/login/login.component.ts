import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  applicationVerifier: any;

  showOtpPage: boolean = false;

  existingUser = true;

  otpSent = false;

  isOtpValid = true;


  constructor(public auth: AngularFireAuth, private alertController: AlertController, private router: Router, private activatedRoute: ActivatedRoute) { }
  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }

  // Button event after the nmber is entered and button is clicked
  async signinWithPhoneNumber($event) {
    if (this.PhoneNo && this.CountryCode) {
      if(this.checkForExisitingUser){
        this.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
          success => {
            this.otpSent = true;
          }
        );
      }
    }
  }

  checkForExisitingUser(phoneNumber){

  }

  verifyOtp($event){
    // console.log(this.OTP);
    this.enterVerificationCode(this.OTP).then((userData) =>{
      console.log(userData);
      this.isOtpValid = true;
      if(userData.additionalUserInfo.isNewUser){
        this.router.navigateByUrl('/authenticate/signup');
      }else{
        this.router.navigateByUrl('/home');
      }
    },
    (err) =>{
      console.log(err);
      this.isOtpValid = false;
    }
    )
  }

  
  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return new Promise<any>((resolve, reject) => {

      this.auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }
  public async enterVerificationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        console.log(result);
        const user = result;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }


}
