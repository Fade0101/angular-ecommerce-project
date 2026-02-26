import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);
  private items = new BehaviorSubject<any[]>([]);

  cartCount$ = this.cartCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();
  items$ = this.items.asObservable();

  addToCart(product: any, quantity: number = 1) {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.cartQuantity += quantity;
    } else {
      this.cartItems.push({ ...product, cartQuantity: quantity });
    }
    this.updateCart();
  }

  removeFromCart(productId: string | number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    const count = this.cartItems.reduce((acc, item) => acc + item.cartQuantity, 0);
    const total = this.cartItems.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    this.cartCount.next(count);
    this.cartTotal.next(total);
    this.items.next([...this.cartItems]);
  }
}