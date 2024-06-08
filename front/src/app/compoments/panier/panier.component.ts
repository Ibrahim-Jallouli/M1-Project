import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'productImage', 'productPrice', 'quantity', 'actions'];
  dataSource: any;
  cartItems: Product[] = [];
  total: number = 0;
  deliveryFee: number = 5;
  deliveryFeeAdded: boolean = false;


  constructor(private dataTransferService: DataTransferService, private router: Router, private authService:AuthService, private panierService:PanierService) {}

  ngOnInit() {
    const savedCartItems = localStorage.getItem('cartItems');
    this.cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
    console.log('Cart Items:', this.cartItems);
    // Calculate the total price of the items in the cart
    this.calculateTotal();
    
    this.dataSource = new MatTableDataSource(this.cartItems);

  }


  
  removeFromCart(index: number) {
    console.log('Removing item at index:', index);
  
    // Retrieve the current cart items from local storage
    const savedCartItems = localStorage.getItem('cartItems');
    if (!savedCartItems) {
      return; // No items in the cart
    }
  
    // Parse the cart items from JSON
    const cartItems: Product[] = JSON.parse(savedCartItems);
  
    // Remove the item at the specified index from the cart items array
    cartItems.splice(index, 1);
  
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Update the data source for the table
    this.dataSource = new MatTableDataSource(cartItems);
    this.calculateTotal();
    const token =this.authService.getToken();
    if(token){
      this.panierService.removeFromCartAPI(this.authService.getCartId(),cartItems[index].productId,token).subscribe({
        next: data => {
          console.log('Data:', data);
        },
        error: error => {
          console.error('Error:', error);
        }
      });
    }


    this.ngOnInit();
  }


  payment(){
    this.router.navigate(['/payment']);
  }


  calculateTotal() {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].price* this.cartItems[i].quantity ;
    }
    if (this.deliveryFeeAdded) {
      sum += this.deliveryFee;
    }
    this.total = sum;
    this.total = parseFloat(this.total.toFixed(2));
    console.log('Total:', this.total);
  }

  toggleDeliveryFee() {
    this.deliveryFeeAdded = !this.deliveryFeeAdded; // Toggle the delivery fee state
    this.calculateTotal(); // Recalculate the total based on the new state
  }
  
}


