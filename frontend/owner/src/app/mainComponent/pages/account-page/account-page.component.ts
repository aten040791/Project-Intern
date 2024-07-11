import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  postForm: FormGroup;
  profile: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
      this.postForm = this.fb.group({
        name: ['', Validators.required],
        birthday: [''],
        address: [''],
        email: ['', Validators.required],
        phone: [''],
        role: [''],
      });
   };

   ngOnInit(): void {
    this.apiService.getProfile().subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile.data);
  
      this.postForm = this.fb.group({
        name: [this.profile.data.user.username],
        birthday: [format(new Date(this.profile.data.user.birthday), 'PP')],
        address: [this.profile.data.user.address],
        email: [this.profile.data.user.email],
        phone: [this.profile.data.user.phone],
        role: [this.profile.data.user.role],
      });
    });
  };

  onUpdate(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      Object.keys(this.postForm.controls).forEach(key => {
        let value = this.postForm.get(key)?.value;
        formData.append(key, value);
      });
      const formDataObject = this.formDataToObject(formData);
      this.apiService.updateUser(formDataObject).subscribe({
        next: (response) => {
          console.log('User updated successfully', response);
          this.router.navigate(['/account-page']);
        },
        error: (error) => {
          console.error('Failed to update user', error);
          alert('Failed to update user');
        }
      });
    }
  };

  formDataToObject(formData: FormData): any {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };

}
