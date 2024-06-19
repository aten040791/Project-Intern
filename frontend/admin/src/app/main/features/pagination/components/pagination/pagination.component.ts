import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserPageComponent } from 'src/app/main/pages/user-page/user-page.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Output() paginatedItems = new EventEmitter<any[]>();
  currentPage: number = 1;
  // itemsPerPage: number = 10;
  @Input() itemsPerPage: number = 10

  ngOnInit(): void {
      this.updatePaginatedItems()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage']) {
      this.itemsPerPage = changes['itemsPerPage'].currentValue;
      this.currentPage = 1
      this.updatePaginatedItems();
    }
  }

  updatePaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const paginated = this.items.slice(startIndex, endIndex);
    this.paginatedItems.emit(paginated);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedItems();
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

}
