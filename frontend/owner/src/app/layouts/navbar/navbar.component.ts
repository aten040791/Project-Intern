import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faCog, faEnvelopeOpen, faGlobe, faPowerOff, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {
    library.add(faSearch, faGlobe, faBell, faEnvelopeOpen, faUser, faCog, faPowerOff, faBars);
  }

  ngOnInit(): void {}
}
