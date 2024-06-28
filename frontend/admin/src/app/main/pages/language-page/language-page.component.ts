import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAllService } from '../../features/select-all/services/select-all.service';
import { language } from '../../interfaces/language/language';
import { ApiService } from '../../shared/httpApi/api.service';
import { LanguagePageService } from './services/language-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-page',
  templateUrl: './language-page.component.html',
  styleUrls: ['./language-page.component.scss']
})
export class LanguagePageComponent implements OnInit, OnChanges {

  constructor(private selectAllService: SelectAllService, private http: ApiService, private languageService: LanguagePageService, private router: Router) {}

  // check dialog
  isShow:boolean = false;
  isDelete: boolean = false;
  isDeleteFailed: boolean = false;
  isDeleteSuccess: boolean = false;
  isShowEdit: boolean = false;

  limit: number = 10;
  paginatedItems: any[] = [];
  item: any = {}
  items: language[] = []
  url: string = ""

  // handle delete items
  checkBoxs = new Set<number>();
  checkBoxsTmp = new Set<number>();
  idDelete = new Set<number>();
  
   ngOnInit(): void {
    this.loadItems()
    this.updatePaginatedItems();
    this.url = this.router.url
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['limit']) {
      this.updatePaginatedItems();
    }
  }

  loadItems() {
    // this.http.getItems("languages").subscribe({
    //   next: (data: any) => {
    //     this.items = data.data.languages.slice()
    //     this.updatePaginatedItems()
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
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

  handleItemsPerPage(event: Event): void {
    const option = event.target as HTMLSelectElement
    this.limit = parseInt(option.value)
    this.updatePaginatedItems()
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
  
  updatePaginatedItems(): void {
    this.paginatedItems = this.items.slice(0, this.limit);
  }

  // init language
  initLanguage(item: any): void {
    this.languageService.setItem(item)
    this.item = this.languageService.getItem()
  }

  // handle delete all
  onClickDeleteAll(): void {
    this.checkBoxs = this.checkBoxsTmp
  }

  // to delete a particularly item
  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

}
