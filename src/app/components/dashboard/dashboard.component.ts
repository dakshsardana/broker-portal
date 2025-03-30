import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule
  ]
})
export class DashboardComponent implements OnInit {
  currentPageTitle = 'Dashboard';
  userName = 'John Broker';
  showStats = true;
  
  quickStats = [
    { label: 'Active Policies', value: '24', icon: 'verified_user', color: 'blue' },
    { label: 'Pending Quotes', value: '5', icon: 'pending_actions', color: 'orange' },
    { label: 'Renewals Due', value: '3', icon: 'update', color: 'red' },
    { label: 'Total Clients', value: '42', icon: 'groups', color: 'green' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageTitle(event.urlAfterRedirects);
      });
  }

  updatePageTitle(url: string) {
    this.showStats = url.endsWith('/dashboard') || url.endsWith('/dashboard/');
    
    if (url.includes('get-quote')) {
      this.currentPageTitle = 'Get a Quote';
    } else if (url.includes('view-quotes')) {
      this.currentPageTitle = 'View Quotes';
    } else if (url.includes('manage-policies')) {
      this.currentPageTitle = 'Manage Policies';
    } else if (url.includes('profile')) {
      this.currentPageTitle = 'Profile';
    } else {
      this.currentPageTitle = 'Dashboard Overview';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}