import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faShieldAlt, 
  faChartLine, 
  faBolt,
  faPhone,
  faEnvelope,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule],
})
export class HomeComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  currentYear!: number;

  // Font Awesome icons
  icons = {
    shield: faShieldAlt,
    chart: faChartLine,
    bolt: faBolt,
    phone: faPhone,
    email: faEnvelope,
    marker: faMapMarkerAlt
  };

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}