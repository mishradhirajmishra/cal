import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGrigPlugin from '@fullcalendar/timegrid';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { BackendService } from 'src/app/shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../model/Service';
import { OtherService } from 'src/app/shared/other.service';
import { ThemeChangeService } from 'src/app/shared/theme-change.service';
import { CalculateService } from 'src/app/shared/calculate.service';
@Component({
  selector: 'app-avilablity',
  templateUrl: './avilablity.component.html',
  styleUrls: ['./avilablity.component.scss']
})
export class AvilablityComponent implements OnInit {
  eventTitle: string;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  currentCalendarEvent ={ title: '9:30AM - 3:40PM ', date: '' };
  calendarEvents = [];  
  calculatedCalendarEvents = [];  
  allService:Service[];  
  theme: string;
  userId: any;
  serviceId: string;
  endDate = new Date('2050-12-31');
  currentService =new Service;
  constructor(
    private router:Router, 
    private bs: BackendService,
     private os:OtherService,
     private calc:CalculateService,
      private actroute: ActivatedRoute,
      private themeChangeService:ThemeChangeService
      ) { }
  ngOnInit() {
    this.getId();
    this.theme = localStorage.getItem('theme');
    this.userId = this.bs.token().id;  
    this.themeChange();
  }
  themeChange(){
    this.themeChangeService.themeLoad$.subscribe(
      data =>this.theme = data
    )
  }
  getId() {
    this.actroute.paramMap.subscribe(params => {
      this.serviceId = params.get('id');    
      this.allServiceOfUser();  
      });
  }
  getAllAvilablity() { 
    this.calendarEvents=this.calc.calculateCurrentEventForAvailablity(this.currentService,this.endDate);
    this.bs.allAvilablity({ serviceId: this.currentService._id }).subscribe(
      data => {   console.log(data)    
          const res = this.calendarEvents.filter(({date:a}) => !data.some(({date:b}) => a === b));
          this.calendarEvents= data.concat(res);                 
         },
      err => { console.log(err) }
    )
  }

  allServiceOfUser() {
    this.bs.allServiceOfUser({ userId: this.userId }).subscribe(
      data => { this.allService = data; this.getCurrentService();          
      },
      err => { console.log(err) }
    )
  }


  getCurrentEvent() {0
    this.currentService = this.allService.filter(p => p._id == this.serviceId)[0];
  }


  getCurrentService() {
    this.currentService = this.allService.filter(p => p._id == this.serviceId)[0];   
       this.getAllAvilablity()
  }



