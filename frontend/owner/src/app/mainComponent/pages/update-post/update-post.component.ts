import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapter } from '../../custom-upload-adapter';
import { ApiService } from 'src/app/services/api.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  public Editor = ClassicEditor;
  postForm: FormGroup;
  categories: any[] = [];
  languages: any[] = [];
  selectedTab: string = 'Vietnamese'; 
  showLanguageItems = false;
  previewUrl: string | ArrayBuffer | null = null;
  post: any;
  languageIds: { [key: string]: string } = {};
  tabData: { [key: string]: { title: string, body: string, language_id: string } } = {
    Vietnamese: { title: '', body: '', language_id: '' },
    English: { title: '', body: '', language_id: '' },
    Chinese: { title: '', body: '', language_id: '' }
  };
  userId = localStorage.getItem('user_id');

  faFloppyDisk = faFloppyDisk;
  faXmark = faXmark;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.initializeForm();
    library.add(faFloppyDisk, faXmark);

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
        this.initializeFormWithPostData();
        this.initializeTranslations(post.data.translations);
        this.getDataCategory();
        this.getDataLanguage();
      });
    }
  };

  initializeForm(): void {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
      user_id: [this.userId],
      status: [false],
      file: [''],
      category_id: ['', Validators.required],
    });
  };

  onReady(editor: any): void {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, 'http://localhost:3000/upload');
    };
  };

  getDataCategory(): void {
    this.apiService.getDataCategory().subscribe((response) => {
      this.categories = response.data;
    });
  };

  getDataLanguage(): void {
    this.apiService.getDataLanguage().subscribe((response) => {
      this.languages = response.data;
    });
  };

  toggleLanguageItems(): void {
    this.showLanguageItems = !this.showLanguageItems;
  };

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

  onUpdate(): void {
    this.saveCurrentTabData();
    if (this.postForm.valid) {
      const formData = this.prepareFormData();
      const postData = this.formatPostData(formData);
      const postId = this.route.snapshot.paramMap.get('id');
      this.apiService.updatePost(Number(postId), postData).subscribe(() => {
        this.router.navigate(['/post']);
      });
    }
  };

  prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('user_id', this.userId || '');
    formData.append('status', this.postForm.get('status')?.value);
    formData.append('category_id', this.postForm.get('category_id')?.value);
    formData.append('file', this.postForm.get('file')?.value);
    return formData;
  };

  formatPostData(formData: FormData): any {
    const translations = Object.keys(this.tabData).map(tab => ({
      language_id: this.languageIds[tab],
      title: this.tabData[tab].title,
      body: this.tabData[tab].body
    }));
    return this.formDataToObject(formData, translations);
  };

  formDataToObject(formData: FormData, translations: { language_id: string, title: string, body: string }[]): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    object['translations'] = translations.filter(t => t.title !== '' && t.body !== '');
    return object;
  };

  selectTab(tab: string): void {
    this.saveCurrentTabData();
    this.selectedTab = tab;
    this.updateForm();
  };

  saveCurrentTabData(): void {
    this.tabData[this.selectedTab].title = this.postForm.get('title')?.value;
    this.tabData[this.selectedTab].body = this.postForm.get('body')?.value;
  };

  updateForm(): void {
    const data = this.tabData[this.selectedTab];
    this.postForm.patchValue({
      title: data.title,
      body: data.body
    });
  };

  updateLanguageId(): void {
    const languageId = this.languageIds[this.selectedTab] || '';
    this.postForm.get('language_id')?.setValue(languageId);
  };

  initializeFormWithPostData(): void {
    this.postForm.patchValue({
      title: this.post.data.translations[0].title,
      body: this.post.data.translations[0].body,
      file: this.post.data.file,
      status: this.post.data.status === 'true',
      category_id: this.post.data.category.id,
    });
  };

  initializeTranslations(translations: any[]): void {
    translations.forEach(translation => {
      const languageName = translation.language.name;
      this.tabData[languageName] = {
        title: translation.title,
        body: translation.body,
        language_id: translation.language_id
      };
      this.languageIds[languageName] = translation.language_id;
    });
    this.updateForm();
  };
}
