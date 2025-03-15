import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-policies',
  templateUrl: './manage-policies.component.html',
  styleUrls: ['./manage-policies.component.css']
})
export class ManagePoliciesComponent {
  policies = [
    { id: 'P-001', customer: 'John Doe' },
    { id: 'P-002', customer: 'Jane Smith' }
  ];

  renewPolicy(id: string) {
    alert(`Policy ${id} renewed successfully!`);
  }

  cancelPolicy(id: string) {
    alert(`Policy ${id} cancelled!`);
  }
}
