import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Policy {
  id: string;
  customerName: string;
  type: string;
  premium: number;
  startDate: string;
  endDate: string;
  status: string;
}

@Component({
  selector: 'app-manage-policies',
  imports: [CommonModule,RouterModule,FormsModule],
  standalone: true,
  templateUrl: './manage-policies.component.html',
  styleUrls: ['./manage-policies.component.css']
})
export class ManagePoliciesComponent {
  policies: Policy[] = [
    { 
      id: 'P-001', 
      customerName: 'John Doe', 
      type: 'cyber', 
      premium: 1200, 
      startDate: '2023-01-01', 
      endDate: '2024-01-01',
      status: 'active'
    },
    { 
      id: 'P-002', 
      customerName: 'Jane Smith', 
      type: 'liability', 
      premium: 850, 
      startDate: '2023-03-15', 
      endDate: '2024-03-15',
      status: 'active'
    },
    { 
      id: 'P-003', 
      customerName: 'Acme Corp', 
      type: 'property', 
      premium: 3500, 
      startDate: '2022-06-01', 
      endDate: '2023-06-01',
      status: 'expired'
    }
  ];

  filteredPolicies: Policy[] = [];
  searchText: string = '';
  selectedStatus: string = 'all';
  
  statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  showModal: boolean = false;
  isEditing: boolean = false;
  currentPolicy: Policy = this.emptyPolicy();
  
  showDeleteConfirmation: boolean = false;
  policyToDelete: string = '';

  constructor() {
    this.filteredPolicies = [...this.policies];
  }

  emptyPolicy(): Policy {
    return {
      id: '',
      customerName: '',
      type: 'cyber',
      premium: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      status: 'active'
    };
  }

  filterPolicies() {
    this.filteredPolicies = this.policies.filter(policy => {
      const matchesSearch = policy.customerName.toLowerCase().includes(this.searchText.toLowerCase()) || 
                          policy.id.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || policy.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusLabel(status: string): string {
    const found = this.statusOptions.find(opt => opt.value === status);
    return found ? found.label : status;
  }

  openAddPolicyModal() {
    this.currentPolicy = this.emptyPolicy();
    this.currentPolicy.id = 'P-' + Math.floor(1000 + Math.random() * 9000);
    this.isEditing = false;
    this.showModal = true;
  }

  openEditPolicyModal(policy: Policy) {
    this.currentPolicy = { ...policy };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitPolicyForm() {
    if (this.isEditing) {
      // Update existing policy
      const index = this.policies.findIndex(p => p.id === this.currentPolicy.id);
      if (index !== -1) {
        this.policies[index] = { ...this.currentPolicy };
      }
    } else {
      // Add new policy
      this.policies.push({ ...this.currentPolicy });
    }
    this.filterPolicies();
    this.closeModal();
  }

  renewPolicy(id: string) {
    const policy = this.policies.find(p => p.id === id);
    if (policy) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(startDate.getFullYear() + 1);
      
      policy.startDate = startDate.toISOString().split('T')[0];
      policy.endDate = endDate.toISOString().split('T')[0];
      policy.status = 'active';
      
      alert(`Policy ${id} renewed successfully until ${policy.endDate}`);
      this.filterPolicies();
    }
  }

  changePolicyStatus(id: string, status: string) {
    const policy = this.policies.find(p => p.id === id);
    if (policy) {
      policy.status = status;
      this.filterPolicies();
    }
  }

  confirmDelete(id: string) {
    this.policyToDelete = id;
    this.showDeleteConfirmation = true;
  }

  deletePolicy() {
    this.policies = this.policies.filter(p => p.id !== this.policyToDelete);
    this.filterPolicies();
    this.showDeleteConfirmation = false;
  }
}