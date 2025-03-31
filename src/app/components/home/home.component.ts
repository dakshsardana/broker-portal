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
import { faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FontAwesomeModule],
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
    marker: faMapMarkerAlt,
    twitter: faTwitter,
    linkedin: faLinkedin,
    facebook: faFacebook
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
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}