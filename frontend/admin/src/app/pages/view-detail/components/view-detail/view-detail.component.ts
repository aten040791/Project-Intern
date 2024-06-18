import { Component, OnInit } from '@angular/core';
import { UserPageService } from 'src/app/pages/user-page/services/user-page.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})

export class ViewDetailComponent implements OnInit {

  item: any = {}
  isShowEdit: boolean = false

  constructor(private itemDetail: UserPageService) {}

  ngOnInit(): void {
    this.item = this.itemDetail.getaItem()
  }

  // show edit modal
  toggleShowEdit(): void {
    this.isShowEdit = !this.isShowEdit
  }

}
