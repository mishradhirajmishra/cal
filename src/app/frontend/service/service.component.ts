import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../shared/backend.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { OtherService } from 'src/app/shared/other.service';
import { Service } from '../../model/Service';
import { ThemeChangeService } from 'src/app/shared/theme-change.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  @ViewChild('model', { static: true }) model: ElementRef;
  invalidStartDate: Boolean;
  invalidEndDate: Boolean;
  maxPersonErr: boolean = false;
  maDurationErr: boolean = false;
  maxAdvanceBookingDayErr: boolean = false;
  closeModel: boolean = false;
  today: string = moment().format('YYYY-MM-DD');
  userId: string;
  allService: Service[];
  theme: string;
  thisMonth: 'This Month'
  service = new Service
  constructor(private router: Router, private bs: BackendService, private os: OtherService,private themeChangeService:ThemeChangeService) { }
  ngOnInit() {
    this.userId = this.bs.token().id;
    this.allServiceOfUser();
    this.theme = localStorage.getItem('theme');
    this.themeChange();
  }
  themeChange(){
    this.themeChangeService.themeLoad$.subscribe(
      data =>this.theme = data
    )
  }

  allServiceOfUser() {
    this.bs.allServiceOfUser({ userId: this.userId }).subscribe(
      data => { this.allService = data; console.log(data) },
      err => { console.log(err) }
    )
  }

  addService() {
    let newService = new Service();
    newService.duration = 50;
    newService.rest = 10;
    newService.price = 100;
    newService.name = 'New Service';
    newService.userId = this.userId;
    newService.maxAllowed = 1;
    newService.startDate = this.today;
    newService.maxAdvanceBookingDay = 30; this.bs.addService(newService).subscribe(
      data => {
        this.allServiceOfUser();
        this.os.swall('success', data.message);
      },
      err => { console.log(err) }

    );
  }

  updateService(data: NgForm) {
    data.value.userId = this.service.userId;
    data.value._id = this.service._id;
    this.bs.updateService(data.value).subscribe(
      data => {
        this.allServiceOfUser();
        this.os.swall('success', data.message);

      },
      err => { console.log(err) }

    );
  }

  edit(data: any) {
    console.log(data);
    this.service = data;
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
        this.bs.deleteService({ id: id }).subscribe(
          data => { this.allServiceOfUser(); this.os.swall(data.type, data.message); },
          err => { console.log(err) }
        );
      }
    })

  }
  avilablity(id: string) {
    this.router.navigate(['/admin/avilablity/' + id])
  }
  duplicate(data: any) {
    delete data['_id'];
    this.bs.dupService(data).subscribe(
      data => {
        this.allServiceOfUser();
        this.os.swall('success', data.message);
      },
      err => { console.log(err) }

    );
  }


  validateMaxPerson(maxAllowed: Number) {
    if (maxAllowed <= 0) {
      this.maxPersonErr = true;
    } else {
      this.maxPersonErr = false;
    }

  }

  validatemaxAdvanceBookingDay(maxAdvanceBookingDay: Number) {
    if (maxAdvanceBookingDay < 30) {
      this.maxAdvanceBookingDayErr = true;
    } else {
      this.maxAdvanceBookingDayErr = false;
    }

  }

  validateDuration(duration: any, rest: any) {
    var totalPeriod = duration + rest;
    console.log(totalPeriod)
    if ((totalPeriod > 1440) || (rest < 0) || (duration < 0)) {
      this.maDurationErr = true;
    } else {
      this.maDurationErr = false;
    }
  }

  validateStartDate(startDate: Date) {
    let today = new Date(this.today);
    let sDate = new Date(startDate);
    if (sDate.getTime() < today.getTime()) {
      this.invalidStartDate = true;
    } else {
      this.invalidStartDate = false;
    }
  }

  validateEndDate(startDate: Date, endDate: Date) {
    let eDate = new Date(endDate);
    let sDate = new Date(startDate);
    if (sDate.getTime() > eDate.getTime()) {
      this.invalidEndDate = true;
    } else {
      this.invalidEndDate = false;
    }
  }
}
