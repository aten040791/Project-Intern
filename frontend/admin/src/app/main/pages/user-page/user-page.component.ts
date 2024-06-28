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

export class UserPageComponent implements OnInit {

  constructor(private selectAllService: SelectAllService, private itemDetail: UserPageService, private api: ApiService, private router: Router) {}

  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  isShowEdit: boolean = false;

  // pagination
  currentPage: number = 1;
  limit: number = 10;
  pages: number = 0;

  item: any = {}
  items: User[] = []
  url: string = ""

  // handle deleting
  checkBoxs = new Set<number>();
  checkBoxsTmp = new Set<number>();
  idDelete = new Set<number>();
  
  ngOnInit(): void {
    this.loadItems()
    this.url = this.router.url
  }

  // load data
  loadItems() {
    this.api.getItems("users", this.currentPage, this.limit).subscribe({
      next: (data: any) => {
        data = data.data.users
        this.items = data["result"].slice()
        this.pages = data["pages"]
      }, 
      error: (error) => {
        console.error('Error fetching items', error);
      }
    });
  }

  // from SelectAllService
  handleCheckBoxAll(event: any): void {
    this.selectAllService.selectAll(event)
    // add all items
    this.items.forEach(item => {
      // fix
      this.checkBoxsTmp.add(item.id)
    })
  }

  // handle each checkbox
  handleCheckBox(event: any, item: any): void {
    if (event.target.checked) {
      this.checkBoxsTmp.add(item.id)
    } else {
      this.checkBoxsTmp.delete(item.id)
    }
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

  // xử lí khi thay đổi select, tức là giới hạn mỗi trang
  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.loadItems()
  }

  // view detail
  initItem(item: any): void {
    this.itemDetail.setaItem(item)
    this.item = this.itemDetail.getaItem()
  }

  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

  onClickDeleteAll(): void {
    this.idDelete = this.checkBoxsTmp
  }

  // submit search
  onSubmitSearch(data: any): void {
    console.log(data)
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

}


