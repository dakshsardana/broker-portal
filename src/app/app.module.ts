import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

// ✅ Import standalone components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetQuoteComponent } from './components/dashboard/get-quote/get-quote.component';
import { ViewQuotesComponent } from './components/dashboard/view-quotes/view-quotes.component';
import { ManagePoliciesComponent } from './components/dashboard/manage-policies/manage-policies.component';
import { BrokerProfileComponent } from './components/dashboard/broker-profile/broker-profile.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      RouterModule.forRoot([
        { path: '', component: AppComponent },
        {
          path: 'dashboard', component: DashboardComponent, children: [
            { path: 'get-quote', component: GetQuoteComponent },
            { path: 'view-quotes', component: ViewQuotesComponent },
            { path: 'manage-policies', component: ManagePoliciesComponent },
            { path: 'profile', component: BrokerProfileComponent }
          ]
        }
      ])
    ),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
