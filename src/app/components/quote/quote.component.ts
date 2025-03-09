import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule

@Component({
  selector: 'app-quote',
  standalone: true,  // ✅ Make it standalone
  imports: [FormsModule],  // ✅ Allow ngModel
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent {
  client = { name: '', email: '', phone: '', company: '', industry: '', employees: 0, cyberCoverage: 0 };

  submitForm() {
    console.log('Form Submitted:', this.client);
  }
}
