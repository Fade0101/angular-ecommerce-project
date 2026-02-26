import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;

  constructor(
    private cartService: CartService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }

  removeItem(id: string | number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let completedRequests = 0;

    this.cartItems.forEach(item => {
      let currentStock = item.stock !== undefined ? item.stock : 50;
      let remainingStock = currentStock - item.cartQuantity;
      if (remainingStock < 0) remainingStock = 0;

      this.api.updateProduct(item.id, { stock: remainingStock }).subscribe({
        next: () => {
          this.checkCompletion(++completedRequests);
        },
        error: () => {
          this.checkCompletion(++completedRequests);
        }
      });
    });
  }

  private checkCompletion(completed: number) {
    if (completed === this.cartItems.length) {
      alert('Payment Successful! Thank you for your order.');
      this.clearCart();
    }
  }
}