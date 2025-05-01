import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Complaint {
  id: string;
  type: string;
  category: string;
  consumerNumber: string;
  description: string;
  mobile: string;
}

@Component({
  selector: 'app-complaint-success',
  templateUrl: './complaint-success.component.html',
  styleUrls: ['./complaint-success.component.css']
})
export class ComplaintSuccessComponent implements OnInit {

  username: string = 'User';
  complaint: Complaint | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userDataString = localStorage.getItem('loggedinUser');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.username = userData.userData.name;
    }

    const complaintDataString = localStorage.getItem('latestComplaint');
    if (complaintDataString) {
      this.complaint = JSON.parse(complaintDataString);
    }
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  goToStatus(): void {
    this.router.navigate(['/complaint-status']);
  }
}
