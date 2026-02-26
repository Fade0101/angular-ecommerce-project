import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../auth';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; 

  constructor(private authService: AuthService) {}

  onLogin() {
    if (this.email && this.password) {
       this.errorMessage = ''; 
       
       // Subscribe to the new login logic
       this.authService.login(this.email, this.password).subscribe(success => {
         if (!success) {
           this.errorMessage = 'Invalid email or password. Please try again.';
         }
       });

    } else {
       this.errorMessage = 'Please enter both email and password.';
    }
  }
}