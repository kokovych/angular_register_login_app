import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginUserService } from './_services/loginuser.service';

import { AddHeaderInterceptor} from './_services/auth.interceptor';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserDataService } from "./_services/userdata.service";
import { CheckAuthService } from "./_services/check-auth.service";


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegistrationComponent
  ],
  providers: [
    LoginUserService,
    UserDataService,
    CheckAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
