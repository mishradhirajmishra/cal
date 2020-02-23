import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangeService {

  _themeLoad = new Subject<any>();
  themeLoad$ = this._themeLoad.asObservable(); 
  setThemeLoad(val:any){  
     this._themeLoad.next(val);    
   }
    constructor() { }
  }
  