import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/main/interfaces/user/user';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent {

  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private http: ApiService) {}

  closeDialog(): void {
    this.close.emit();
  }

  // submit 
  onSubmit(data: User): void {
    // password default
    data.password = "password"
    console.log(data)
    this.http.createItem("users", data).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
