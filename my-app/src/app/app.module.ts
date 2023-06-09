import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonGroupModule, NbInputModule, NbFormFieldModule, NbCardModule, NbIconModule, NbTimepickerModule, NbTableModule, NbAlertModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SubscribeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonGroupModule,
    NbInputModule,
    NbFormFieldModule,
    NbCardModule,
    NbIconModule,
    NbTimepickerModule.forRoot(),
    NbTimepickerModule,
    Ng2SmartTableModule,
    NbAlertModule,
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SubscribeComponent,
    DashboardComponent

  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
