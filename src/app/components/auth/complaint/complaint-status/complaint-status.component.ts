import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Complaint {
  complaintType: string;
  category: string;
  consumerNumber: string;
  problemDescription: string;
  mobileNumber: string;
  address: string;
}

@Component({
  selector: 'app-complaint-status',
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.css']
})
export class ComplaintStatusComponent implements OnInit {

  username: string = '';
  complaintNumber: string = '';
  complaintNumberError: string = '';
  complaintDetails: Complaint | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('loggedinUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.username = userData.userData.name;
    }
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  getComplaintStatus(): void {
    this.complaintNumberError = '';
    this.complaintDetails = null;

    if (!this.complaintNumber) {
      this.complaintNumberError = 'Please enter a complaint number.';
      return;
    }

    const complaintData = localStorage.getItem(`complaint_${this.complaintNumber}`);
    if (complaintData) {
      this.complaintDetails = JSON.parse(complaintData);
    } else {
      this.complaintNumberError = 'Complaint not found.';
    }
  }

  reset(): void {
    this.complaintNumber = '';
    this.complaintNumberError = '';
    this.complaintDetails = null;
  }
}
