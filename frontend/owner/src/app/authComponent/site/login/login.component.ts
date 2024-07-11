import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  postForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
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
