import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Service } from '../model/Service';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }
  calculateCurrentEventForAvailablity(currentService,end) {  
 
    let start =  new Date(); 
    let daylist=[]
    for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    arr.map((v)=>v.toISOString().slice(0,10)).join("");
    for (let key in arr){    
      switch(arr[key].getDay()){
        case 0 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day0,orgin:'calculated'});  break;
        case 1 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day1,orgin:'calculated'});  break;
        case 2 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day2,orgin:'calculated'});  break;
        case 3 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day3,orgin:'calculated'});  break;
        case 4 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day4,orgin:'calculated'});  break;
        case 5 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day5,orgin:'calculated'});  break;
        case 6 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day6,orgin:'calculated'});  break;     
      }

    }  
    return daylist;
  }
   calculateCurrentEventBooking(currentService:Service,end) {   
     end = new Date(new Date().getTime()+currentService.maxAdvanceBookingDay * 24 * 60 * 60 * 1000) 
     console.log(end);
    let date = new Date();   
    // let start =  new Date(date.getFullYear(), date.getMonth(), date.getDate()-date.getDay()); 
    let start =  new Date(); 
    let daylist=[]
    for(var arr=[],dt=start; dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    arr.map((v)=>v.toISOString().slice(0,10)).join("");
    for (let key in arr){    
      switch(arr[key].getDay()){
        case 0 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day0,bookingSlot:currentService.day0bookingSlot,orgin:'calculated'});  break;
        case 1 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day1,bookingSlot:currentService.day1bookingSlot,orgin:'calculated'});  break;
        case 2 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day2,bookingSlot:currentService.day2bookingSlot,orgin:'calculated'});  break;
        case 3 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day3,bookingSlot:currentService.day3bookingSlot,orgin:'calculated'});  break;
        case 4 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day4,bookingSlot:currentService.day4bookingSlot,orgin:'calculated'});  break;
        case 5 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day5,bookingSlot:currentService.day5bookingSlot,orgin:'calculated'});  break;
        case 6 : daylist.push({date:moment(arr[key]).format('YYYY-MM-DD'),title:currentService.day6,bookingSlot:currentService.day6bookingSlot,orgin:'calculated'});  break;     
      }

    }  
    return daylist;
  }


  bookingslot(day,durationVar,restvar){
    let val = day.split(",") 
    let tempslot = [];
    let duration = durationVar * 60 *1000;
    let rest = restvar * 60 *1000;
    let interval = (duration + rest);
    for(let key in val){ 
      let date = val[key].split("-"); 
      let d1 = new Date("01/01/1970 " + date[0]).getTime();
      let d2 = new Date("01/01/1970 " + date[1]).getTime();  
      let totalslot  = Math.floor((d2-d1)/interval);
      for(let i=0; i<totalslot;i++){
        tempslot.push({time:moment(d1).format('h:mm a')+'-'+moment(d1+duration).format('h:mm a')});
        d1+=interval
      }

    }

    console.log(tempslot)
    return tempslot;
  }
}
