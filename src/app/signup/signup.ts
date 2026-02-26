import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Added RouterLink
import { AuthService } from '../auth'; // IMPORT THE SERVICE

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink], // Added RouterLink here
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2 class="logo-text">🐋 MARNA</h2>
        <p class="subtitle">Create a new account</p>

        <div class="form-group">
          <label>Email Address</label>
          <input [(ngModel)]="email" placeholder="email@marna.com">
        </div>

        <div class="form-group">
          <label>Password</label>
          <input [(ngModel)]="password" type="password" placeholder="••••••••">
        </div>

        <button (click)="onSignup()" class="login-btn">Create Account</button>
        
        <p class="signup-link">Already have an account? <a routerLink="/login">Log In</a></p>
      </div>
    </div>
  `,
  styleUrls: ['../login/login.css'] 
})
export class SignupComponent {
  email = '';
  password = '';

  // Inject the AuthService here
  constructor(private authService: AuthService, private router: Router) {}
onSignup() {
    if (this.email && this.password) {
      // Subscribe to the HTTP POST request
      this.authService.registerUser(this.email, this.password).subscribe(() => {
        alert('Account created successfully! The db.json file has been updated.');
        this.router.navigate(['/login']);
      });
    } else {
      alert('Please fill out both fields.');
    }
  }
}