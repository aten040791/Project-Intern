import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { ShowPasswordService } from '../../features/show-password/show-password.service';
import { ApiService } from 'src/app/main/shared/httpApi/api.service';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { AuthService } from '../../auth.service';
import { TranslationService } from 'src/app/main/shared/i18n/translation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { ToastsService } from 'src/app/main/features/toasts/toasts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {

  // postForm: FormGroup;

  constructor(public showPW: ShowPasswordService, private http: ApiService, private router: Router, private loginService: LoginService, private authService: AuthService, private translate: TranslationService, private fb: FormBuilder,  private snackBar: MatSnackBar) {}

  email: string = ""
  password: string = ""
  locale: string = "en"

  isEmailRequired: boolean = false
  isPasswordRequired: boolean = false
  isCheckLengthEmail: boolean = false
  isCheckPW: boolean = false
  isCheckCorrect: boolean = false
  inputType: string = 'password'

  isDropdown: boolean = false

  errors: any[] = []
  checked: boolean = false

  // toasts
  toastService = inject(ToastsService)

  ngOnInit(): void {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      this.locale = savedLocale;
    } else {
      this.locale = 'en';
      localStorage.setItem('locale', this.locale);
    }
    this.translate.setDefaultLang(this.locale);
    this.loadData()
  }
  
  ngOnDestroy(): void {
    this.toastService.clear()
  }

  loadData() {
    // if (this.cookie.get('token')) {
    //   const decoded = jwtDecode(this.cookie.get('token'))
    //   // this.email = this.cookie.get('email')
    //   // this.password = this.cookie.get('password')
    //   // this.checked = true
    // }
  }

  togglePW(): void {
    this.showPW.showPassWord();
    this.isCheckPW = this.showPW.isShowPassWord;
    this.inputType = this.showPW.inputType
  }

  onSubmit(data: any): void {
    this.email = data["email"]
    this.password = data["password"]
    
    this.http.login("auth", this.email, this.password, this.checked).subscribe({
      next: (data: any) => {
        this.loginService.setItem(data.data.user)
        this.router.navigate(['/home'])
        // this.snackBar.open('Login successful', 'Close', {duration: 20000})
        // setTimeout(() => {
        //   // this.router.navigate(['/home'])
        // }, 1000);

      }, 
      error: (error: any) => {
        this.errors = error["error"]["data"]["errors"];
      }
    })
  }

  onDropdown(): void {
    this.isDropdown = !this.isDropdown
  }

  onClickLocale(locale: string): void {
    this.locale = locale
    localStorage.setItem('locale', locale)
    this.translate.setDefaultLang(locale)
    this.isDropdown = this.isDropdown ? false : this.isDropdown
  }

  onRemember(event: any): void {
    this.checked = event.target.checked
  }

  // Toasts
  showStandard(template: TemplateRef<any>) {
    this.toastService.show({template})
  }

  showSuccess(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-success text-light', delay: 10000 });
	}

	showDanger(template: TemplateRef<any>) {
		this.toastService.show({ template, classname: 'bg-danger text-light', delay: 15000 });
	}

}
