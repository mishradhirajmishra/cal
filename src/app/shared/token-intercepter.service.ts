import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService  implements HttpInterceptor {

  constructor(private router:Router) {}
  authToken = localStorage.getItem('token');
  intercept(req, next) {
   let   tokenreq = req.clone({
          setHeaders:
               { Authorization: `Bearer ${this.authToken}` }
           }
       );
      return next.handle(tokenreq);      
  }
}
