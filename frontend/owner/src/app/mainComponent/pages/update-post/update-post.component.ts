import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit, OnDestroy, DoCheck {
  postForm: FormGroup;
  showCategoryItems = false;
  showLanguageItems = false;
  selectedLanguageText = '-- Choose language --';
  selectedLanguageValue = '';
  selectedCategoryText = '-- Choose category --';
  imageURL: string;
  previewUrl: string | ArrayBuffer | null = null;
  postId: string;

  categories = [
    { value: 'blog', name: 'Blog' },
    { value: 'newspaper', name: 'Newspaper' },
    { value: 'travel', name: 'Travel' },
    { value: 'sport', name: 'Sport' },
  ]

  languages = [
    { value: 'vn', name: 'Viet Nam', img: 'https://tienichhay.net/uploads/flags/flat/24x24/vn.png' },
    { value: 'gb', name: 'English', img: 'https://tienichhay.net/uploads/flags/flat/24x24/gb.png' },
    { value: 'cn', name: 'China', img: 'https://tienichhay.net/uploads/flags/flat/24x24/cn.png' },
    { value: 'kr', name: 'Korea', img: 'https://tienichhay.net/uploads/flags/flat/24x24/kr.png' }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      language: ['', Validators.required],
      file: [null],
      status: [false]
    });
  }

  ngOnInit() {
    document.addEventListener('click', this.onClickOutside.bind(this));
    // Lấy ID từ route
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id')!;
      if (this.postId) {
        this.loadPost(this.postId);
      }
    });
  }


  ngDoCheck(): void {}

  toggleItems() {
        this.showLanguageItems = !this.showLanguageItems;
  }

  selectLanguage(language: any) {
    this.selectedLanguageText = language.name;
    this.selectedLanguageValue = language.value;
    this.showLanguageItems = false;

    // Update the form control value
    this.postForm.controls['language'].setValue(this.selectedLanguageValue);
  }

  onClickOutside(event: MouseEvent) {
    const customSelectCategory = document.getElementById('category');
    const customSelectLanguage = document.getElementById('language-select');
  
    if (customSelectCategory && !customSelectCategory.contains(event.target as Node)) {
      this.showCategoryItems = false;
    }
  
    if (customSelectLanguage && !customSelectLanguage.contains(event.target as Node)) {
      this.showLanguageItems = false;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({
        file: file
      });
      this.previewFile(file);
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      // Thêm ID vào dữ liệu form
      const formData = {
        ...this.postForm.value,
        id: this.postId
      };
      console.log(formData);
      // Gửi form lên server để cập nhật bài viết
    } else {
      console.log('Form is invalid');
    }
  }

  loadPost(postId: string): void {
    // Giả lập nạp dữ liệu bài viết từ server
    // Thực tế, bạn sẽ gọi API để lấy dữ liệu bài viết theo ID
    const post = {
      title: 'Sample Title',
      content: 'Sample Content',
      category: 'blog',
      language: 'vn',
      status: true
    };
    // Cập nhật form với dữ liệu bài viết
    this.postForm.patchValue(post);
    this.selectedCategoryText = this.categories.find(cat => cat.value === post.category)?.name || '-- Choose category --';
    this.selectedLanguageText = this.languages.find(lang => lang.value === post.language)?.name || '-- Choose language --';
  }


  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }
}
