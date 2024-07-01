import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() limit: number = 10;
  @Input() pages: number = 0
  @Input() currentPage: number = 1
  @Output() currentPageChange = new EventEmitter<number>()
  subPages: number[] = []

  ngOnInit(): void {
    this.currentPage = Number(this.currentPage);
    this.limit = Number(this.limit);
    // this.getPages()
  }

  onPageChange(currentPage: any) {
    this.currentPageChange.emit(currentPage);
    this.currentPage = currentPage;
    // this.getPages()
  }

  // getPages(): void {

  //   const subPages: number[] = [];

  //   // pages = 3
  //   // currentPage = 3 => start = 2, end = 3
  //   // subPages = [2, 3]
  //   const start = this.currentPage > 2 ? this.currentPage - 1 : 1;
  //   const end = this.currentPage + 1 < this.pages ? this.currentPage + 1 : this.pages;

  //   for (let i = start; i <= end; i++) {
  //     subPages.push(i);
  //   }

  //   this.subPages = subPages;

  // }

  checkExitsPage(page: number): boolean {
    return this.subPages.includes(page)
  }

  getDisplayPages(): (number | string)[] {
    const displayPages: (number | string)[] = [];

    if (this.pages <= 2) {
      // Hiển thị tất cả các trang nếu số trang nhỏ hơn hoặc bằng 2
      for (let i = 1; i <= this.pages; i++) {
        displayPages.push(i);
      }
    } else {
      // Hiển thị trang đầu, trang cuối và ...
      if (this.currentPage > 1) {
        displayPages.push(1);
        if (this.currentPage > 2) {
          displayPages.push('...');
        }
      }

      displayPages.push(this.currentPage);

      if (this.currentPage < this.pages) {
        if (this.currentPage < this.pages - 1) {
          displayPages.push('...');
        }
        displayPages.push(this.pages);
      }
    }

    return displayPages;
  }

}
