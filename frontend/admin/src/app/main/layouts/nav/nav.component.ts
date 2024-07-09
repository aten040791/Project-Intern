import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/auth/pages/login/services/login.service';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';
import { LanguagePageService } from '../../pages/language-page/services/language-page.service';
import { language } from '../../interfaces/language/language';
// import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../shared/i18n/translation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  constructor(private loginService: LoginService, private http: ApiService, private router: Router, private languageService: LanguagePageService, private translate: TranslationService) {}

  item: any = {}
  languages: any[] = []
  icActive: boolean = false
  selectedLanguage: any = {}

  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;
  search: string = "";

  ngOnInit(): void {
    this.loadData()
    this.translate.setDefaultLang('en')
    this.selectedLanguage.locale = "en"
  }

  loadData() {
    const id = localStorage.getItem('user_id');
    // const accessToken = localStorage.getItem('access_token')

    // if (!accessToken || !id) {
    //   this.router.navigate(['/auth/login'])
    // }

    this.http.getUser(id).subscribe({
      next: (data: any) => {
        this.item = data["data"]
        this.loadLanguage()
      },
      error: (err: any) => {
        // alert(`Error fetching items: ${err.message}`)
        // this.router.navigate(['/auth/login'])
      }
    })
    
  }

  loadLanguage() {
    this.http.getItems('/languages', this.search, this.currentPage, this.limit).subscribe({
      next: (data: any) => {
        this.languages = data["data"]["result"]
        this.languages.map((language: language) => {
          if (language.locale === 'en') {
            this.selectedLanguage = language
          }
        })

      },
      error: (err: any) => {
        // this.router.navigate(['/auth/login'])
      }
    })
  }

  toggleIcon() {
    const htmlElement = document.documentElement; // Truy cập phần tử <html>
    if (htmlElement.classList.contains('layout-menu-fixed')) {
      htmlElement.classList.add('layout-menu-expanded');
    } else {
      htmlElement.classList.remove('layout-menu-expanded');
    }
  }

  onLogOut() {
    this.http.logout()
    this.router.navigate(['/auth/login'])
  }

  onClickActive(language: any): void {
    this.selectedLanguage = language
    this.translate.switchLang(this.selectedLanguage.locale);
  }
  
}
