import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { LoginComponent } from './app/components/login/login.component';
import { QuoteComponent } from './app/components/quote/quote.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'quote', component: QuoteComponent }
    ]),
    importProvidersFrom(FormsModule)
  ]
}).catch(err => console.error(err));
