import { Component } from '@angular/core';
import { ShowPasswordService } from '../../features/show-password/show-password.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email: string = ""
  password: string = ""

  isCheckPW: boolean = false
  inputType: string = 'password'


  constructor(public showPW: ShowPasswordService, private http: ApiService, private router: Router) {}

  togglePW(): void {
    this.showPW.showPassWord();
    this.isCheckPW = this.showPW.isShowPassWord;
    this.inputType = this.showPW.inputType
  }

  onSubmit(data: any): void {
    this.email = data["email-username"]
    this.password = data["password"]
    this.http.login("auth", this.email, this.password).subscribe({
      next: (data: any) => {
        this.router.navigate(['/home'])
      }, 
      error: (error: Error) => {
        // console.error('Email or password is wrong', error);
        alert('Email or password is wrong !!')
      }
    })
  }

}
