import { Component } from '@angular/core';

@Component({
  selector: 'app-view-quotes',
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.css']
})
export class ViewQuotesComponent {
  quotes = [
    { fullName: 'John Doe', email: 'john@example.com', coverageAmount: 100000, premium: 5000 },
    { fullName: 'Jane Smith', email: 'jane@example.com', coverageAmount: 50000, premium: 2500 }
  ];
}
