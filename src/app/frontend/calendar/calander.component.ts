import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import Swal from 'sweetalert2'
import { OtherService } from 'src/app/shared/other.service';
import { Calander } from 'src/app/model/Calander';
import { Service } from 'src/app/model/Service';
import { ThemeChangeService } from 'src/app/shared/theme-change.service';


@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.scss']
})
export class CalanderComponent implements OnInit {

  userId: string;
  allCalendar: Calander[];
  allService: Service[];
  theme:string;
  calendar = new Calander;

  constructor(private bs: BackendService, private os: OtherService,private themeChangeService:ThemeChangeService) { }
  ngOnInit() {
    this.theme=localStorage.getItem('theme');
    this.userId = this.bs.token().id;  
    this.allCalendarOfUser();
    this.allServiceOfUser();
    this.themeChange();
  }
  themeChange(){
    this.themeChangeService.themeLoad$.subscribe(
      data =>this.theme = data
    )
  }
  edit(data: any) {   
    var x =0;
    this.calendar = data; 
    // for (var key in this.allService) {
    //   this.allService[key].value =true; x++;
    // }
    // for(let i=0; i<this.allService.length; i++){
    //   //  x.push({_id:"sdxcsac",name:'sdsfd'})
    //   console.log(this.allService[i])
    // }
    // console.log(this.allService)
  }
  updateCalendar(data: NgForm) {   
    data.value.userId = this.calendar.userId;
    data.value._id = this.calendar._id;   
    var serv = [];   var i:number=0;   
    for (var key in data.value.service) {
      if (data.value.service[key] === true) { serv[i++]=key; } 
    }
    data.value.service = serv;       
    this.bs.updateCalendar(data.value).subscribe(
      data => { this.allCalendarOfUser(); this.os.swall('success',data.message);},
      err => { console.log(err) }
    );
  }

  allCalendarOfUser() {
    this.bs.allCalendarOfUser({ userId: this.userId }).subscribe(
      data => { this.allCalendar = data;  },
      err => { console.log(err) }
    )
  }

  allServiceOfUser() {
    this.bs.allServiceOfUser({ userId: this.userId }).subscribe(
      data => { this.allService = data; },
      err => { console.log(err) }
    )
  }

  addCalendar() {
    var newCalendar =new Calander;
    newCalendar.name='New Calendar';
    newCalendar.userId=this.userId;
    newCalendar.description="New Calendar description";

    this.bs.addCalendar(newCalendar).subscribe(
      data => { this.allCalendarOfUser();this.os.swall('success',data.message);},
      err => { console.log(err) }

    );
  } 

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',  
      customClass: {
        popup: 'swal-popup-class del-popup-size',
        header: 'header-class',
        title: 'title-class',
        image: 'image-class',
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      },
    }).then((result) => {
      if (result.value) {
        this.bs.deleteCalendar({ id: id }).subscribe(
          data => {this.allCalendarOfUser(); this.os.swall(data.type,data.message);},
          err => { console.log(err) }
        );
      } 
    })

  }
  duplicate(data: any) {
    delete data['_id'];
    this.bs.dupCalendar(data).subscribe(
      data => {this.allCalendarOfUser(); this.os.swall('success',data.message);},
      err => { console.log(err) }
    );
  }
  serviceModel(service,id){
    for(let key in service){    
      if(service[key]._id==id){
       return true;
      }
    }
  }

}
