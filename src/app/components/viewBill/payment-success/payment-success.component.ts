import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
  // imports: [NgIf, NgFor, CurrencyPipe]  // 👈 Add CurrencyPipe here
})
export class PaymentSuccessComponent implements OnInit {
  username: string = '';
  totalAmountPaid: number = 0;
  transaction: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const loggedinUser = JSON.parse(localStorage.getItem('loggedinUser') || '{}');
    this.username = loggedinUser?.userData?.name || 'User';

    const selectedBills = JSON.parse(localStorage.getItem('selectedBills') || '[]');
    let total = 0;
    let consumerNumberValue = '';

    selectedBills.forEach((bill: any) => {
      total += parseFloat(bill.payableAmount.replace('Rs. ', '').replace(',', ''));
      consumerNumberValue = bill.consumerNumber;
    });

    this.totalAmountPaid = total;

    this.transaction = {
      transactionNumber: Math.floor(Math.random() * 1000000000),
      receiptNumber: '2134567890976',
      transactionDate: new Date().toLocaleString(),
      transactionType: 'DC',
      paymentType: 'Registered User',
      paymentGateway: 'EFG Payment Gateway',
      section: 'ABC',
      consumerNumber: consumerNumberValue,
      paidAmount: total,
      transactionType2: 'DC'
    };
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  goToHome(): void {
    this.router.navigate(['/viewbill']);
  }

  downloadReceipt(): void {
    const receiptText = `
Transaction Number: ${this.transaction.transactionNumber}
Receipt Number: ${this.transaction.receiptNumber}
Transaction Date: ${this.transaction.transactionDate}
Transaction Type: ${this.transaction.transactionType}
Payment Type: ${this.transaction.paymentType}
Payment Gateway: ${this.transaction.paymentGateway}
Section: ${this.transaction.section}
Consumer Number: ${this.transaction.consumerNumber}
Paid Amount: ₹ ${this.transaction.paidAmount}
Transaction Type: ${this.transaction.transactionType2}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptText));
    element.setAttribute('download', 'payment_receipt.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
