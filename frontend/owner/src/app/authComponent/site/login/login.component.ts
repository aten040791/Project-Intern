import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/mainComponent/shared/i18n/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  postForm: FormGroup;
  email: string = '';
  password: string = '';
  locale: string = "en"

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private translate: TranslationService) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    localStorage.setItem('locale', this.locale);
    this.translate.setDefaultLang(this.locale);
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/post']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed');
      }
    });
  };
  
}
