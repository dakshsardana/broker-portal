import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // ✅ Import HttpClientModule

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { LoginComponent } from './app/components/login/login.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { GetQuoteComponent } from './app/components/dashboard/get-quote/get-quote.component';
import { ViewQuotesComponent } from './app/components/dashboard/view-quotes/view-quotes.component';
import { ManagePoliciesComponent } from './app/components/dashboard/manage-policies/manage-policies.component';
import { BrokerProfileComponent } from './app/components/dashboard/broker-profile/broker-profile.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { 
        path: 'dashboard', component: DashboardComponent, 
        children: [
          { path: 'get-quote', component: GetQuoteComponent },
          { path: 'view-quotes', component: ViewQuotesComponent },
          { path: 'manage-policies', component: ManagePoliciesComponent },
          { path: 'profile', component: BrokerProfileComponent },
          { path: '', redirectTo: 'get-quote', pathMatch: 'full' } // Default route in Dashboard
        ]
      }
    ]),
    provideAnimations(),
    importProvidersFrom(FormsModule, HttpClientModule) // ✅ Ensure FormsModule is included
  ]
}).catch(err => console.error(err));
