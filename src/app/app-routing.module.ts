import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./components/auth/registration/registration.component"
import { LoginComponent } from './components/auth/login/login.component';
import { ViewBillComponent } from './components/viewBill/view-bill/view-bill.component';
import { AuthGuard } from './auth.guard';
import { RegistrationSuccessComponent } from './components/auth/registration-success/registration-success.component';
import { RegisterComplaintComponent } from './components/auth/complaint/register-complaint/register-complaint.component';
import { PaymentSuccessComponent } from './components/viewBill/payment-success/payment-success.component';
import { CreditPaymentComponent } from './components/viewBill/credit-payment/credit-payment.component';
import { ComplaintSuccessComponent } from './components/auth/complaint/complaint-success/complaint-success.component';
import { ComplaintStatusComponent } from './components/auth/complaint/complaint-status/complaint-status.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  // { path: 'view-bill', component: ViewBillComponent, canActivate: [AuthGuard] }, // Protect route
  { path: 'view-bill', component: ViewBillComponent}, // Protect route
  { path: 'registration-success' ,component:RegistrationSuccessComponent},
  { path: 'register-complaint', component: RegisterComplaintComponent,}, // Protect route
  { path: 'complaint', component: RegisterComplaintComponent,}, // Protect route

  { path: 'complaint-status', component: ComplaintStatusComponent }, // Protect route
  { path: 'complaint-success', component: ComplaintSuccessComponent },
  { path: 'credit-payment', component: CreditPaymentComponent }, // Protect route
  { path: 'payment-success', component: PaymentSuccessComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '', component: LandingPageComponent },
  { path: '**', redirectTo: '/login' }, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
