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
  categories: any[] = [];
  languages: any[] = [];
  selectedCategoryText = '--Choose category--';
  selectedLanguageText = '--Choose language--';
  previewUrl: string | ArrayBuffer | null = null;
  selectedTab: string = 'Vietnamese'; // Default selected tab
  userId = localStorage.getItem('user_id');
  languageIds: { [key: string]: string } = {};
  tabData: { [key: string]: { title: string, body: string, language_id: string } } = {
    Vietnamese: { title: '', body: '', language_id: '' },
    English: { title: '', body: '', language_id: '' },
    Chinese: { title: '', body: '', language_id: '' }
  };

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
      status: [false],
      file: [''],
      category_id: ['', Validators.required]
    });
  };

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchLanguages();
  };

  // CKEditor functions 
  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };
 
  // Helper functions
  fetchCategories(): void {
    this.apiService.getDataCategory().subscribe(response => {
      this.categories = response.data;
    });
  };

  fetchLanguages(): void {
    this.apiService.getDataLanguage().subscribe(response => {
      this.languages = response.data;
      this.languages.forEach(language => {
        this.languageIds[language.name] = language.id;
      });
      this.updateLanguageId(); // Update language_id based on selected tab
    });
  };

  // Event handlers on file change
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Event handlers on create post
  onCreate(): void {
    this.saveCurrentTabData();
    if (this.postForm.valid) {
      const formData = this.prepareFormData();
      const postData = this.formatPostData(formData);
      console.log('postData', postData);
      this.apiService.createPost(postData).subscribe(() => {
        this.router.navigate(['/post']);
      });
    }
  };

  // Helper functions for event handlers
  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('user_id', this.userId || '');
    formData.append('status', this.postForm.get('status')?.value);
    formData.append('file', this.postForm.get('file')?.value);
    formData.append('category_id', this.postForm.get('category_id')?.value);
    return formData;
  };

  // Helper functions for event handlers
  formatPostData(formData: FormData): any {
    const translations = Object.keys(this.tabData).map(tab => ({
      language_id: this.languageIds[tab],
      title: this.tabData[tab].title,
      body: this.tabData[tab].body
    }));

    return this.formDataToObject(formData, translations);
  };

  formDataToObject( formData: FormData, translations: { language_id: string, title: string, body: string }[] ): any {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => { 
      object[key] = value; 
    });
    object['translations'] = translations.map(t => ({
      language_id: t.language_id,
      title: t.title || '',
      body: t.body || ''
    }));
    return object;
  };
  
  // Event handlers on tab change
  selectTab(tab: string): void {
    this.saveCurrentTabData();
    this.selectedTab = tab;
    this.updateForm();
  };

  // Helper functions for event handlers
  saveCurrentTabData(): void {
    this.tabData[this.selectedTab] = { ...this.postForm.value };
  };

  // Helper functions for event handlers
  updateForm(): void {
    const data = this.tabData[this.selectedTab];
    const languageId = this.languageIds[this.selectedTab] || '';
    this.postForm.patchValue({ ...data, language_id: languageId });
  };

  updateLanguageId(): void {
    const languageId = this.languageIds[this.selectedTab] || '';
    this.postForm.get('language_id')?.setValue(languageId);
  };
}
