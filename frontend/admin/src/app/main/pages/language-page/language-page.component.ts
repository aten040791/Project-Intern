import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService) {}


  isShow:boolean = false;
  isDelete: boolean = false;
  isShowEdit: boolean = false;
  itemsPerPage: number = 10;
  paginatedItems: any[] = [];
  items: any = [
    {id: "#1", name: "Việt Nam", locale: "vi", flag: "../assets/img/avatars/vn_flag.png", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#3", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#4", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#5", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#6", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#2", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "inactive"},
    {id: "#16", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#17", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#18", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#19", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#20", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#21", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
    {id: "#22", name: "English", locale: "en", flag: "../assets/img/avatars/en_flag.jpg", status: "active"},
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

  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.itemsPerPage = parseInt(option.value)
    this.updatePaginatedItems()
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
  
  updatePaginatedItems(): void {
    // const startIndex = (1 - 1) * this.itemsPerPage;
    // const startIndex = 0;
    // const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.items.slice(0, this.itemsPerPage);
    // this.cdr.detectChanges(); // Yêu cầu Angular thực hiện kiểm tra lại
  }

}
