import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

  constructor(private router: Router) {}

  logoUrl: string = '../assets/img/logo/logo.png';

  isCheck: boolean = false;           // when a tag menu-item is opened, isCheck = true
  activeItem: string = '';            // You can set a default active item
  openItem: string = '';
  activeSubItem: string = '';         // To manage sub-menu active state
  url: string = '';
  listItem: any = {
    home: 'analytics',
    dashboards: 'analytics',
    users: 'users-list',
    categories: 'categories-list',
    languages: 'languages-list',
  }

  ngOnInit(): void {
    this.handleSideBar()
    this.router.url.split('?')[0].split('/').forEach((e: string, index: number, array: string[]) => {
      if (e !== "" && (index + 1 !== array.length)) {
        // this.listItem[e] = array[index + 1]
        this.openItem = e;
        this.activeItem = e;
        this.activeSubItem = e + "-" + array[index + 1];
        this.isCheck = true;
      }
    })
  }

  setActiveAndOpenItem(item: string): void {
    this.openItem = item;
    this.activeItem = item;
    this.isCheck = true;
  }

  setActiveSub(subItem: string) {
    this.url = this.router.url;
    this.activeSubItem = subItem;
  }

  handleSideBar(): void {
    const url = this.router.url.substring(1);
    
    if (url === 'home' || url === 'dashboards') {
      this.activeItem = 'dashboards'
      this.openItem = 'dashboards'
      this.activeSubItem = this.listItem[url];
    } else {
      this.activeItem = url
      this.openItem = url
      this.activeSubItem = this.listItem[url];
    }
  }

}
