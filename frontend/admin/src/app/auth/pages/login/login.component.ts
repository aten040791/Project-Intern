import { Component } from '@angular/core';
import { ShowPasswordService } from '../../features/show-password/show-password.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { AuthService } from '../../auth.service';

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

  isDropdown: boolean = false

  constructor(public showPW: ShowPasswordService, private http: ApiService, private router: Router, private loginService: LoginService, private authService: AuthService) {}

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
        this.loginService.setItem(data.data.user)
        this.router.navigate(['/home'])
      }, 
      error: (error: Error) => {
        alert('Email or password is wrong !!')
      }
    })
  }

  onDropdown(): void {
    this.isDropdown = !this.isDropdown
  }

}
