import { Component, AfterViewInit } from '@angular/core';

declare function clickCheckedAll(): void;
declare function initPagination(): void;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    clickCheckedAll(); 
    initPagination();
  }
}