  async handleDateClick(arg) {
    if(this.compareDate(arg.dateStr)){ 
      let inputValue = await this.getCurrentCalendarEvent(arg.dateStr);
      if(!inputValue){inputValue=''}
     const { value: value } = await Swal.fire({
      title: 'Enter availability',
      input: 'textarea',
      inputValue:inputValue,
      inputPlaceholder: 'Enter availability like: 9:00am-12:30pm, 1:30pm-6pm',
      showCancelButton: true,
      confirmButtonText: 'Next &rarr;',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else{
          if(!this.validateDate(value)){
            return 'Invalid Date String!'
          }
        }
      },
      customClass: {
        popup: 'swal-popup-class del-popup-size',
        header: 'header-class',
        title: 'title-class',
        image: 'image-class',
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      },
    })

    if (value) {
       let val = this.validateDate(value);      
        const { value: range } = await Swal.fire({
          html: val + ' <br>( apply to )',
          input: 'radio',
          confirmButtonText: 'Apply',
          confirmButtonColor: '#f16857',
          inputOptions: {
            currentDay: 'Current Day',       
            thisWeek: 'This Week',
            thisMonth: 'This Month',
          },
          customClass: {
            popup: 'swal-popup-class del-popup-size',
            header: 'header-class',
            title: 'title-class',
            image: 'image-class',
            actions: 'actions-class',
            confirmButton: 'confirm-button-class',
            cancelButton: 'cancel-button-class',
          },
          inputValidator: (value) => {
            if (!value) {
              return 'You need to choose something!'
            }
          }
        })
        if (range) {       
          let  ev =this.eventRange(val,range,new Date(arg.dateStr));
      
          this.bs.updateAvilablity(ev).subscribe(
            data => { this.getAllAvilablity();
              this.os.swall('success',data.message);;
              },
            err => { console.log(err)  }
          )
        }
      
       }
  }else{
     this.os.notAllowDateRange();
    }
  }

  validateDate(value){
    if(value.toLowerCase() == 'closed'){
      return 'Closed';
    }else{
    let reg = /^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))-((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))?$/;
    let val = value.toUpperCase().replace(/ +/g, "").replace(/AM/g," AM").replace(/PM/g," PM").split(",") 
    let finalDate = '';
    for(let key in val){ 
       let date = val[key].split("-"); 
        if(date.length==2){
          date[0]= this.reconstructDate(date[0]);
          date[1]= this.reconstructDate(date[1]);
          let d =  date[0] + '-' + date[1];
             if(reg.test(d)){            
            let d1 = new Date("01/01/1970 " + date[0]).getTime();
            let d2 = new Date("01/01/1970 " + date[1]).getTime();                 
            if(d1<d2 && ((d2-d1) > this.currentService.rest*60000 )){  
              finalDate +=d+',';           
            }
          }
        }     
    }
    return finalDate.substring(0, finalDate.length-1);
  }
  }
 
  reconstructDate(date){
    if(date.search("AM")== -1 && date.search("PM")==-1){
       if(date.search(":") == -1){
        date = date + ':00 AM'; 
       }else{
        let temp = date.split(":");
        if(temp[1].length==1){
          date = date + '0 AM'; 
        }else{
          date = date + ' AM'; 
        }      
       }       
    }else{
      if(date.search(":") == -1){
        let temp = date.split(" ");
        temp[0]=  temp[0] + ':00'; 
        date = temp[0]+" "+temp[1]; 
       }  
    }    
    return date;
  } 

   compareDate(selectedDate){
     let currentDate = new Date(selectedDate).getTime();
     let startDate;
     let endDate ;
     let today = moment(new Date()).format('YYYY-MM-DD');     
     if(new Date(this.currentService.startDate).getTime() < new Date(today).getTime()){
      startDate=new Date(today).getTime();
     }else{
       startDate=new Date(this.currentService.startDate).getTime();
     }  

     if(this.currentService.endDate)   {
      endDate = new Date(this.currentService.endDate).getTime();
     }else{
      endDate = this.endDate.getTime();
     }
   
     if((startDate <= currentDate)&& (currentDate<= endDate)){
      return true;
     }else{
       return false;
     }
   }


   async getCurrentCalendarEvent(date) {
    this.currentCalendarEvent = this.calendarEvents.filter(p => p.date == date)[0];
    if(this.currentCalendarEvent){
      return this.currentCalendarEvent.title;
    }else{
      return ''
    } 
  }

  eventRange(title:string,range:string,date:Date) {
    let dates = [];
    switch(range) {
      case 'currentDay':  dates.push({date:moment(date).format('YYYY-MM-DD'),title:title,userId:this.userId,serviceId:this.currentService._id,bookingSlot:this.calc.bookingslot(title,this.currentService.duration,this.currentService.rest)}); break;          
      case 'thisWeek':  dates = this.getDaysArray(new Date(date.getFullYear(), date.getMonth(), date.getDate()-date.getDay()),new Date(date.getFullYear(), date.getMonth(), date.getDate()-date.getDay()+6),title); break; 
      case 'thisMonth':dates = this.getDaysArray(new Date(date.getFullYear(), date.getMonth(), 1),new Date(date.getFullYear(), date.getMonth()+1, 0),title);break;
    }
    // console.log(dates);
    return dates;
  }

  getDaysArray(start:Date,end:Date,title:string,sorce='') {  
     if(start.getTime()< new Date().getTime()){
       start = new Date()
     }
    let daylist=[]
    for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    arr.map((v)=>v.toISOString().slice(0,10)).join("");
    for (let key in arr){    
      daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:title,userId:this.userId,serviceId:this.currentService._id,bookingSlot:this.calc.bookingslot(title,this.currentService.duration,this.currentService.rest)})  
    } 
    // console.log(daylist);
    return daylist;
  }


/*=================== Regular Hours Every Week ===================*/

  async enterWeekData(data, id: string, day: string) {
    if(!data){data=''}
    const { value: value, dismiss:dismiss } = await Swal.fire({
      title: 'Enter availability',
      input: 'textarea',
      inputValue: data,
      inputPlaceholder: 'Enter availability like: 9:00am-12:30pm, 1:30pm-6pm',
      showCancelButton: true,
      confirmButtonText: 'Update', 
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else{
          if(!this.validateDate(value)){
            return 'Invalid Date String!'
          }

        }
      },
      customClass: {
        popup: 'swal-popup-class del-popup-size',
        header: 'header-class',
        title: 'title-class',
        image: 'image-class',
        actions: 'actions-class',
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
      },
    })

    if (value) {
      let val = this.validateDate(value);
      if (val) {
        var ss;
        switch (day) {
          case 'day0': ss = this.bs.updateService({ _id: id, day0: val ,day0bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest) }); break;
          case 'day1': ss = this.bs.updateService({ _id: id, day1: val ,day1bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest)  }); break;
          case 'day2': ss = this.bs.updateService({ _id: id, day2: val ,day2bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest) }); break;
          case 'day3': ss = this.bs.updateService({ _id: id, day3: val ,day3bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest)  }); break;
          case 'day4': ss = this.bs.updateService({ _id: id, day4: val ,day4bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest)  }); break;
          case 'day5': ss = this.bs.updateService({ _id: id, day5: val ,day5bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest)  }); break;
          case 'day6': ss = this.bs.updateService({ _id: id, day6: val ,day6bookingSlot:this.calc.bookingslot(val,this.currentService.duration,this.currentService.rest)  }); break;
        }
        ss.subscribe(
          data => {
            this.allServiceOfUser();
            this.os.swall('success',data.message);
          },
          err => { console.log(err) }
        );
      }
    }
  }


  
 

}
