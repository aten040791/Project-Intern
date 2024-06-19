import { Component } from '@angular/core';
import { NavComponent } from './layouts/nav/nav.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  title = 'admin';

  toggleIcon() {
    const htmlElement = document.documentElement; // Truy cập phần tử <html>
    if (htmlElement.classList.contains('layout-menu-fixed')) {
      htmlElement.classList.remove('layout-menu-expanded');
    } else {
      htmlElement.classList.add('layout-menu-expanded');
    }
  }
  
}
