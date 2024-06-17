import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy, DoCheck {
  postForm: FormGroup;
  showItems = false;
  selectedLanguageText = '-- Choose language --';
  selectedLanguageValue = '';

  languages = [
    { value: 'vn', name: 'Viet Nam', img: 'https://tienichhay.net/uploads/flags/flat/24x24/vn.png' },
    { value: 'gb', name: 'English', img: 'https://tienichhay.net/uploads/flags/flat/24x24/gb.png' },
    { value: 'cn', name: 'China', img: 'https://tienichhay.net/uploads/flags/flat/24x24/cn.png' },
    { value: 'kr', name: 'Korea', img: 'https://tienichhay.net/uploads/flags/flat/24x24/kr.png' }
  ];

  constructor(private fb: FormBuilder) {
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
  }

  ngDoCheck(): void {}

  toggleItems() {
    this.showItems = !this.showItems;
  }

  selectLanguage(language: any) {
    this.selectedLanguageText = language.name;
    this.selectedLanguageValue = language.value;
    this.showItems = false;

    // Update the form control value
    this.postForm.controls['language'].setValue(this.selectedLanguageValue);
  }

  onClickOutside(event: MouseEvent) {
    const customSelect = document.getElementById('language-select');
    if (customSelect && !customSelect.contains(event.target as Node)) {
      this.showItems = false;
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({
        file: file
      });
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
    }
  }


  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  }
}
