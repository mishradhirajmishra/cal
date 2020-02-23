import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { PassCompare } from '../custom-Validators/password';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title:String='Register';
  emailErr:string;
  theme:string;
  constructor(private router: Router, private fb: FormBuilder,private as:AuthService,private toastr :ToastrService) {
    this.password.valueChanges.subscribe(
      x => this.cpassword.updateValueAndValidity()
    )
  }
 
  ngOnInit() {
    this.theme=localStorage.getItem('theme');
  }

  // ********************* form Validation *************


  get username() {
    return this.userProfile.get('username');
  }
  get email() {
    return this.userProfile.get('email');
  }
  get password() {
    return this.userProfile.get('password');
  }
  get cpassword() {
    return this.userProfile.get('cpassword');
  }

  // *********************************
  userProfile = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    cpassword: ['', [Validators.required, PassCompare]]    
  })
  updateProfile() {
   this.as.register(this.userProfile.value).subscribe(
     data =>{
      this.toastr.success( data.message);        
        this.router.navigate(['../login']);
     } ,
     err => console.log(err)
   )
  
  }
  emailExist(email:any){    
   if(!email.errors){
    this.as.emailExist({email:email.value}).subscribe(
     data =>{ this.emailErr=data.message} ,
     err => console.log(err)
   )
  }
 }

}
