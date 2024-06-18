import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-language-dialog',
  templateUrl: './edit-language-dialog.component.html',
  styleUrls: ['./edit-language-dialog.component.css']
})
export class EditLanguageDialogComponent implements OnInit, OnChanges {
  @Input() selectedPostIds: number[] = [];
  @Output() closeModalDialog = new EventEmitter<boolean>();
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.createForm();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPostIds'] && changes['selectedPostIds'].currentValue) {
      this.postForm.controls['Ids'].setValue(this.selectedPostIds);
    }
  };

  ngOnInit() {
    document.addEventListener('click', this.onClickOutside.bind(this));
  };

  createForm() {
    this.postForm = this.fb.group({
      Ids: [this.selectedPostIds],
      value: ['', Validators.required],
      type: ['language']
    });
  }

  toggleItems() {
    this.showItems = !this.showItems;
  };

  selectLanguage(language: any) {
    this.selectedLanguageText = language.name;
    this.selectedLanguageValue = language.value;
    this.showItems = false;

    // Update the form control value
    this.postForm.controls['value'].setValue(this.selectedLanguageValue);
  };

  onClickOutside(event: MouseEvent) {
    const customSelect = document.getElementById('language-select');
    if (customSelect && !customSelect.contains(event.target as Node)) {
      this.showItems = false;
    }
  };
  

  onSubmit() {
    if (this.postForm.valid) {
      const formData = {
        ...this.postForm.value,
      };
      console.log(formData);
    } else {
      console.log('Form is invalid');
    }
    this.closeModal();
  };

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  };

  closeModal() {
    const modal = document.getElementById('edit-language-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  };
}
