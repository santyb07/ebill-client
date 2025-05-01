import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      consumerNumber: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      billNumber: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      title: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userId: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      localStorage.setItem(userData.userId, JSON.stringify(userData));
      localStorage.setItem('successData', JSON.stringify({
        customerId: userData.consumerNumber,
        name: userData.name,
        mobile: userData.mobile
      }));
      window.location.href = 'success.html';
    }
  }

  onReset(): void {
    this.registrationForm.reset();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
