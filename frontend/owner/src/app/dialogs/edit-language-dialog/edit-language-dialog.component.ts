import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-language-dialog',
  templateUrl: './edit-language-dialog.component.html',
  styleUrls: ['./edit-language-dialog.component.css']
})
export class EditLanguageDialogComponent {
  constructor() {}
  
  showItems = false;
  selectedLanguageText = '-- Choose language --';
  selectedLanguageValue = '';

  languages = [
    { value: 'vn', name: 'Viet Nam', img: 'https://tienichhay.net/uploads/flags/flat/24x24/vn.png' },
    { value: 'gb', name: 'English', img: 'https://tienichhay.net/uploads/flags/flat/24x24/gb.png' },
    { value: 'cn', name: 'China', img: 'https://tienichhay.net/uploads/flags/flat/24x24/cn.png' },
    { value: 'kr', name: 'Korea', img: 'https://tienichhay.net/uploads/flags/flat/24x24/kr.png' }
  ];

  toggleItems() {
    this.showItems = !this.showItems;
  }

  selectLanguage(language: any) {
    this.selectedLanguageText = language.name;
    this.selectedLanguageValue = language.value;
    this.showItems = false;

    // Update the hidden select element
    const selectElement = document.getElementById('language') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = this.selectedLanguageValue;
    }
  }

  onClickOutside(event: MouseEvent) {
    const customSelect = document.getElementById('language-select');
    if (customSelect && !customSelect.contains(event.target as Node)) {
      this.showItems = false;
    }
  }

  ngOnInit() {
    document.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClickOutside.bind(this));
  } 

  closeModal() {
    const modal = document.getElementById('edit-language-dialog');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onSubmit() {
    // Handle form submission
    this.closeModal();
  }
}
