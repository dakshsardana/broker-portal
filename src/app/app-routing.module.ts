import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuoteComponent } from './components/quote/quote.component';

const routes: Routes = [
  { path: '', component: HomeComponent },   
  { path: 'login', component: LoginComponent },
  { path: 'quote', component: QuoteComponent }, // Added Quote Page
  { path: '**', redirectTo: '' } // Redirect unknown routes to Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })], // Ensure clean URLs
  exports: [RouterModule]
})
export class AppRoutingModule { }
