import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../entities/product'; 
import { DataTransferService } from '../../services/data-transfer.service'; // Import the DataTransferService
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor (
    private productService: ProductService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) {}

  ngOnInit () {
    this.loadProducts();
    // Subscribe to changes in the selected category ID
    this.dataTransferService.getSelectedCategory().subscribe(categoryId => {
      if (categoryId) {
        this.loadProducts(categoryId);
      } else {
        this.loadProducts();
      }
    });
  }

  products: Product[] = [];
  searchQuery: string = '';
  currentPage: number = 1; 
  productsPerPage: number = 12; 

  // Method to load products based on category ID
  loadProducts(categoryId?: number) {
    if (categoryId) {
      this.productService.getProductOfCategory(categoryId).subscribe(products => {
        this.products = products; 
      });
    } else {
      this.productService.getProducts().subscribe(products => {
        this.products = products;
      });
    }
  }

  search() {
    console.log('Search Query:', this.searchQuery);
    // Convert search query to lowercase for case-insensitive search
    const query = this.searchQuery.toLowerCase().trim();
    
    if (query) {
      // Filter products based on search query
      this.products = this.products.filter(product =>
        product.name.toLowerCase().includes(query) || // Assuming 'name' is the property you want to search
        product.description.toLowerCase().includes(query) // Add more properties if needed
      );
    } else {
      // If search query is empty, reload all products
      this.loadProducts();
    }
  }
  

  // Method to calculate the number of pagination buttons
  get pagesArray(): number[] {
    return Array(Math.ceil(this.products.length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
  }

  // Method to calculate the index of the first and last product to display
  calculateProductIndex(): { startIndex: number, endIndex: number } {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = Math.min(startIndex + this.productsPerPage - 1, this.products.length - 1);
    return { startIndex, endIndex };
  }

  // Method to change the current page
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  navigateToProduct(productId: number) {
    console.log('Navigating to product:', productId);
    // Navigate to the product details page with the product ID as a parameter
    this.router.navigate(['/product', productId]);
}
}

