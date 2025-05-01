import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-payment',
  templateUrl: './credit-payment.component.html',
  styleUrls: ['./credit-payment.component.css']
})
export class CreditPaymentComponent implements OnInit {

  username: string | undefined;
  cardNumber: string = '';
  cardHolderName: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';
  paymentAmount: string | undefined;
  cardNumberError: string | undefined;
  cardHolderNameError: string | undefined;
  expiryDateError: string | undefined;
  cvvError: string | undefined;
  showTransactionDetails: boolean = false;
  transactionId: string | undefined;
  transactionAmount: string | undefined;
  transactionCardNumber: string | undefined;
  transactionCardHolderName: string | undefined;
  transactionExpiryDate: string | undefined;

  months: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  years: number[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.username = JSON.parse(localStorage.getItem("loggedinUser"))?.userData?.name;
    this.username = JSON.parse(localStorage.getItem('loggedinUser') || '{}')?.userData?.name || 'Guest';


    // const selectedBills = JSON.parse(localStorage.getItem('selectedBills')) || [];
    const selectedBillsJson = localStorage.getItem('selectedBills');
const selectedBills = selectedBillsJson ? JSON.parse(selectedBillsJson) : [];

    let total = 0;
    selectedBills.forEach((bill: any) => {
      total += parseFloat(bill.payableAmount.replace('Rs. ', '').replace(',', ''));
    });
    this.paymentAmount = `₹ ${total.toFixed(2)}`;

    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  logout(): void {
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  makePayment(): void {
    this.resetErrors();
    let isValid = true;

    const cardNumberLength = this.cardNumber.length;
    const cardHolderNameLength = this.cardHolderName.length;
    const cvvLength = this.cvv.length;

    if (cardNumberLength < 16) {
      this.cardNumberError = 'Card number must be at least 16 digits.';
      isValid = false;
    }

    if (cardHolderNameLength < 10) {
      this.cardHolderNameError = 'Card holder name must be at least 10 characters.';
      isValid = false;
    }

    if (!this.expiryMonth || !this.expiryYear) {
      this.expiryDateError = 'Please select expiry month and year.';
      isValid = false;
    }

    if (cvvLength < 3) {
      this.cvvError = 'CVV must be at least 3 digits.';
      isValid = false;
    }

    if (isValid) {
      this.transactionId = 'TXN_' + Date.now();
      this.transactionAmount = this.paymentAmount;
      this.transactionCardNumber = this.cardNumber;
      this.transactionCardHolderName = this.cardHolderName;
      this.transactionExpiryDate = `${this.expiryMonth}/${this.expiryYear}`;

      this.showTransactionDetails = true;
      localStorage.removeItem('selectedBills'); // Clear selected bills from localStorage after payment
      this.router.navigate(['/payment-success']); // Redirect to success page
    }
  }

  cancelPayment(): void {
    this.router.navigate(['/viewbill']); // Redirect to home page
  }

  downloadReceipt(): void {
    const transactionDetails = `
      Transaction ID: ${this.transactionId}
      Payment Amount: ${this.transactionAmount}
      Card Number: ${this.transactionCardNumber}
      Card Holder Name: ${this.transactionCardHolderName}
      Expiry Date: ${this.transactionExpiryDate}
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(transactionDetails));
    element.setAttribute('download', 'payment_receipt.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  resetErrors(): void {
    this.cardNumberError = '';
    this.cardHolderNameError = '';
    this.expiryDateError = '';
    this.cvvError = '';
  }
}
