import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.css']
})
export class RegistrationSuccessComponent implements OnInit {
  customerData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('successData');
    if (data) {
      this.customerData = JSON.parse(data);
    } else {
      this.router.navigate(['/register']);
    }
  }

  goToLogin(): void {
    localStorage.removeItem('successData');
    this.router.navigate(['/login']);
  }
}
