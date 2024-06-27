import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  public Editor = ClassicEditor;
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
      status: [''],
      file: [null],
      category_id: ['', Validators.required],
      language_id: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
  };

  // Handle data output ckeditor
  stripPTags(data: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.apiService.getPostDetails(Number(postId)).subscribe((post) => {
        this.post = post;
        this.selectedLanguageText = this.post.data.language.name;

        this.postForm = this.fb.group({
          title: [this.post.data.title],
          body: [this.post.data.body],
          file: [this.post.data.file],
          status: [this.post.data.status === 'true'],
          category_id: [this.post.data.category.id],
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
        let value = this.postForm.get(key)?.value;
        if (key === 'body') value = this.stripPTags(value);
        formData.append(key, value);
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
