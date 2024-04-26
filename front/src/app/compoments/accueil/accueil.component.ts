import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../entities/product'; 
import { DataTransferService } from '../../services/data-transfer.service'; // Import the DataTransferService

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor (
    private productService: ProductService,
    private dataTransferService: DataTransferService // Inject the DataTransferService
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
  productsPerPage: number = 20; 

  // Method to load products based on category ID
  loadProducts(categoryId?: number) {
    if (categoryId) {
      this.productService.getProductOfCategory(categoryId).subscribe(products => {
        console.log('Products:', products); 
        this.products = products; 
      });
    } else {
      this.productService.getProducts().subscribe(products => {
        console.log('Products:', products); 
        this.products = products;
      });
    }
  }

  search() {
    console.log('Search Query:', this.searchQuery);
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
}
