import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api'; 

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  productsList: any[] = [];
  
  newProduct = { 
    id: '', 
    title: '', 
    price: 0, 
    category: '', 
    description: '', 
    thumbnail: '' 
  };

  constructor(private api: ApiService) {} 

  ngOnInit() {
    this.loadProducts();
  }

  // Read: Get all products from db.json
  loadProducts() {
    this.api.getAllProducts().subscribe(data => {
      this.productsList = data;
    });
  }

  // Create: Add a new product to db.json
  addProduct() {
    this.newProduct.id = Date.now().toString(); 
    
    this.api.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts(); // Refresh the table automatically
      this.resetForm();    // Clear the inputs
      alert('Product added successfully!');
    });
  }

  // Delete: Remove a product from db.json
  deleteProduct(id: string | number) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(id).subscribe(() => {
        this.loadProducts(); // Refresh the table automatically
      });
    }
  }

  resetForm() {
    this.newProduct = { id: '', title: '', price: 0, category: '', description: '', thumbnail: '' };
  }
}