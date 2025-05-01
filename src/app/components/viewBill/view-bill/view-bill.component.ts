import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.css']
})
export class ViewBillComponent implements OnInit {
  username: string = '';
  totalPayable: number = 0;
  selectedBills: any[] = [];

  bills = [
    {
      consumerNumber: '1134567890223',
      dueAmount: '0.00',
      payable: '0.00'
    },
    {
      consumerNumber: '5678345212321',
      dueAmount: '-100.00',
      payable: '0.00'
    },
    {
      consumerNumber: '1122334455662',
      dueAmount: '2,028.00',
      payable: '2,028.00'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('loggedinUser') || '{}');
    this.username = userData?.userData?.name || 'Customer';
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('loggedinUser');
    this.router.navigate(['/login']);
  }

  updateSelection(event: Event, bill: any): void {
    const checked = (event.target as HTMLInputElement).checked;
    const amount = parseFloat(bill.payable.replace(',', ''));

    if (checked) {
      this.selectedBills.push(bill);
      this.totalPayable += amount;
    } else {
      this.selectedBills = this.selectedBills.filter(b => b.consumerNumber !== bill.consumerNumber);
      this.totalPayable -= amount;
    }
  }

  proceedToPay(): void {
    localStorage.setItem('selectedBills', JSON.stringify(this.selectedBills));
    this.router.navigate(['/bill-payment']);
  }
}
