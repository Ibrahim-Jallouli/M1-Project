import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './compoments/login/login.component';
import { SigninComponent } from './compoments/signin/signin.component'; 
import { AccueilComponent } from './compoments/accueil/accueil.component'; 
import { ProfileComponent } from './compoments/profile/profile.component'; 
import { PanierComponent } from './compoments/panier/panier.component';
import { HomeComponent } from './compoments/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent }, 
  { path: 'accueil', component: AccueilComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
