import { Component } from '@angular/core';

declare function clickCheckedAll(): void;
declare function initPagination(): void;

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  constructor() { }

  ngAfterViewInit(): void {
    clickCheckedAll(); 
    initPagination();
  }
  
}
