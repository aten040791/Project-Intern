import { Component } from '@angular/core';
import { SelectAllService } from 'src/app/features/select-all/services/select-all.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  constructor(private selectAllService: SelectAllService) {}

  isShow:boolean = false;
  isDelete: boolean = false;

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

}
