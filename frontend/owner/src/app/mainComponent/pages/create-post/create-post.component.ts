import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapter } from '../../custom-upload-adapter';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public Editor = ClassicEditor;
  postForm: FormGroup;
  responseDataCategory: any[] = [];
  responseDataLanguage: any[] = [];
  selectedCategoryText = '--Choose category--';
  selectedLanguageText = '--Choose language--';
  showLanguageItems = false;
  previewUrl: string | ArrayBuffer | null = null;

  userId = localStorage.getItem('user_id');

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      user_id: [this.userId],
      status: [''],
      file: [''],
      category_id: ['', Validators.required],
      language_id: ['', Validators.required],
    });
  };

  ngOnInit(): void {
    this.getDataCategory();
    this.getDataLanguage();
  };

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.responseDataCategory = response.data;
    });
  };
  
  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe((response) => {
      this.responseDataLanguage = response.data;
    });
  };
  

  toggleLanguageItems(): void {
    this.showLanguageItems = !this.showLanguageItems;
  };

  selectLanguage(language: any): void {
    this.postForm.get('language_id')?.setValue(language.id);
    this.selectedLanguageText = language.name;
    this.showLanguageItems = false;
  };

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

  onCreate(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      Object.keys(this.postForm.controls).forEach(key => {
        let value = this.postForm.get(key)?.value;
        formData.append(key, value);
      });
      const formDataObject = this.formDataToObject(formData);
      const formDataString = JSON.stringify(formDataObject);

      this.apiService.createPost(formDataString).subscribe((response) => {
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
