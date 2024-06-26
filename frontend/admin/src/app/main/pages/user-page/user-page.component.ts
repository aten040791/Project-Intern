import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserPageService } from './services/user-page.service';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { User } from '../../interfaces/user/user';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService, private itemDetail: UserPageService, private api: ApiService, private router: Router) {}

  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  isShowEdit: boolean = false;
  itemsPerPage: number = 10;
  paginatedItems: any[] = [];
  item: any = {}
  items: User[] = []
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

  // load data from api
  loadItems() {
    this.api.getItems("users").subscribe({
      next: (data: any) => {
        // data = Object.values(data)[1]
        data = data.data
        this.items = data.users.slice()
        this.updatePaginatedItems()
      }, 
      error: (error) => {
        console.error('Error fetching items', error);
      }
    });
  }

  // from SelectAllService
  handleCheckBox(event: any): void {
    this.selectAllService.selectAll(event)
  }

  // Add new user
  toggleShow(): void {
    this.isShow = !this.isShow
  }

  toggleDelete(): void {
    this.isDelete = !this.isDelete
    console.log(this.isDeleteSuccess)
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

  // view detail
  initItem(item: any): void {
    this.itemDetail.setaItem(item)
    this.item = this.itemDetail.getaItem()
  }

  // update khi truyển vào bảng
  updatePaginatedItems(): void {
    this.paginatedItems = this.items.slice(0, this.itemsPerPage);
    // console.log(this.paginatedItems)
  }

}


