import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor() { }
  swall(icon,title){
    Toast.fire({
      icon: icon,
      title: title,
      customClass: {
        container: 'container-class',
        popup: 'swal-popup-class',
        title: 'title-class',
      },
    })
  }

//  showSwalWarning(title:string,text:string,icon:any,showCancelButton:boolean,confirmButtonText:string,cancelButtonText:string,){
//   Swal.fire({
//     title: title,
//     text: text,
//     icon: icon,
//     showCancelButton: showCancelButton,
//     confirmButtonText: confirmButtonText,
//     cancelButtonText:cancelButtonText,
//     customClass: {
//       popup: 'swal-popup-class del-popup-size',
//       header: 'header-class',
//       title: 'title-class',
//       image: 'image-class',
//       actions: 'actions-class',
//       confirmButton: 'confirm-button-class',
//       cancelButton: 'cancel-button-class',
//     },
//   })
//  }
 notAllowDateRange(){
  Swal.fire({
    title: 'Sorry',
    text: 'Only Date from "Current day" to "Max allowed day" can be entered ',
    icon: 'warning',
    showCancelButton: false,
    confirmButtonText: 'Ok',
    timer: 5000,
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
 }

}
