import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from './auth'; 
import { CartService } from '../app/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  cartItemCount: number = 0;
  
  isUserLoggedIn: boolean = false;
  isUserAdmin: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
   this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  
    this.authService.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn = status;
    });

    //  Listen to the Admin status
    this.authService.isAdmin$.subscribe(status => {
      this.isUserAdmin = status;
    });
  }

  logout() {
    this.authService.logout();
  }
}