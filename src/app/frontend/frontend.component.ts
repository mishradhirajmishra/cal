import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeChangeService } from '../shared/theme-change.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit {
  hideSidebar:boolean=false; 
  constructor(private router:Router,private themeChangeService:ThemeChangeService) { }

  ngOnInit() {
  
  }
  getMessage(message:any) {

  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  toggleSidebar(){
    if(this.hideSidebar){
    this.hideSidebar =false;     
    }else{
      this.hideSidebar =true;      
    }   
  }
  addTheme(theme:string){
    localStorage.setItem('theme',theme);
    this.themeChangeService.setThemeLoad(theme);
    // location.reload();
  }
}
