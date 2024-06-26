import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EditUserService } from '../../services/edit-user.service';
import { UserPageService } from 'src/app/main/pages/user-page/services/user-page.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent {
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() item: any = {}
  
  constructor(private userPageService: UserPageService, private http: ApiService) {}

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(data: any): void {
    data.password = "password"
    this.http.updateItem("users", data, this.item.id).subscribe({
      next: (data: any) => {
        console.log(data)
        window.location.reload()
      },
      error: (error: Error) => {
        console.log(error)
      },
    })
  }

}
