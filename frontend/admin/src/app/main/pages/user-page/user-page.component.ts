import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserPageService } from './services/user-page.service';
import { SelectAllService } from '../../features/select-all/services/select-all.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService, private itemDetail: UserPageService, private cdr: ChangeDetectorRef) {}

  isShow:boolean = false;
  isDelete: boolean = false;
  isShowEdit: boolean = false;
  itemsPerPage: number = 10;
  paginatedItems: any[] = [];

  items: any[] = [
    {
      id: "1",
      username: "hoang",
      email: "aaa@gmail.com",
      phone: "0365203656",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      username: "hoang",
      email: "bbb@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "active",
    },
    {
      id: "3",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "4",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "5",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "6",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "7",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "8",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "9",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "10",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
    {
      id: "11",
      username: "hoang",
      email: "ccc@gmail.com",
      phone: "0365203656",
      role: "user",
      status: "inactive",
    },
  ]

  // default itemsPerPage = 10
  ngOnInit(): void {
    this.updatePaginatedItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage']) {
      this.updatePaginatedItems();
    }
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
  }

  updatePaginatedItems(): void {
    // const startIndex = (1 - 1) * this.itemsPerPage;
    // const startIndex = 0;
    // const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.items.slice(0, this.itemsPerPage);
    // this.cdr.detectChanges(); // Yêu cầu Angular thực hiện kiểm tra lại
  }

}


