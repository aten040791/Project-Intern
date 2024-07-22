import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, takeWhile, timer } from 'rxjs';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent implements OnInit {
  
  constructor(private router: Router, private http: ApiService) {}

  errors: any[] = []
  
  item: any = {}
  url: string = ""
  checkConfirm: boolean = false
  isShowDeactive: boolean = true

  // delete
  isDelete: boolean = false;
  isDeleteSuccess: boolean = false;
  isDeleteFailed: boolean = false;
  idDelete = new Set<number>();
  isReset: boolean = false

  // update
  @Input() isShowEdit: boolean = false;
  @Output() close = new EventEmitter<void>();
  image: File | null = null;

  // display img tmp
  showImageTmp: string = "";

  // timeRemaining$ = timer(0, 1000).pipe(
  //   map(n => (86400 - n) * 1000), // 86400s = 24h
  //   takeWhile(n => n >= 0),
  // );

  timeRemaining: { [id: number]: Observable<number> } = {};

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
      error: (error: any) => {
        // alert(`Error fetching items: ${error.message}`)
        this.errors = error["error"]["data"]["errors"];
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
      error: (error: any) => {
        console.error(error["error"]["data"]["errors"]);
        this.errors = error["error"]["data"]["errors"];
      }
    })
  }
  
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
      this.showImageTmp = "http://localhost:3000/" + this.image.name
      this.isReset = false
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
    this.timeRemaining[item.id] = timer(0, 1000).pipe(
      map(n => (86400 - n) * 1000), // 86400s = 24h
      takeWhile(n => n >= 0),
    );
    // store
    this.timeRemaining[item.id].subscribe(time => {
      localStorage.setItem('countdown_time', time.toString());
    });

    this.isShowDeactive = !this.isShowDeactive
  }

  onCheckConfirm(): void {
    this.checkConfirm = !this.checkConfirm
  }

  onClickCancel(item: any): void {
    this.idDelete.delete(item.id)
    this.isShowDeactive = !this.isShowDeactive
    localStorage.removeItem('countdown_time');
  }

  onReset(): void {
    this.isReset = true
  }

}
