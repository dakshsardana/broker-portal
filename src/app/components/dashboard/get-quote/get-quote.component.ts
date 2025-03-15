import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-quote',
  standalone: true,
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // ✅ Import ReactiveFormsModule here
})
export class GetQuoteComponent {
  currentStep = 0;
  steps = ['companyDetails', 'cyberSecurity', 'claimsHistory', 'coverage'];
  premium: number | null = null;

  form = new FormGroup({
    companyDetails: new FormGroup({
      companyName: new FormControl('', Validators.required),
      companyAddress: new FormControl('', Validators.required),
      businessType: new FormControl('', Validators.required),
      numEmployees: new FormControl('', [Validators.required, Validators.min(1)]),
    }),
    cyberSecurity: new FormGroup({
      firewall: new FormControl('yes', Validators.required),
      encryption: new FormControl('', Validators.required),
      dataBackup: new FormControl('', Validators.required),
    }),
    claimsHistory: new FormGroup({
      pastAttacks: new FormControl(''),
      financialLoss: new FormControl('', Validators.min(0)),
    }),
    coverage: new FormGroup({
      coverageAmount: new FormControl('', Validators.required),
      deductible: new FormControl('', Validators.required),
    })
  });

  goNext() {
    if (this.isStepValid()) {
      this.currentStep++;
    }
  }

  goPrevious() {
    this.currentStep--;
  }

  isStepValid(): boolean {
    const step = this.steps[this.currentStep];
    return this.form.get(step)?.valid || false;
  }

  onSubmit() {
    if (this.form.valid) {
      this.premium = Math.floor(Math.random() * 5000) + 1000; // Dummy premium calculation
      alert('Form submitted successfully!');
    }
  }
}