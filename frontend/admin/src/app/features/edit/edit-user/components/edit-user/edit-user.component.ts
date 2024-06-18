import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserPageService } from 'src/app/pages/user-page/services/user-page.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent {
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  public item: any

  constructor(private itemDetail: UserPageService) {
    this.item = this.itemDetail.getaItem()
  }

  closeDialog(): void {
    this.close.emit();
  }

}
