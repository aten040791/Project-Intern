import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faNewspaper, faDashboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faDashboard = faDashboard;
  faNewspaper = faNewspaper;
  faUser = faUser;

  constructor(private router: Router) {}

  isDashboardActive(): boolean {
      return this.router.isActive('/#', true);
  }

  isPostActive(): boolean {
      return this.router.isActive('/home', true);
  }

  isAccountActive(): boolean {
      return this.router.isActive('/account-page', true);
  }

  ngOnInit(): void {}
}
