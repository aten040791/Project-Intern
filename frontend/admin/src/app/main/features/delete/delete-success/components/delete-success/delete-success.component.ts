import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteSuccessService } from '../../services/delete-success.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-success',
  templateUrl: './delete-success.component.html',
  styleUrls: ['./delete-success.component.scss']
})

export class DeleteSuccessComponent {
  constructor(private userPageService: UserPageService, private http: ApiService, private router: Router) {}

  @Input() isDeleteSuccess: boolean = false;
  @Input() item: any = {}
  @Input() url: string = ""
  @Input() checkBoxs: Set<any> = new Set<number>();
  @Input() idDelete: Set<any> = new Set<number>();
  @Output() close = new EventEmitter<void>();

  closeDialogSuccess(): void {
    // todo: to delete checkboxs if click button delete all
    if (this.checkBoxs.size > 0) {
      const arrayCheckBoxs = {
        ids: Array.from(this.checkBoxs)
      }
      
      this.http.deleteItem(this.url, arrayCheckBoxs).subscribe({
        next: (data: any) => {
          this.router.navigate([this.url])
          window.location.reload()
        },
        error: (error: any) => {
          // console.log(error)
        }
      })
    }

    // todo: to delete particularly id
    if (this.idDelete.size > 0) {
      // console.log(this.idDelete)
      const arrayId = {
        ids: Array.from(this.idDelete)
      }
      this.http.deleteItem(this.url, arrayId).subscribe({
        next: (data: any) => {
          this.router.navigate([this.url])
          window.location.reload()
        },
        error: (error: any) => {
          // console.log(error)
        }
      })
    }

  }

}
