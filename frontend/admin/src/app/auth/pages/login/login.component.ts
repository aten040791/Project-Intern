import { Component } from '@angular/core';
import { ShowPasswordService } from '../../features/show-password/show-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  isCheckPW: boolean = false
  inputType: string = 'password'

  constructor(public showPW: ShowPasswordService) {}

  togglePW(): void {
    this.showPW.showPassWord();
    this.isCheckPW = this.showPW.isShowPassWord;
    this.inputType = this.showPW.inputType
  }

}
