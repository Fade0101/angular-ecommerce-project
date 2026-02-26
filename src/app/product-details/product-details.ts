import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'; 
import { ApiService } from '../api';
import { AuthService } from '../auth';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'] 
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  errorMessage: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private api: ApiService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isLoading = true;
      this.errorMessage = '';
      this.cdr.detectChanges();

      if (id) {
        this.api.getProductById(id).subscribe({
          next: (found) => {
            if (found) {
              this.product = found;
              this.quantity = 1;
            } else {
              this.errorMessage = 'Product not found!';
            }
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Failed to load data from server.';
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      } else {
        this.errorMessage = 'Invalid product ID.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to add items to your cart!');
      this.router.navigate(['/login']);
      return;
    }
    
    this.cartService.addToCart(product, this.quantity);
  }
}