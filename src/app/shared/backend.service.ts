import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  helper = new JwtHelperService();
  ServerUrl:String=environment.url;
  errorData: {};
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  httpOptions2 = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
  constructor(private http: HttpClient) { 
   }
 

  token(){ 
  let authToken = localStorage.getItem('token');
  return this.helper.decodeToken(authToken);
  }


/* ======================================================= */
/*                       SERVICE                           */
/* ======================================================= */
  addService(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/addService', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  dupService(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/dupService', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }

  allServiceOfUser(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/allServiceOfUser', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  deleteService(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/deleteService', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }

  updateService(formdata:any) {
   
    return this.http.post<any>(this.ServerUrl + 'service/updateService', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  serviceById(id:string) {
    return this.http.get<any>(this.ServerUrl + 'service/'+id).pipe(catchError(this.handleError));
  }
 
/* ======================================================= */
/*                       CALENDAR                          */
/* ======================================================= */
  addCalendar(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/addCalendar', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  dupCalendar(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/dupCalendar', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }

  allCalendarOfUser(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/allCalendarOfUser', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }
  deleteCalendar(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/deleteCalendar', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }

  updateCalendar(formdata:any) {
    return this.http.post<any>(this.ServerUrl + 'service/updateCalendar', formdata, this.httpOptions).pipe(catchError(this.handleError));
  }

  
/* ======================================================= */
/*                       AVILABLITY                       */
/* ======================================================= */

updateAvilablity(formdata:any) {
  return this.http.post<any>(this.ServerUrl + 'service/updateAvilablity', formdata, this.httpOptions).pipe(catchError(this.handleError));
}

allAvilablity(formdata:any) {
  return this.http.post<any>(this.ServerUrl + 'service/allAvilablity', formdata, this.httpOptions).pipe(catchError(this.handleError));
}

allAvilablityforBooking(formdata:any) {
  return this.http.post<any>(this.ServerUrl + 'service/allAvilablityforBooking', formdata, this.httpOptions).pipe(catchError(this.handleError));
}

/* ======================================================= */
/*                      ERROR hANDLING                     */
/* ======================================================= */
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
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}