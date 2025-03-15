import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  standalone: true,              // Mark component as standalone
  imports: [FormsModule],         // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isHovered: boolean = false;     // If using hover animations

  constructor(private router: Router) {}

  login() {
    // Mock authentication (replace with an actual API call)
    if (this.email === 'broker@example.com' && this.password === 'password') {
      this.router.navigate(['/dashboard']); // Redirect to quote page on success
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
