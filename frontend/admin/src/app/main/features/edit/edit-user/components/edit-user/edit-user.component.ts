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
  image: File | null = null;

  errors: any[] = [];
  
  constructor(private userPageService: UserPageService, private http: ApiService) {}

  closeDialog(): void {
    this.close.emit();
  }

  onSubmit(form: any): void {
    const formData = new FormData();
    
    if (this.image) {
      formData.append('avatar', this.image);
    }

    formData.append('fullname', form.fullname);
    formData.append('username', form.username);
    formData.append('role_id', form.role_id);
    formData.append('email', form.email);
    formData.append('status', form.status);
    formData.append('address', form.address);
    formData.append('password', "password");
    formData.append('phone', form.phone);

    this.http.updateItem("users", formData, this.item.id).subscribe({
      next: (data: any) => {
        window.location.reload();
      },
      error: (error: any) => {
        // console.error(error);
        this.errors = error["error"]["data"]["errors"];
      }
    })
  }
  
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

}
