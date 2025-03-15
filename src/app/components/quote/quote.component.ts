import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition(':enter', [animate('500ms ease-out')]),
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hover', animate('200ms ease-in-out')),
    ]),
  ],
})
export class QuoteComponent {
  client = {
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    employees: '',
    cyberCoverage: '',
  };

  isHovered = false; // Button hover state

  submitForm() {
    console.log('Quote Request Submitted:', this.client);
  }
}
