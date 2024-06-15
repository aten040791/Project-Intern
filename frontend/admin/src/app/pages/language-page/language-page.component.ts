import { Component, AfterViewInit } from '@angular/core';

declare function clickCheckedAll(): void;
declare function initPagination(): void;

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    clickCheckedAll(); 
    initPagination();
  }
  
}
