import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/users';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent{

  userData: FormGroup;

  private users: AngularFirestoreCollection<any>;

  constructor(private router: Router, private afs: AngularFirestore, private fb:FormBuilder) { 
    this.users = afs.collection<any>('users');
    this.userData = new FormGroup({
      name: new FormControl(''),
      phoneNo: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
    });
  }

  goToLoginPage(){
this.router.navigateByUrl('/authenticate/login');
  }

  saveUserData(){

    this.users.doc(this.userData.value.phoneNo).set(this.userData.value);
    this.router.navigateByUrl('/home')
  }

}
