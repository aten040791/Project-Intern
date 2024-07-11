import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {
  
  constructor(private router: Router, private http: ApiService) {}
  
  item: any = {}
  url: string = ""
  checkConfirm: boolean = false

  // delete
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  idDelete = new Set<number>();

  // update
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  image: File | null = null;


  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    const id = localStorage.getItem('user_id');
    // if (!id) {
    //   this.router.navigate(['/auth/login'])
    // }
    this.http.getUser(id).subscribe({
      next: (data: any) => {
        this.item = data["data"]
      },
      error: (error: Error) => {
        alert(`Error fetching items: ${error.message}`)
      },
    })
  }

  // update
  onSubmit(form: any): void {
    const formData = new FormData();

    if (this.image) {
      formData.append('avatar', this.image);
    }

    formData.append('fullname', form.fullname);
    formData.append('username', form.username);
    formData.append('role_id', '1');
    formData.append('email', form.email);
    formData.append('status', form.status);
    formData.append('address', form.address);
    formData.append('password', "password");
    formData.append('phone', form.phone);

    this.http.updateItem("users", formData, this.item.id).subscribe({
      next: (data: any) => {
        window.location.reload();
      },
      error: (error: Error) => {
        console.error(error);
      }
    })
  }
  
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }
  }

  // delete
  toggleDelete(): void {
    this.isDelete = !this.isDelete
  }

  toggleDeleteSuccess(): void {
    this.isDeleteSuccess = !this.isDeleteSuccess
  }

  toggleDeleteFailed(): void {
    this.isDeleteFailed = !this.isDeleteFailed
  }
  
  onClickDelete(item: any): void {
    this.idDelete.add(item.id)
  }

  onCheckConfirm(): void {
    this.checkConfirm = !this.checkConfirm
  }

}
