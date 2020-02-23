import { Component, OnInit, Input } from '@angular/core';
import { ThemeChangeService } from 'src/app/shared/theme-change.service';
import { Service } from 'src/app/model/Service';
import { BackendService } from 'src/app/shared/backend.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 @Input() hideSidebar;
 allService:Service[];   
  theme:String;
  userId: any;
  constructor(private themeChangeService:ThemeChangeService, private bs: BackendService) { }

  ngOnInit() {
  this.theme=localStorage.getItem('theme');   
  this.themeChange();
  this.userId = this.bs.token().id;  
  this.allServiceOfUser()
  }
  themeChange(){
    this.themeChangeService.themeLoad$.subscribe(
      data =>this.theme = data
    )
  }

  allServiceOfUser() {
    this.bs.allServiceOfUser({ userId: this.userId }).subscribe(
      data => { this.allService = data;        
      },
      err => { console.log(err) }
    )
  }
}
