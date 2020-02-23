import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { CalanderComponent } from './calendar/calander.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AvilablityComponent } from './avilablity/avilablity.component'; 


@NgModule({
  declarations: [
    FrontendComponent,
    SidebarComponent,
    DashboardComponent,
    ServiceComponent,
    CalanderComponent,
    AvilablityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    FrontendRoutingModule
  ]
})
export class FrontendModule { }
