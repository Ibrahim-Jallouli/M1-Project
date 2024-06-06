import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entities/product';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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


  constructor(private dataTransferService: DataTransferService, private router: Router) {}

  ngOnInit() {
    const savedCartItems = localStorage.getItem('cartItems');
    this.cartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
    console.log('Cart Items:', this.cartItems);
    // Calculate the total price of the items in the cart
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
        sum += this.cartItems[i].price;
    }
    this.total = sum;
    
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
    this.ngOnInit();
  }


  payment(){
    this.router.navigate(['/payment']);
    console.log('Payment');
  }


  calculateTotal() {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].price;
    }
    if (this.deliveryFeeAdded) {
      sum += this.deliveryFee;
    }
    this.total = sum;
  }

  toggleDeliveryFee() {
    this.deliveryFeeAdded = !this.deliveryFeeAdded; // Toggle the delivery fee state
    this.calculateTotal(); // Recalculate the total based on the new state
  }
  
  
  
}


