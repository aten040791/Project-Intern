import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  public item: any

  constructor(private itemDetail: UserPageService) {}

  ngOnInit(): void {
    this.item = this.itemDetail.getaItem()
  }

  closeDialog(): void {
    this.close.emit();
  }

}
