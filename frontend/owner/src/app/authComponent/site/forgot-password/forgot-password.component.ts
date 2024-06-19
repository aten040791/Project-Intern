import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  ngOnInit(): void {
    console.log(this.postForm);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }

}
