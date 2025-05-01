import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { userId, password } = this.loginForm.value;

    const userDataString = localStorage.getItem(userId);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (!userData) {
      alert('User ID not found.');
      return;
    }

    if (userData.password === password) {
      alert('Login successful!');
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('loggedinUser', JSON.stringify({ userData }));
      this.router.navigate(['/view-bill']); // Create route later
    } else {
      alert('Invalid Password.');
    }
  }
}
