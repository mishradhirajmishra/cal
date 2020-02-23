

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  helper = new JwtHelperService();
  ServerUrl:String=environment.url;
  errorData: {};
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { 
   }
  // ----------------------------------------------------------------------------

   logedIn(){
     var x=  localStorage.getItem('token');
     if(x){     
      var exp= this.helper.isTokenExpired(x);
      if(!exp){
        var token = this.helper.decodeToken(x);
        return token.role;
      }
     }
   }

   register(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'auth/register', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  emailExist(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'auth/emailExist', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  forgot(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'auth/forgot', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  login(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'auth/login', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  chkAuthariseUser(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'auth/chkAuthariseUser', formdata, this.httpOptions)
    .pipe(catchError(this.handleError)).subscribe(
      data => console.log(data.message),
      err => {
        if (err.errorCode == 401) {
          localStorage.removeItem('token');
          window.location.replace("login")
        }
      }
    );
  }
  // ----------------------------------------------------------------------------

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorCode: error.status,
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}