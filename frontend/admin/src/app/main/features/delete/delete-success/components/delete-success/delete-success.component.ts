import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteSuccessService } from '../../services/delete-success.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.scss']
})

export class DeleteSuccessComponent {
  @Input() isDeleteSuccess: boolean = false;
  @Input() item: any = {}
  @Input() url: string = ""
  @Input() checkBoxs: Set<any> = new Set<number>();
  @Output() close = new EventEmitter<void>();

  constructor(private userPageService: UserPageService, private http: ApiService) {}

  closeDialogSuccess(): void {
    if (this.checkBoxs.size > 0) {
      const stringCheckBoxs = {
        id: Array.from(this.checkBoxs).join(",")
      }
      
      this.http.deleteItem(this.url, stringCheckBoxs).subscribe({
        next: (data: any) => {
          console.log(data)
          window.location.reload()
        },
        error: (error: any) => {
          console.log(error)
        }
      })
      // console.log(this.checkBoxs)
    } else {
      this.http.deleteItem(this.url, this.item).subscribe({
        next: (data: any) => {
          console.log(data)
          window.location.reload()
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    }

  }

}
