import { Component, OnInit, ChangeDetectorRef,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ApiService } from '../api';
import { TruncatePipe } from '../truncate-pipe';
import { HoverEffectDirective } from '../hover-effect'; 
import { BuyButtonComponent } from '../buy-button/buy-button'; 

@Component({
  selector: 'app-home',
  standalone: true,
imports: [CommonModule, TruncatePipe, HoverEffectDirective, BuyButtonComponent],
  templateUrl: './home.html', 
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sliderImages: any[] = [];
  currentIndex: number = 0;
  slideInterval: any; 
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'all';
  cartItems: any[] = [];
  cartTotal: number = 0;
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    this.sliderImages = [
      { id: 1, url: 'https://picsum.photos/id/10/1920/1080', alt: 'Forest' },
      { id: 2, url: 'https://picsum.photos/id/13/1920/1080', alt: 'Beach' },
      { id: 3, url: 'https://picsum.photos/id/29/1920/1080', alt: 'Mountains' }

    ];


    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 1000);
    this.apiService.getCategories().subscribe((res: any) => {
      this.categories = res;
  }
  );
 this.apiService.getAllProducts().subscribe((res: any) => {
      this.products = res.products.map((p: any) => ({ 
        ...p, 
        showFullDesc: false, 
        quantity: 1 
      }));
      this.filteredProducts = this.products;
      this.cdr.detectChanges(); 
    });
  

  }
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product: any) => product.category === category);
    }
  }
  toggleDescription(product: any): void {
    product.showFullDescription = !product.showFullDescription;
  }
increaseQuantity(product: any): void {
    product.quantity++;
  }
  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex === this.sliderImages.length - 1) ? 0 : this.currentIndex + 1;
    
    this.cdr.detectChanges(); 
}
  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.cartQuantity += product.quantity;
    } else {
      this.cartItems.push({ ...product, cartQuantity: product.quantity });
    }

    // 2. Recalculate the total
    this.calculateTotal();

    product.quantity = 1; 
  }

  calculateTotal(): void {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  }
}
