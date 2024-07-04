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
    this.getDataCategory();
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data || [];
    });
  };
}
