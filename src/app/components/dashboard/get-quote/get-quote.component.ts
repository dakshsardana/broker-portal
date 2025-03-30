import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-get-quote',
  standalone: true,
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ]
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
      coverageAmount: new FormControl('', [Validators.required, Validators.min(10000)]),
      deductible: new FormControl('', [Validators.required, Validators.min(500)]),
    })
  });

  goNext() {
    if (this.isStepValid()) {
      this.currentStep++;
      window.scrollTo(0, 0);
    }
  }

  goPrevious() {
    this.currentStep--;
    window.scrollTo(0, 0);
  }

  isStepValid(): boolean {
    const step = this.steps[this.currentStep];
    return this.form.get(step)?.valid || false;
  }

  onSubmit() {
    if (this.form.valid) {
      // More realistic premium calculation based on form values
      const basePremium = 1000;
      const employees = Number(this.form.value.companyDetails?.numEmployees) || 1;
      const coverage = Number(this.form.value.coverage?.coverageAmount) || 1000000;
      const deductible = Number(this.form.value.coverage?.deductible) || 1000;
      const firewall = this.form.value.cyberSecurity?.firewall === 'yes' ? 0.9 : 1.2;
      
      this.premium = Math.round(
        basePremium * 
        (employees / 50) * 
        (coverage / 1000000) * 
        (10000 / deductible) * 
        firewall
      );
    }
  }
}