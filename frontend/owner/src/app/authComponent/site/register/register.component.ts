import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  postForm: FormGroup;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.postForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  register(): void {
    this.authService.register(this.username, this.email, this.password).subscribe(() => {
      this.router.navigate(['/auth/login']);
    }, error => {
      alert('Registration failed');
    });
  }
}
