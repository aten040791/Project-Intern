import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ApiService } from 'src/app/services/api.service';
import { faBell, faCog, faEnvelopeOpen, faGlobe, faPowerOff, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faGlobe = faGlobe;
  faBell = faBell;
  faEnvelopeOpen = faEnvelopeOpen;
  faUser = faUser;
  faCog = faCog;
  faPowerOff = faPowerOff;
  faBars = faBars;

  languageDropdownOpen = false;
  notificationsDropdownOpen = false;
  userDropdownOpen = false;
  profile: any;

  constructor(private apiService: ApiService, private router: Router) {
    library.add(faSearch, faGlobe, faBell, faEnvelopeOpen, faUser, faCog, faPowerOff, faBars);
  }

  toggleIcon() {
    const htmlElement = document.documentElement; // Truy cập phần tử <html>
    if (htmlElement.classList.contains('layout-menu-fixed')) {
      htmlElement.classList.add('layout-menu-expanded');
    } else {
      htmlElement.classList.remove('layout-menu-expanded');
    }
  };

  ngOnInit(): void {
    this.getProfile();
  };

  getProfile() {
    this.apiService.getProfile().subscribe({
      next: response => {
        console.log('API Response - Profile:', response.data.user);
          this.profile = response.data.user;
      },
      error: error => {
        console.error('Failed to fetch profile:', error);
      }
    });
  };

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  };

}
