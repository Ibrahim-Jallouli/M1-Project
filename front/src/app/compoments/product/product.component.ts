import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../entities/product';
import { ProductService } from '../../services/product.service'; // Import the ProductService
import { MatDialog,MatDialogConfig  } from '@angular/material/dialog';
import { ImageProduitComponent } from '../image-produit/image-produit.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/entities/category';
import { PanierService } from '../../services/panier.service'; // Import the ProductService
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: Product | undefined;
  productId: number | undefined;
  selectedQuantity: number = 1;
  quantities: number[] = [];
  productsFromSameCategory: Product[] = [];

  staticCategory: Category = {
    categoryId: 30,
    name: "Static Category",
    description: "Description of the static category",
    products: [], 
    childCategories: [] 
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private panierService: PanierService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.productId = +params['id']; 
        console.log('Product ID:', this.productId);
        return this.fetchProduct(); // Return the observable from fetchProduct
      })
    ).subscribe(() => {
      this.fetchProductsFromSameCategory(); // Call fetchProductsFromSameCategory inside the subscription
    });
  }

  fetchProduct(): Observable<Product | null> {
    if (this.productId) {
      return this.productService.getProductById(this.productId).pipe(
        tap((product: Product) => {
          this.product = product;
          console.log('Product:', product);
          this.quantities = Array.from({ length: product.quantity }, (_, i) => i + 1);
          // Handle the retrieved product data here
        }),
        catchError((error: any) => {
          console.error('Error fetching product:', error);
          return of(null); // Return an observable with null value in case of error
        })
      );
    }
    return of(null); // Return an observable with null value if productId is not available
  }

  fetchProductsFromSameCategory(): void {
    if (this.productId && this.product) {
      this.productService.getProductOfCategory(this.staticCategory.categoryId).subscribe({
        next: (products: Product[]) => {
          // make a twice copy of the content of the products array
          this.productsFromSameCategory = products.filter(product => product.productId !== this.productId);
        },
        error: (error: any) => {
          console.error('Error fetching products from the same category:', error);
        }
      });
    }
  }

  navigateToProduct(productId: number) {
    console.log('Navigating to product:', productId);
    this.router.navigate(['/product', productId]);
}

  openImage(imageUrl: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      imageUrl: imageUrl
    };
    dialogConfig.height = '80%'; // Adjust the height as needed

    this.dialog.open(ImageProduitComponent, dialogConfig);
  }


  addToCart(product: Product, selectedQuantity: number): void {
    console.log("quantity", selectedQuantity);

    // Retrieve existing cart items from local storage
    const cartItemsJson = localStorage.getItem('cartItems');
    let cartItems: Product[] = cartItemsJson ? JSON.parse(cartItemsJson) : [];

    if (!Array.isArray(cartItems)) {
        cartItems = [];
    }

    const existingItemIndex = cartItems.findIndex(item => item.productId === product.productId);

    if (existingItemIndex !== -1) {
        // Product exists in cart, update its quantity
        const updatedQuantity = cartItems[existingItemIndex].quantity + selectedQuantity;
        if (updatedQuantity <= product.quantity) {
            cartItems[existingItemIndex].quantity = updatedQuantity;
        } else {
            // Notify user of insufficient quantity
            this.snackBar.open(`Not enough quantity available for product ${product.name}`, 'Dismiss', {
                duration: 3000,
                horizontalPosition: 'start',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar'],
            });
            return;
        }
    } else {
        // Product not in cart, add it
        cartItems.push({ ...product, quantity: selectedQuantity });
    }

    // Store the updated cart items back to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Notify user of successful addition to local storage
    this.snackBar.open(`Product ${product.name} added`, 'Ok', {
        duration: 3000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
    });

    // Check if user is authenticated
    const token = this.authService.getToken();
    if (token) {
        // User is authenticated, send cart item to the server
        const cartItemPayload = {
            quantity: selectedQuantity,
            cartId: this.authService.getCartId(),
            productId: product.productId,
        };

        this.panierService.addToCartAPI(cartItemPayload, token).subscribe({
            next: (response) => {
                console.log('Cart item added:', response);
                this.snackBar.open(`Product ${product.name} added to server`, 'Ok', {
                    duration: 3000,
                    horizontalPosition: 'start',
                    verticalPosition: 'bottom',
                    panelClass: ['custom-snackbar'],
                });
            },
            error: (error) => {
                console.error('Error adding product to cart:', error);
                this.snackBar.open(`Error adding product ${product.name} to server`, 'Dismiss', {
                    duration: 3000,
                    horizontalPosition: 'start',
                    verticalPosition: 'bottom',
                    panelClass: ['custom-snackbar'],
                });
            }
        });
    }
}


}
