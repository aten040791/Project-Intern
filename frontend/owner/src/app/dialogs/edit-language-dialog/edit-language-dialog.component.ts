import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-language-dialog',
  templateUrl: './edit-language-dialog.component.html',
  styleUrls: ['./edit-language-dialog.component.css']
})
export class EditLanguageDialogComponent {
  constructor() {}

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
