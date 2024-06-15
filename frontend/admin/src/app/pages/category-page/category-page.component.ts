import { Component } from '@angular/core';
import { SelectAllService } from 'src/app/features/select-all/services/select-all.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  constructor(private selectAllService: SelectAllService) { }

  // from SelectAllService
  handleCheckBox(event: any): void {
    this.selectAllService.selectAll(event)
  }
  
}
