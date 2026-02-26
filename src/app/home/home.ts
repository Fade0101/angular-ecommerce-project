import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { ApiService } from '../api';
import { AuthService } from '../auth'; 
import { TruncatePipe } from '../truncate-pipe'; 
import { HoverEffectDirective } from '../hover-effect'; 
import { BuyButtonComponent } from '../buy-button/buy-button'; 
import {  RouterLink } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
imports: [CommonModule, TruncatePipe, HoverEffectDirective, BuyButtonComponent, RouterLink], 
 templateUrl: './home.html', 
  styleUrls: ['./home.css']   
})
export class HomeComponent implements OnInit {
sliderImages: { url: string, alt: string }[] = [
    { url: 'https://picsum.photos/id/1015/1200/400', alt: 'Welcome to Marna' },
    { url: 'https://picsum.photos/id/1016/1200/400', alt: 'New Beauty Products' },
    { url: 'https://picsum.photos/id/1018/1200/400', alt: 'Huge Discounts' }
  ];
  currentIndex: number = 0;
cartItemCount: number = 0;
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';

  cartItems: any[] = [];
  cartTotal: number = 0;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef, 
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
    setInterval(() => {
      this.nextSlide();
    }, 3000);

    // Fetch from your local db.json via ApiService
    this.api.getAllProducts().subscribe((res: any[]) => {
      this.products = res.map((p: any) => ({ 
        ...p, 
        showFullDesc: false, 
        quantity: 1 
      }));
      this.filteredProducts = this.products;

      // Dynamically extract categories
      const allCategories = this.products.map(p => p.category);
      this.categories = [...new Set(allCategories)]; 
      
      this.cdr.detectChanges(); 
    });
  }
goToProduct(id: string | number) {
    this.router.navigate(['/product', id]);
  }
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.sliderImages.length) % this.sliderImages.length;
  }
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((p: any) => p.category === category);
    }
  }

  toggleDescription(product: any): void {
    product.showFullDesc = !product.showFullDesc;
  }

  increaseQuantity(product: any): void {
    if (!product.quantity) product.quantity = 1; 
    product.quantity++;
  }

  decreaseQuantity(product: any): void {
    if (!product.quantity) product.quantity = 1; 
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
addToCart(product: any): void {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to add items to your cart!');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addToCart(product, product.quantity || 1);
    product.quantity = 1; 
  }
  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  }
}