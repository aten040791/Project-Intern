import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  responseDataCategory: any[] = [];
  isMenuOpen: boolean = true;
  activeCategoryId: number | null = null;

  constructor (
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getDataCategory();
  };

  onTouchOn(): void {
    this.isMenuOpen = !this.isMenuOpen;
  };

  onCloseMenu(): void {
    this.isMenuOpen = false;
  };

  setActiveCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
  }

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data;
      console.log(this.responseDataCategory);
    });
  };
}
