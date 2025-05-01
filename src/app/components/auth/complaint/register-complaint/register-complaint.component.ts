import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-complaint',
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css']
})
export class RegisterComplaintComponent implements OnInit {
  username: string = '';
  complaintData: any = {
    complaintType: '',
    landmark: '',
    category: '',
    consumerNumber: '',
    contactPerson: '',
    problemDescription: '',
    mobileNumber: '',
    address: ''
  };
  categories: string[] = [];
  errors: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('loggedinUser') || '{}');
    if (user?.userData?.name) {
      this.username = user.userData.name;
    } else {
      // this.router.navigate(['/login']);
    }
  }

  onComplaintTypeChange(): void {
    const type = this.complaintData.complaintType;
    const map: any = {
      billing: ['Incorrect Bill', 'Delayed Bill', 'Other Billing Issue'],
      voltage: ['Low Voltage', 'High Voltage', 'Voltage Fluctuation'],
      disruption: ['Power Outage', 'Frequent Tripping', 'Supply Issue'],
      streetlight: ['Not Working', 'Not Switched Off', 'Damaged Pole'],
      pole: ['Damaged Pole', 'Leaning Pole', 'Wire Issue']
    };
    this.categories = map[type] || [];
  }

  validate(): boolean {
    this.errors = {};

    if (!this.complaintData.complaintType)
      this.errors.complaintType = 'Please select a complaint type.';

    if (!this.complaintData.category)
      this.errors.category = 'Please select a category.';

    if (!this.complaintData.problemDescription)
      this.errors.problemDescription = 'Please enter a problem description.';

    if (!this.complaintData.mobileNumber || this.complaintData.mobileNumber.length !== 10)
      this.errors.mobileNumber = 'Mobile Number must be 10 digits.';

    if (!this.complaintData.consumerNumber || this.complaintData.consumerNumber.length !== 13)
      this.errors.consumerNumber = 'Consumer Number must be 13 digits.';

    return Object.keys(this.errors).length === 0;
  }

  submitComplaint(): void {
    if (!this.validate()) return;

    const id = 'complaint_' + Date.now();
    localStorage.setItem(id, JSON.stringify(this.complaintData));
    alert('Complaint submitted successfully!');
    this.router.navigate(['/complaint-success']);
  }

  cancel(): void {
    window.location.reload();
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }
}
