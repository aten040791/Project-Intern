import { Component } from '@angular/core';
import { ApiService } from '../../shared/httpApi/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent {

  constructor(private http: ApiService, private router: Router) {}

  image: File | null = null;
  imageSize: number | null = null;
  uploadProgress: number = 0;

  onSubmit(form: any): void {

    const formData = new FormData();
    formData.append('fullname', form.fullname);
    formData.append('username', form.username);
    formData.append('role_id', form.role_id);
    formData.append('email', form.email);
    formData.append('status', form.status);
    formData.append('address', form.address);
    formData.append('password', "password");
    formData.append('phone', form.phone);

    if (this.image) {
      formData.append('avatar', this.image);
    }

    this.http.createItem("users", formData).subscribe({
      next: (data: any) => {
        // window.location.reload();
        this.router.navigate(['/users']);
      },
      error: (error: Error) => {
        // console.error(error);
        alert(`Error fetching items: ${error.message}`)
      }
    })

  }

  triggerFileInputClick(): void {
    const upload = document.getElementById('upload') as HTMLInputElement;
    if (upload) {
      upload.click();
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.imageSize = this.image.size / 1000;
    }
  }

}
