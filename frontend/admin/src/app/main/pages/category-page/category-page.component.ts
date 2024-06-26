import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { Category } from '../../interfaces/category/category';
import { ApiService } from '../../shared/httpApi/api.service';
import { CategoryPageService } from './services/category-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService, private http: ApiService, private categoryService: CategoryPageService, private router: Router) {}

  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteFailed: boolean = false;
  isDeleteSuccess: boolean = false;
  isShowEdit: boolean = false;
  itemsPerPage: number = 10;
  paginatedItems: any[] = [];
  item: any = {};
  items: Category[] = []
  checkBoxs = new Set<number>();
  url: string = ""

  ngOnInit(): void {
    this.loadItems()
    this.updatePaginatedItems();
    this.url = this.router.url
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage']) {
      this.updatePaginatedItems();
    }
  }

  // load data
  loadItems() {
    this.http.getItems("categories").subscribe({
      next: (data: any) => {
        data = data.data
        this.items = data.categories.slice()
        this.updatePaginatedItems()
      },
      error: (error) => {
        console.error('Error fetching items', error);
      }
    })
  }
  
  // handle all checkbox
  handleCheckBoxAll(event: any): void {
    this.selectAllService.selectAll(event)
    // add all items
    this.items.forEach(item => {
      this.checkBoxs.add(item.id)
    })
  }

  // handle checkbox
  handleCheckBox(event: any, item: any): void {
    if (event.target.checked) {
      this.checkBoxs.add(item.id)
    } else {
      this.checkBoxs.delete(item.id)
    }
  }

  // Add new user
  toggleShow(): void {
    this.isShow = !this.isShow
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
  }

  toggleDeleteSuccess(): void {
    this.isDeleteSuccess = !this.isDeleteSuccess
  }

  toggleDeleteFailed(): void {
    this.isDeleteFailed = !this.isDeleteFailed
  }

  toggleEdit(): void {
    this.isShowEdit = !this.isShowEdit
  }

  handlePaginatedItems(paginatedItems: any[]) {
    this.paginatedItems = paginatedItems;
  }
  
  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.itemsPerPage = parseInt(option.value)
    this.updatePaginatedItems()
  }

  updatePaginatedItems(): void {
    this.paginatedItems = this.items.slice(0, this.itemsPerPage);
  }

  // init item
  initCategory(item: any): void {
    this.categoryService.setItem(item)
    this.item = this.categoryService.getItem()
  }

}
