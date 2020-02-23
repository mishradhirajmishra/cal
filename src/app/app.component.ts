import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calander';
  ngOnInit() {
    if(!localStorage.getItem('theme')){      
      localStorage.setItem('theme','success');
    }
  }
}
