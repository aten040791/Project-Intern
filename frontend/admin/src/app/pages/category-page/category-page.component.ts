import { Component } from '@angular/core';
import { SelectAllService } from 'src/app/features/select-all/services/select-all.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  constructor(private selectAllService: SelectAllService) { }

  isShow:boolean = false;
  isDelete:boolean = false;

  // from SelectAllService
  handleCheckBox(event: any): void {
    this.selectAllService.selectAll(event)
  }

  toggleShow(): void {
    this.isShow = !this.isShow
  }
  
  toggleDelete(): void {
    this.isDelete = !this.isDelete
  }

}
