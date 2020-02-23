import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenIntercepterService } from './shared/token-intercepter.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ForgotComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
     ReactiveFormsModule,
    JwtModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    HttpClientModule,
    AppRoutingModule
  ],
   providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenIntercepterService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
