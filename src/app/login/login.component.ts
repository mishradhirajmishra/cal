import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  theme:string;
  title:string ='Login';
  constructor(private router:Router,private as:AuthService,private toastr :ToastrService) { }

  ngOnInit() {
    this.theme=localStorage.getItem('theme');
  }
  login(data:NgForm){      
     this.as.login(data.value).subscribe(
      data =>{ 
        if(data.token){
          localStorage.removeItem('token');
          localStorage.setItem('token',data.token);
          window.location.replace("admin")  
          this.toastr.success( data.message);      
           
        }
        else{
          this.toastr.error( data.message);             
        }
      } ,
      err => console.log(err) 
    )
  }


}
