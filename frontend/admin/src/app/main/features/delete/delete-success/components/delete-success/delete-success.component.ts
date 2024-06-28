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
  @Input() idDelete: Set<any> = new Set<number>();
  @Output() close = new EventEmitter<void>();

  constructor(private userPageService: UserPageService, private http: ApiService) {}

  closeDialogSuccess(): void {
    // todo: to delete checkboxs if click button delete all
    if (this.checkBoxs.size > 0) {
      const arrayCheckBoxs = {
        ids: Array.from(this.checkBoxs)
      }
      
      this.http.deleteItem(this.url, arrayCheckBoxs).subscribe({
        next: (data: any) => {
          console.log(data)
          window.location.reload()
        },
        error: (error: any) => {
          console.log(error)
        }
      })
    } 

    // todo: to delete particularly id
    if (this.idDelete.size > 0) {
      console.log(this.idDelete)
      const arrayId = {
        ids: Array.from(this.idDelete)
      }
      this.http.deleteItem(this.url, arrayId).subscribe({
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
