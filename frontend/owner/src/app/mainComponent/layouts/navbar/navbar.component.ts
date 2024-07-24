import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ApiService } from 'src/app/services/api.service';
import { faBell, faCog, faEnvelopeOpen, faGlobe, faPowerOff, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TranslationService } from '../../shared/i18n/translation.service';

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

  item: any = {};
  languages: any[] = [];
  icActive: boolean = false;
  selectedLanguage: any = {};

  constructor(private apiService: ApiService, private router: Router, private translate: TranslationService) {
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
    this.getDataLanguage();
    this.selectedLanguage.locale = localStorage.getItem('locale');
    this.selectedLanguage = this.languages.find(language => language.locale === this.selectedLanguage.locale) || {};
    this.translate.setDefaultLang(this.selectedLanguage.locale);
  };

  getProfile() {
    this.apiService.getProfile().subscribe({
      next: response => {
          this.profile = response.data.user;
      },
      error: error => {
        console.error('Failed to fetch profile:', error);
      }
    });
  };

  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe(
      response => {
        if (Array.isArray(response.data)) {
          this.languages = response.data;
          const locale = localStorage.getItem('locale');
          this.selectedLanguage = this.languages.find(language => language.locale === locale) || this.languages[0];
        } else {
          this.languages = [];
        }
      },
      error => {
        console.error('Failed to fetch languages:', error);
      }
    );
  };

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  };

  onClickActive(language: any): void {
    this.selectedLanguage = language
    this.translate.switchLang(this.selectedLanguage.locale);
    localStorage.setItem('locale', this.selectedLanguage.locale)
  };

}
