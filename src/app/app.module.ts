import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import {HttpClientModule} from "@angular/common/http"
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewBillComponent } from './components/viewBill/view-bill/view-bill.component';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';
import { RegisterComplaintComponent } from './components/auth/complaint/register-complaint/register-complaint.component';
import { PaymentSuccessComponent } from './components/viewBill/payment-success/payment-success.component';
import { CreditPaymentComponent } from './components/viewBill/credit-payment/credit-payment.component';
import { ComplaintSuccessComponent } from './components/auth/complaint/complaint-success/complaint-success.component';
import { ComplaintStatusComponent } from './components/auth/complaint/complaint-status/complaint-status.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ViewBillComponent,
    RegistrationSuccessComponent,
    RegisterComplaintComponent,
    PaymentSuccessComponent,
    CreditPaymentComponent,
    ComplaintSuccessComponent,
    ComplaintStatusComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  exports: [
    PaymentSuccessComponent, // Export it if you need to use this component elsewhere
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
