import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapter } from '../../custom-upload-adapter';
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
    private router: Router,
    private http: HttpClient ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      user_id: [this.userId],
      status: [''],
      file: [''],
      category_id: ['', Validators.required],
      language_id: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.post = navigation.extras.state['post'];
    }
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

        this.getDataCategory();
        this.getDataLanguage();
      });
    }
  };

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  }

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data || [];
    });
  };
  
  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe((response) => {
      this.responseDataLanguage = response.data;
    });
  };
  

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
        formData.append(key, value);
      });
      const formDataObject = this.formDataToObject(formData);
      const formDataString = JSON.stringify(formDataObject);
      const postId = this.route.snapshot.paramMap.get('id');
      this.apiService.updatePost(Number(postId), formDataString).subscribe((response) => {
        this.router.navigate(['/post']);
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
