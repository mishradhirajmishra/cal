import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { ServiceComponent } from './service/service.component';
import { CalanderComponent } from './calendar/calander.component';
import { AvilablityComponent } from './avilablity/avilablity.component';



const routes: Routes = [{ path: '', component: FrontendComponent,
children: [
  { path: 'home', component: DashboardComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'calendar', component:CalanderComponent},
  // { path: 'avilablity', component:AvilablityComponent},
  { path: 'avilablity/:id', component:AvilablityComponent},
],canActivate:[AuthGuard]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
