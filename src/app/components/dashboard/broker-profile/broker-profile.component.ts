import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule

@Component({
  selector: 'app-broker-profile',
  standalone: true, // ✅ Ensure it's a standalone component
  imports: [CommonModule, FormsModule], // ✅ Import FormsModule
  templateUrl: './broker-profile.component.html',
  styleUrls: ['./broker-profile.component.css']
})
export class BrokerProfileComponent {
  profile = {
    name: 'John Doe',
    email: 'broker@example.com'
  };

  updateProfile() {
    console.log("Updated profile:", this.profile);
  }
}
