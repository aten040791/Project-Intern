import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/auth/pages/login/services/login.service';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';
import { LanguagePageService } from '../../pages/language-page/services/language-page.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  item: any = {}
  languages: any[] = []

  constructor(private loginService: LoginService, private http: ApiService, private router: Router, private languageService: LanguagePageService) {}

  ngOnInit(): void {
    this.item = this.loginService.getItem()
    // this.languages = this.languageService.getItems()
    // console.log(this.languages)
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
  
}
