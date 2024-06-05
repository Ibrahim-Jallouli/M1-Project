import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './compoments/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SigninComponent } from './compoments/signin/signin.component'; // Import SharedModule
import { ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from './compoments/accueil/accueil.component'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { PanierComponent } from './compoments/panier/panier.component';
import { ProfileComponent } from './compoments/profile/profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './compoments/home/home.component';
import { ProductComponent } from './compoments/product/product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageProduitComponent } from './compoments/image-produit/image-produit.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { PaymentComponent } from './compoments/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    AccueilComponent,
    PanierComponent,
    ProfileComponent,
    HomeComponent,
    ProductComponent,
    ImageProduitComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    SharedModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
