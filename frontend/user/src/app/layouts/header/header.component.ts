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
  // itemsPerPage: number = 10;
  // currentPage: number = 1;

  constructor (
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.fetchDataCategory();
  };

  fetchDataCategory(): void {
    this.apiService.fetchDataCategory().subscribe({
      next: response => {
        console.log('API Response - Categories:', response.data);
        if (Array.isArray(response.data)) {
          this.responseDataCategory = response.data;
        } else {
          this.responseDataCategory = [];
        }
      },
      error: error => {
        console.error('Failed to fetch categories:', error);
      }
    });
  };
}
