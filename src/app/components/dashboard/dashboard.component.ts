import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,              // Mark component as standalone
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule]         // Add FormsModule here
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // Perform logout logic here (clear session, etc.)
    localStorage.removeItem('token');
    console.log('Logged out!');
    this.router.navigate(['/login']);  // Redirect to login
  }
}
