import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { UserPageService } from '../user-page/services/user-page.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService, private cdr: ChangeDetectorRef) {}


  isShow:boolean = false;
  isDelete: boolean = false;
  isShowEdit: boolean = false;
  itemsPerPage: number = 10;
  paginatedItems: any[] = [];
  items: any = [
    {id: "#1", name: "Thời sự", time: "21 May, 2024", status: "active"},
    {id: "#2", name: "Thể thao", time: "21 May, 2024", status: "inactive"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "inactive"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "inactive"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "inactive"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "inactive"},
    {id: "#3", name: "Giải trí", time: "21 May, 2024", status: "active"},
  ]

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

  updatePaginatedItems(): void {
    // const startIndex = (1 - 1) * this.itemsPerPage;
    // const startIndex = 0;
    // const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.items.slice(0, this.itemsPerPage);
    // this.cdr.detectChanges(); // Yêu cầu Angular thực hiện kiểm tra lại
  }
  
}
