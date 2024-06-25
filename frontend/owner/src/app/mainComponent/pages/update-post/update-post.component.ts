import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  postForm: FormGroup;
  responseDataCategory: any[] = [];
  responseDataLanguage: any[] = [];
  selectedLanguageText: string;
  showLanguageItems = false;
  previewUrl: string | ArrayBuffer | null = null;
  post: any;

  userId = localStorage.getItem('user_id');

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      user_id: [this.userId],
      status: [false],
      file: [null],
      category_id: ['', Validators.required],
      language_id: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.apiService.getPostDetails(Number(postId)).subscribe((post) => {
        this.post = post;
        this.selectedLanguageText = this.post.data.language.name;
        console.log('object', this.post);

        this.postForm = this.fb.group({
          title: [this.post.data.title],
          body: [this.post.data.body],
          file: [this.post.data.file],
          status: [this.post.data.status],
          category_id: [this.post.data.category.id],
          // language_id: [this.post.data.language.name],
        });

        this.fetchDataCategory();
        this.fetchDataLanguage();
      });
    }
  }

  fetchDataCategory(): void {
    this.apiService.fetchDataCategory().subscribe(
      response => {
        console.log('API Response - Categories:', response.data);
        if (Array.isArray(response.data)) {
          this.responseDataCategory = response.data;
        } else {
          this.responseDataCategory = [];
        }
      },
      error => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }

  fetchDataLanguage(): void {
    this.apiService.fetchDataLanguage().subscribe(
      response => {
        console.log('API Response - Languages:', response.data);
        if (Array.isArray(response.data)) {
          this.responseDataLanguage = response.data;
        } else {
          this.responseDataLanguage = [];
        }
      },
      error => {
        console.error('Failed to fetch languages:', error);
      }
    );
  }

  toggleLanguageItems(): void {
    this.showLanguageItems = !this.showLanguageItems;
  }

  selectLanguage(language: any): void {
    this.postForm.get('language_id')?.setValue(language.id);
    this.selectedLanguageText = language.name;
    this.showLanguageItems = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.postForm.get('file')?.setValue(file);
    }
  };

  onUpdate(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      Object.keys(this.postForm.controls).forEach(key => {
        formData.append(key, this.postForm.get(key)?.value);
      });
      const formDataObject = this.formDataToObject(formData);
      const formDataString = JSON.stringify(formDataObject);
      const postId = this.route.snapshot.paramMap.get('id');
      this.apiService.updatePost(Number(postId), formDataString).subscribe({
        next: (response) => {
          console.log('Post updated successfully', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Failed to update post', error);
          alert('Failed to update post');
        }
      });
    }
  };

  formDataToObject(formData: FormData): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };
}
